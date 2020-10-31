import React, { useState, useEffect } from 'react';
import Label from './Label';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import { Styles } from '../constants';
import environment from '../config/environment';
import TextField from './TextField';
import IconButton from './IconButton';
import Dialog from './Dialog';
import Button from './Button';

export default function SelectField(props: { value: any, items: any, onValueChange: (value: any) => void, okText: string, multiple?: boolean, onSearch?: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, labelKey?: string, valueKey?: string, containerStyle?: any, style?: any }) {
  const valueKey = 'value';
  const labelKey = 'label';

  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(convert(props.items));
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setItems(convert(props.items));
  }, [props.items, props.required, props.placeholder]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function convert(options) {
    const results = options.map((option) => {
      return {
        [valueKey]: option[props.valueKey || 'value'],
        [labelKey]: option[props.labelKey || 'label'],
      };
    });
    if (props.placeholder) {
      results.unshift({
        [valueKey]: null,
        [labelKey]: props.placeholder,
      });
    }
    return results;
  }

  function getIndex(v) {
    return items.findIndex((item) => {
      return (item[valueKey] || '').toString() === (v || '').toString();
    });
  }

  function getLabel(v) {
    const index = getIndex(v);
    if (index >= 0) {
      return items[index][labelKey];
    }
    if (items.length > 0 && props.required) {
      return items[0][labelKey];
    }
    return '';
  }

  function keyExtractor(item) {
    return (item[valueKey] || '').toString();
  }

  function isSelected(v) {
    return (selectedValue || '').toString() === (v || '').toString();
  }

  function onPress(v) {
    setSelectedValue(v);
  }

  function selectValue() {
    hideDialog();
    onValueChange(selectedValue);
  }

  function showDialog() {
    setSelectedValue(value);
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <TextField style={styles.selectInput} value={getLabel(value)} onValueChange={() => { }} required={props.required} error={error} readonly={true}>
        <IconButton iconName='expand-more' containerStyle={Styles.fieldIconButton} onPress={showDialog} />
      </TextField>
      <Dialog visible={visible} onClose={hideDialog} buttons={[
        <Button title={props.okText} onPress={selectValue} />
      ]}>
        <FlatList style={{ maxHeight: 300 }} keyExtractor={keyExtractor} data={items} renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => onPress(item[valueKey])}>
            <Text style={[styles.item, isSelected(item[valueKey]) ? (isDarkTheme ? styles.selectedItemDark : styles.selectedItemLight) : null]}>{item[labelKey]}</Text>
          </TouchableOpacity>
        )} />
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  selectInput: {
    paddingRight: 40,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedItemLight: {
    backgroundColor: Colors.inputDefaultLight,
  },
  selectedItemDark: {
    backgroundColor: Colors.inputDefaultDark,
  }
});

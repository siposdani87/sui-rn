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
import SearchField from './SearchField';

export default function SelectField(props: { value: any, items: any, onValueChange: (value: any) => void, okText: string, multiple?: boolean, onSearch?: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, labelKey?: string, valueKey?: string, containerStyle?: any, style?: any }) {
  const valueKey = 'value';
  const labelKey = 'label';

  const [query, setQuery] = useState('');
  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(convert(props.items));
  const [filteredItems, setFilteredItems] = useState(convert(props.items, query));
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setItems(convert(props.items));
    setFilteredItems(convert(props.items, query));
  }, [props.items, props.required, props.placeholder]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function convert(options: any[], query?: string) {
    const results = [];
    options.forEach((option) => {
      const value = option[props.valueKey || valueKey];
      const label = option[props.labelKey || labelKey];
      if (!query || label.indexOf(query) !== -1) {
        results.push({
          [valueKey]: value,
          [labelKey]: label,
        });
      }
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
    setFilteredItems(convert(props.items, query));
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  function searchInItems(q) {
    setQuery(q);
    setFilteredItems(convert(props.items, q));
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <TextField style={styles.selectInput} value={getLabel(value)} onValueChange={() => { }} required={props.required} error={error} readonly={true}>
        <IconButton iconName='expand-more' containerStyle={Styles.fieldIconButton} iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={showDialog}  />
      </TextField>
      <Dialog visible={visible} title={props.label} onClose={hideDialog} buttons={[
        <Button title={props.okText} onPress={selectValue} />
      ]}>
        <SearchField value={query} onValueChange={searchInItems} error={false} />
        <FlatList style={{ maxHeight: 175 }} keyExtractor={keyExtractor} data={filteredItems} renderItem={({ item }) => (
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

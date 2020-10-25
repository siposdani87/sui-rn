import React, { useState, useEffect, Fragment } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import { Styles } from '../constants';
import { Picker } from '@react-native-community/picker';
import environment from '../config/environment';
import TextField from './TextField';
import IconButton from './IconButton';
import Dialog from './Dialog';
import Button from './Button';

export default function SelectField(props: { value: any, items: any, onValueChange: (value: any) => void, okText: string, multiple?: boolean, onSearch?: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, labelKey?: string, valueKey?: string, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(convert(props.items));
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const valueKey = 'value';
  const labelKey = 'label';

  useEffect(() => {
    setValue(props.value);
    setSelectedValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setItems(convert(props.items));
  }, [props.items]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function convert(options) {
    const results = options.map((option) => {
      const optionValue = option[props.valueKey || 'value'];
      return {
        key: optionValue,
        [valueKey]: optionValue,
        [labelKey]: option[props.labelKey || 'label'],
      };
    });
    return results;
  }

  function _getTextInputStyle() {
    if (hasError) {
      if (props.disabled) {
        return isDarkTheme ? styles.hasErrorDisabledDark : styles.hasErrorDisabledLight;
      }
      return isDarkTheme ? styles.hasErrorDefaultDark : styles.hasErrorDefaultLight;
    }
    if (props.disabled) {
      return isDarkTheme ? styles.disabledDarkTextInput : styles.disabledLightTextInput;
    }
    return isDarkTheme ? styles.defaultDarkTextInput : styles.defaultLightTextInput;
  }

  function getIndex(v) {
    return items.findIndex((item) => {
      return item[valueKey] === v;
    });
  }

  function getValue(v){
    const index = getIndex(v);
    if (index >= 0){
      return items[index][labelKey];
    }
    return '';
  }

  function renderPicker(){
    if (items.length > 0) { 
      return (<Picker selectedValue={selectedValue} onValueChange={onChange} style={[props.style, styles.picker, _getTextInputStyle()]} itemStyle={styles.itemStyle} enabled={!props.disabled} mode='dialog'>
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>);
    }
    return null;
  }

  function onChange(selectedValue) {
    if (Platform.OS === 'android') {
      hideDialog();
      onValueChange(selectedValue);
    } else if (Platform.OS === 'ios') {
      setSelectedValue(selectedValue);
    }
  }

  function selectValue() {
    hideDialog();
    onValueChange(selectedValue);
  }

  function showDialog() {
    setSelectedValue(value);
    setVisible(true);
  }

  function hideDialog(){
    setVisible(false);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {Platform.OS === 'android' && (
        <Fragment>
          <Label label={props.label} required={props.required} disabled={props.disabled} />
          {renderPicker()}
          <ErrorField error={error} disabled={props.disabled} />
        </Fragment>
      )}
      {Platform.OS === 'ios' && (
        <Fragment>
          <Label label={props.label} required={props.required} disabled={props.disabled} />
          <TextField style={styles.selectInput} value={getValue(value)} onValueChange={() => {}} required={props.required} error={error} readonly={true}>
            <IconButton iconName='expand-more' style={Styles.fieldIconButton} color='transparent' iconColor={isDarkTheme ? Colors.white : Colors.black} onPress={showDialog} />
          </TextField>
          <Dialog visible={visible} onClose={hideDialog} buttons={[
              <Button title={props.okText} containerStyle={{ marginLeft: 10 }} onPress={selectValue} color={Colors.primary} textColor={Colors.primaryText} />
            ]}>
            {renderPicker()}
          </Dialog>
        </Fragment>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  selectInput: {
    paddingRight: 40,
  },
  picker: {
    ...Platform.select({
      android: {
        height: 36,
      }
    })
  },
  itemStyle: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
  },
  input: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  defaultLightTextInput: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.inputDefaultLight,
  },
  defaultDarkTextInput: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.inputDefaultDark,
  },
  disabledLightTextInput: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.inputDisabledLight,
    borderStyle: 'dotted',
  },
  disabledDarkTextInput: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.inputDisabledDark,
    borderStyle: 'dotted',
  },
  hasErrorDefaultLight: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.errorDefaultLight,
  },
  hasErrorDefaultDark: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.errorDefaultDark,
  },
  hasErrorDisabledLight: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.errorDisabledLight,
  },
  hasErrorDisabledDark: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.errorDisabledDark,
  },
});

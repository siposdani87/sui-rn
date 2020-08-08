import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { Colors, Styles } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SelectField from './SelectField';
import TextField from './TextField';

export default function DatetimeField(props: { mode: any, value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any, containerStyle?: any }) {
  const [value, setValue] = useState(props.value);
  const [date, setDate] = useState(getDate(props.value));
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const [years, setYears] = useState([]);

  useEffect(() => {
    function generateYears(minYear) {
      return Array.from(Array(new Date().getFullYear() + 10 - minYear), (_, i) => {
        const v = i + minYear + 1;
        return {
          label: v.toString(),
          value: v,
        };
      });
    }

    if (props.mode === 'year') {
      setYears(generateYears(1900));
    }
  }, [props.mode]);

  useEffect(() => {
    setValue(props.value);
    setDate(getDate(props.value));
  }, [props.value]);

  function onChange(_event, v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
    setDate(getDate(v));
  }

  function onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
    setDate(getDate(v));
  }

  function getDate(v) {
    const modes = {
      'datetime-local': {
        format: 'YYYY-MM-DDTHH:mm:ss', // 2016-05-26T11:25:00 (UTC)
        calendar_type: 'date',
        clock_type: 'hour',
      },
      'datetime': {
        format: '', // 2016-05-26T13:25:00+02:00 (ISO 8601, Hungary)
        calendar_type: 'date',
        clock_type: 'hour',
      },
      'date': {
        format: 'YYYY-MM-DD', // 2016-05-26
        calendar_type: 'date',
        clock_type: '',
      },
      'time': {
        format: 'HH:mm:ss', // 13:25:00
        calendar_type: '',
        clock_type: 'hour',
      },
      'month': {
        format: 'YYYY-MM', // 2016-05
        calendar_type: 'month',
        clock_type: '',
      },
      'week': {
        format: 'YYYY-\\Www', // 2016-W22
        calendar_type: 'week',
        clock_type: '',
      },
      'year': {
        format: 'YYYY', // 2016
        calendar_type: 'year',
        clock_type: '',
      },
    };
    const config = modes[props.mode];
    return moment(v, config.format).toDate();
  }

  function _getTextInputErrorStyle() {
    if (hasError) {
      if (props.disabled) {
        return isDarkTheme ? styles.hasErrorDisabledDark : styles.hasErrorDisabledLight;
      }
      return isDarkTheme ? styles.hasErrorDefaultDark : styles.hasErrorDefaultLight;
    }
    if (props.disabled) {
      return isDarkTheme ? styles.noErrorDisabledDark : styles.noErrorDisabledLight;
    }
    return isDarkTheme ? styles.noErrorDefaultDark : styles.noErrorDefaultLight;
  }

  function _getTextInputStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.disabledDarkTextInput : styles.disabledLightTextInput;
    }
    return isDarkTheme ? styles.defaultDarkTextInput : styles.defaultLightTextInput;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.mode === 'date' && (
        <View>
          <Label label={props.label} required={props.required} disabled={props.disabled} />
          <TextField {...props} value={value} style={[styles.textInput, props.style, _getTextInputStyle(), _getTextInputErrorStyle()]} onChangeText={onValueChange} underlineColorAndroid='transparent' selectionColor={Colors.deepGreyBright} />
          <DateTimePicker value={date} mode={props.mode} is24Hour={true} display='default' onChange={onChange} />
          <ErrorField error={error} disabled={props.disabled} />
        </View>
      )}
      {props.mode === 'year' && (
        <SelectField label={props.label} error={props.error} items={years} value={value} onValueChange={onValueChange} required={props.required} disabled={props.disabled} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  defaultLightTextInput: {
    color: Colors.contentDefaultLight,
  },
  defaultDarkTextInput: {
    color: Colors.contentDefaultDark,
  },
  disabledLightTextInput: {
    color: Colors.contentDisabledLight,
  },
  disabledDarkTextInput: {
    color: Colors.contentDisabledDark,
  },
  hasErrorDefaultLight: {
    borderColor: Colors.errorDefaultLight,
  },
  hasErrorDefaultDark: {
    borderColor: Colors.errorDefaultDark,
  },
  hasErrorDisabledLight: {
    borderColor: Colors.errorDisabledLight,
  },
  hasErrorDisabledDark: {
    borderColor: Colors.errorDisabledDark,
  },
  noErrorDefaultLight: {
    borderColor: Colors.inputDefaultLight,
  },
  noErrorDefaultDark: {
    borderColor: Colors.inputDefaultDark,
  },
  noErrorDisabledLight: {
    borderColor: Colors.inputDisabledLight,
  },
  noErrorDisabledDark: {
    borderColor: Colors.inputDisabledDark,
  },
});

import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, useColorScheme, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SelectField from './SelectField';
import TextField from './TextField';
import IconButton from './IconButton';
import { Styles, Colors } from '../constants';
import environment from '../config/environment';
import Dialog from './Dialog';
import Button from './Button';

const MODES = {
  'datetime-local': {
    format: 'YYYY-MM-DDTHH:mm:ss', // 2016-05-26T11:25:00 (UTC)
    calendarType: 'date',
    clockType: 'time',
  },
  'datetime': {
    format: '', // 2016-05-26T13:25:00+02:00 (ISO 8601, Hungary)
    calendarType: 'date',
    clockType: 'time',
  },
  'date': {
    format: 'YYYY-MM-DD', // 2016-05-26
    calendarType: 'date',
    clockType: '',
  },
  'time': {
    format: 'HH:mm:ss', // 13:25:00
    calendarType: '',
    clockType: 'time',
  },
  'month': {
    format: 'YYYY-MM', // 2016-05
    calendarType: 'month',
    clockType: '',
  },
  'week': {
    format: 'YYYY-\\Www', // 2016-W22
    calendarType: 'week',
    clockType: '',
  },
  'year': {
    format: 'YYYY', // 2016
    calendarType: 'year',
    clockType: '',
  },
};

export default function DatetimeField(props: { mode: any, value: any, onValueChange: (value: any) => void, okText: string, format?: string, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState(null);
  const [config, setConfig] = useState(MODES[props.mode]);
  const [years, setYears] = useState([]);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

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
    setConfig(MODES[props.mode]);
  }, [props.mode]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (config && value) {
      setDate(getDate(value, config));
      setFormattedValue(getFormattedDate(value, config));
    }
  }, [config, value]);

  function getDate(v, c) {
    return moment(v, c.format).toDate();
  }

  function getFormattedDate(v, c) {
    return moment(v, c.format).format(props.format);
  }

  function onChange(_event, selectedDate) {
    if (Platform.OS === 'android') {
      hide();
      onValueChange(selectedDate);
    } else if (Platform.OS === 'ios') {
      setDate(selectedDate);
    }
  }

  function onValueChange(v) {
    const d = moment(v);
    const formatD = d.format(config.format);
    setValue(formatD);
    setFormattedValue(d.format(props.format));
    props.onValueChange(formatD);
  }

  function showCalendar() {
    showMode('date');
  }

  function showClock() {
    showMode('time');
  }

  function showMode(currentMode) {
    setDate(getDate(value, config));
    setShow(true);
    setMode(currentMode);
  };

  function hide() {
    setShow(false);
  }

  function selectDate() {
    hide();
    onValueChange(date);
  }

  function renderDateTimePicker() {
    if (date && show) {
      return (
        <DateTimePicker value={date} mode={mode as any} is24Hour={true} display='default' onChange={onChange} />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {(config.calendarType === 'date' || config.clockType === 'time') && (
        <Fragment>
          <TextField label={props.label} value={formattedValue} error={props.error} onValueChange={() => null} readonly={true}>
            {config.calendarType === 'date' && (
              <IconButton iconName='event' style={Styles.fieldIconButton} color='transparent' iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={showCalendar} />
            )}
            {config.clockType === 'time' && (
              <IconButton iconName='schedule' style={Styles.fieldIconButton} color='transparent' iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={showClock} />
            )}
          </TextField>
          {Platform.OS === 'ios' && (
            <Dialog visible={show} onClose={hide} buttons={[
              <Button title={props.okText} onPress={selectDate} />
            ]}>
              {renderDateTimePicker()}
            </Dialog>
          )}
          {Platform.OS === 'android' &&
            renderDateTimePicker()
          }
        </Fragment>
      )}
      {config.calendarType === 'year' && (
        <SelectField label={props.label} error={props.error} items={years} value={value} onValueChange={onValueChange} okText={props.okText} required={props.required} disabled={props.disabled} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SelectField from './SelectField';
import IconButton from './IconButton';
import { Styles } from '../constants';
import Dialog from './Dialog';
import Button from './Button';
import TagField from './TagField';
import useActionColor from '../hooks/useActionColor';

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

export default function DatetimeField(props: { mode: any, value: any, onValueChange: (_value: any) => void, okText: string, format: string, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState(null);
  const [config, setConfig] = useState(MODES[props.mode]);
  const [years, setYears] = useState([]);
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);
  const getActionColor = useActionColor(props.disabled);

  useEffect(() => {
    function generateYears(minYear) {
      return Array.from(Array(new Date().getFullYear() + 10 - minYear), (_, i) => {
        const v = i + minYear + 1;
        return {
          label: getFormattedValue(v, config),
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
    if (value) {
      setDate(getDate(value, config));
      setFormattedValue(getFormattedValue(value, config));
    } else {
      setDate(null);
      setFormattedValue('');
    }
  }, [config, value]);

  function getDate(v, c): Date {
    return moment(v, c.format).toDate();
  }

  function getFormattedValue(v, c): string {
    return moment(v, c.format).format(props.format);
  }

  function getValue(v, c): string {
    return moment(v, c.format).format(c.format);
  }

  function onChange(_event, selectedDate) {
    if (Platform.OS === 'android') {
      hide();
      onValueChange(selectedDate);
    } else if (Platform.OS === 'ios') {
      setDate(selectedDate);
    }
  }

  function onValueChange(d) {
    if (d) {
      const v = getValue(d, config);
      setValue(v);
      setFormattedValue(getFormattedValue(d, config));
      props.onValueChange(v);
    } else {
      setValue(null);
      setFormattedValue('');
      props.onValueChange(null);
    }
  }

  function showCalendar() {
    showMode('date');
  }

  function showClock() {
    showMode('time');
  }

  function showMode(currentMode) {
    if (!props.disabled) {
      const dateValue = value ? getDate(value, config) : moment().toDate();
      setDate(dateValue);
      setVisible(true);
      setMode(currentMode);
    }
  }

  function hide() {
    setVisible(false);
  }

  function selectDate() {
    hide();
    onValueChange(date);
  }

  function renderDateTimePicker() {
    if (visible) {
      return (
        <DateTimePicker value={date} mode={mode as any} is24Hour={true} display='default' onChange={onChange} />
      );
    }
    return null;
  }

  function onValuesChange(values) {
    if (values.length === 0) {
      onValueChange(null);
    } else {
      onValueChange(values[0]);
    }
  }

  function getValues(): any[] {
    if (formattedValue) {
      return [formattedValue];
    }
    return [];
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {(config.calendarType === 'date' || config.clockType === 'time') && (
        <Fragment>
          <TagField style={props.style} label={props.label} values={getValues()} error={props.error} onValuesChange={onValuesChange} required={props.required} disabled={props.disabled}>
            {config.calendarType === 'date' && (
              <IconButton iconName='event' containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showCalendar} />
            )}
            {config.clockType === 'time' && (
              <IconButton iconName='schedule' containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showClock} />
            )}
          </TagField>
          {Platform.OS === 'ios' && (
            <Dialog visible={visible} title={props.label} onClose={hide} buttons={[
              <Button key={0} title={props.okText} onPress={selectDate} />,
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
        <SelectField style={props.style} label={props.label} error={props.error} items={years} value={value} onValueChange={onValueChange} okText={props.okText} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

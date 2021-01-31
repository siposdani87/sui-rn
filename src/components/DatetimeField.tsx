import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateioAdapter from '@date-io/moment';
import * as Localization from 'expo-localization';
import SelectField from './SelectField';
import IconButton from './IconButton';
import { Styles } from '../constants';
import Dialog from './Dialog';
import Button from './Button';
import TagField from './TagField';
import { useActionColor } from '../hooks';

const MODES = {
  'datetime-local': {
    format: 'YYYY-MM-DDTHH:mm:ss', // 2016-05-26T11:25:00 (UTC)
    calendarType: 'date',
    clockType: 'time',
  },
  'datetime': {
    format: 'YYYY-MM-DDTHH:mm:ssZ', // 2016-05-26T13:25:00+02:00 (ISO 8601, TZ:Hungary/Budapest)
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

const dateio = new DateioAdapter({ locale: Localization.locale });
for (const key in MODES) {
  if (Object.prototype.hasOwnProperty.call(MODES, key)) {
    const mode = MODES[key];
    dateio.formats[mode.format] = mode.format;
  }
}

export default function DatetimeField(props: { mode: any, value: any, onValueChange: (_value: any) => void, okText: string, format: string, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState(null);
  const [config, setConfig] = useState(MODES[props.mode]);
  const [years, setYears] = useState([]);
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);
  const getActionColor = useActionColor(props.disabled);
  dateio.formats[props.format] = props.format;

  useEffect(() => {
    function generateYears(minYear, maxYear) {
      return Array.from(Array(maxYear - minYear), (_, i) => {
        const v = i + minYear + 1;
        return {
          label: getFormattedValue(v, config),
          value: v,
        };
      });
    }
    if (props.mode === 'year') {
      const maxYear = new Date().getFullYear() + 10;
      setYears(generateYears(1900, maxYear));
    }
    setConfig(MODES[props.mode]);
  }, [props.mode]);

  useEffect(() => {
    dateio.formats[props.format] = props.format;
    console.log('props.format:', props.format);
  }, [props.format]);

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
    return dateio.toJsDate(dateio.parse(v, c.format));
  }

  function getFormattedValue(v, c): string {
    console.log('getFormattedValue:', c.format, props.format);
    return dateio.format(dateio.parse(v, c.format), props.format as any);
  }

  function getValue(v, c): string {
    console.log('getValue:', c.format);
    return dateio.format(dateio.parse(v, c.format), c.format);
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
      const dateValue = value ? getDate(value, config) : dateio.toJsDate(dateio.date());
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

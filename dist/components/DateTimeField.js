import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectField } from './SelectField';
import { IconButton } from './IconButton';
import { Styles } from '../constants';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { TagField } from './TagField';
import { useActionColor } from '../hooks';
import { format, parse, parseISO } from 'date-fns';
const MODES = {
    'datetime-local': {
        format: "yyyy-MM-dd'T'HH:mm:ss", // 2016-05-26T11:25:00 (UTC)
        calendarType: 'date',
        clockType: 'time',
    },
    datetime: {
        format: '', // 'yyyy-MM-dd[T]HH:mm:ss.SSSxxx', // yyyy-MM-dd'T'HH:mm:ssXXX, , yyyy-MM-ddTHH:mm:ssZ : 2016-05-26T13:25:00+02:00 (ISO 8601, TZ:Hungary/Budapest)
        calendarType: 'date',
        clockType: 'time',
    },
    date: {
        format: 'yyyy-MM-dd', // 2016-05-26
        calendarType: 'date',
        clockType: '',
    },
    time: {
        format: 'HH:mm:ss', // 13:25:00
        calendarType: '',
        clockType: 'time',
    },
    month: {
        format: 'yyyy-MM', // 2016-05
        calendarType: 'month',
        clockType: '',
    },
    week: {
        format: "yyyy-'W'ww", // 2016-W22
        calendarType: 'week',
        clockType: '',
    },
    year: {
        format: 'yyyy', // 2016
        calendarType: 'year',
        clockType: '',
    },
};
const convertToUnicodeTokenFormat = (formatString) => {
    // moment.js format to date-fns iso standard
    return formatString.replace('YYYY', 'yyyy').replace(/D/g, 'd');
};
const convertToValidValue = (value) => {
    return value instanceof Date ? value : value?.toString() ?? '';
};
export function DateTimeField(props) {
    const [value, setValue] = useState(convertToValidValue(props.value));
    const [formattedValue, setFormattedValue] = useState('');
    const [date, setDate] = useState(null);
    const [config, setConfig] = useState(MODES[props.mode]);
    const [years, setYears] = useState([]);
    const [pickerMode, setPickerMode] = useState('date');
    const [visible, setVisible] = useState(false);
    const getActionColor = useActionColor(props.disabled);
    const getDate = (v, mode) => {
        if (v instanceof Date) {
            return v;
        }
        if (!mode.format) {
            return parseISO(v);
        }
        return parse(v, mode.format, new Date());
    };
    const getFormattedValue = useCallback((v, mode) => {
        const formatString = convertToUnicodeTokenFormat(props.format);
        if (v instanceof Date) {
            return format(v, formatString);
        }
        if (!mode.format) {
            return format(parseISO(v), formatString);
        }
        return format(parse(v, mode.format, new Date()), formatString);
    }, [props.format]);
    const getValue = (v, mode) => {
        if (v instanceof Date) {
            if (!mode.format) {
                return v.toISOString();
            }
            return format(v, mode.format);
        }
        return v;
    };
    const getNow = () => {
        return new Date();
    };
    const onChange = (_event, selectedDate) => {
        if (Platform.OS === 'android') {
            hide();
            onValueChange(selectedDate ?? null);
        }
        else if (Platform.OS === 'ios') {
            setDate(selectedDate ?? null);
        }
    };
    const onValueChange = (d) => {
        if (d) {
            const v = getValue(d, config);
            setValue(v);
            setFormattedValue(getFormattedValue(d, config));
            props.onValueChange(v);
        }
        else {
            setValue('');
            setFormattedValue('');
            props.onValueChange(null);
        }
    };
    const showCalendar = () => {
        showMode('date');
    };
    const showClock = () => {
        showMode('time');
    };
    const showMode = (currentMode) => {
        if (!props.disabled) {
            const dateValue = value ? getDate(value, config) : getNow();
            setDate(dateValue);
            setVisible(true);
            setPickerMode(currentMode);
        }
    };
    const hide = () => {
        setVisible(false);
    };
    const selectDate = () => {
        hide();
        onValueChange(date);
    };
    const renderDateTimePicker = () => {
        if (visible) {
            return (<DateTimePicker value={date ?? getNow()} mode={pickerMode} is24Hour={true} display="default" onChange={onChange}/>);
        }
        return undefined;
    };
    const onValuesChange = (values) => {
        if (values.length === 0) {
            onValueChange(null);
        }
        else {
            onValueChange(values[0]);
        }
    };
    const getTags = () => {
        if (formattedValue) {
            return [formattedValue];
        }
        return [];
    };
    const getActionButtons = () => {
        const actionButtons = [];
        if (config.calendarType === 'date') {
            actionButtons.push(<IconButton iconName="event" containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showCalendar}/>);
        }
        if (config.clockType === 'time') {
            actionButtons.push(<IconButton iconName="schedule" containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showClock}/>);
        }
        return actionButtons;
    };
    useEffect(() => {
        const generateYears = (minYear, maxYear) => {
            return Array.from(Array(maxYear - minYear), (_, i) => {
                const year = i + minYear + 1;
                return {
                    label: getFormattedValue(year.toString(), config),
                    value: year,
                };
            });
        };
        if (props.mode === 'year') {
            const minYear = 1900;
            const maxYear = new Date().getFullYear() + 10;
            setYears(generateYears(minYear, maxYear));
        }
        setConfig(MODES[props.mode]);
    }, [props.mode, config, getFormattedValue]);
    useEffect(() => {
        setValue(convertToValidValue(props.value));
    }, [props.value]);
    useEffect(() => {
        if (value) {
            setDate(getDate(value, config));
            setFormattedValue(getFormattedValue(value, config));
        }
        else {
            setDate(null);
            setFormattedValue('');
        }
    }, [config, value, getFormattedValue]);
    return (<View style={[styles.container, props.containerStyle]}>
            {(config.calendarType === 'date' ||
            config.clockType === 'time') && (<>
                    <TagField style={props.style} label={props.label} values={getTags()} error={props.error} onValuesChange={onValuesChange} required={props.required} disabled={props.disabled} actionButtons={getActionButtons()}/>
                    {Platform.OS === 'ios' && (<Dialog visible={visible} title={props.label} onClose={hide} buttons={[
                    <Button key={0} title={props.okText} onPress={selectDate}/>,
                ]}>
                            {renderDateTimePicker()}
                        </Dialog>)}
                    {Platform.OS === 'android' && renderDateTimePicker()}
                </>)}
            {config.calendarType === 'year' && (<SelectField style={props.style} label={props.label} error={props.error} items={years} value={value} onValueChange={onValueChange} okText={props.okText} searchPlaceholder={props.searchPlaceholder} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>)}
        </View>);
}
const styles = StyleSheet.create({
    container: {},
});
//# sourceMappingURL=DateTimeField.js.map
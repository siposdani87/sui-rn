import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import * as Localization from 'expo-localization';
import SelectField from './SelectField';
import IconButton from './IconButton';
import { Styles } from '../constants';
import Dialog from './Dialog';
import Button from './Button';
import TagField from './TagField';
import { useActionColor } from '../hooks';

interface Year {
    label: string;
    value: number;
}

interface Mode {
    format: string;
    calendarType: string;
    clockType: string;
}

interface Modes {
    [key: string]: Mode;
}

const MODES: Modes = {
    'datetime-local': {
        format: 'YYYY-MM-DDTHH:mm:ss', // 2016-05-26T11:25:00 (UTC)
        calendarType: 'date',
        clockType: 'time',
    },
    datetime: {
        format: '', // YYYY-MM-DDTHH:mm:ssZ : 2016-05-26T13:25:00+02:00 (ISO 8601, TZ:Hungary/Budapest)
        calendarType: 'date',
        clockType: 'time',
    },
    date: {
        format: 'YYYY-MM-DD', // 2016-05-26
        calendarType: 'date',
        clockType: '',
    },
    time: {
        format: 'HH:mm:ss', // 13:25:00
        calendarType: '',
        clockType: 'time',
    },
    month: {
        format: 'YYYY-MM', // 2016-05
        calendarType: 'month',
        clockType: '',
    },
    week: {
        format: 'YYYY-\\Www', // 2016-W22
        calendarType: 'week',
        clockType: '',
    },
    year: {
        format: 'YYYY', // 2016
        calendarType: 'year',
        clockType: '',
    },
};

/* const dateio = new DateioAdapter({ locale: Localization.locale });
for (const key in MODES) {
  if (Object.prototype.hasOwnProperty.call(MODES, key)) {
    const mode = MODES[key];
    dateio.formats[mode.format] = mode.format;
  }
} */

export default function DatetimeField(props: {
    mode: any;
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    format: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    searchPlaceholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element {
    const [value, setValue] = useState<string | null>(props.value);
    const [formattedValue, setFormattedValue] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [config, setConfig] = useState<Mode>(MODES[props.mode]);
    const [years, setYears] = useState<Year[]>([]);
    const [mode, setMode] = useState<string>('date');
    const [visible, setVisible] = useState<boolean>(false);
    const getActionColor = useActionColor(props.disabled);

    useEffect(() => {
        const generateYears = (minYear: number, maxYear: number): Year[] => {
            return Array.from(Array(maxYear - minYear), (_, i) => {
                const v = i + minYear + 1;
                return {
                    label: getFormattedValue(v.toString(), config),
                    value: v,
                };
            });
        };
        if (props.mode === 'year') {
            const minYear = 1900;
            const maxYear = new Date().getFullYear() + 10;
            setYears(generateYears(minYear, maxYear));
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

    const getDate = (v: string, c: Mode): Date => {
        // return dateio.toJsDate(dateio.parse(v, c.format));
        return moment(v, c.format).toDate();
    };

    const getFormattedValue = (v: Date | string, c: Mode): string => {
        // dateio.formats[props.format] = props.format;
        // return dateio.format(dateio.parse(v, c.format), props.format as any);
        return moment(v, c.format).format(props.format);
    };

    const getValue = (v: Date | string, c: Mode): string => {
        // return dateio.format(dateio.parse(v, c.format), c.format);
        return moment(v, c.format).format(c.format);
    };

    const getNow = (): Date => {
        // return dateio.toJsDate(dateio.date());
        return moment().toDate();
    };

    const onChange = (
        _event: SyntheticEvent<Readonly<{ timestamp: number }>, Event>,
        selectedDate?: Date,
    ): void => {
        if (Platform.OS === 'android') {
            hide();
            onValueChange(selectedDate ?? null);
        } else if (Platform.OS === 'ios') {
            setDate(selectedDate ?? null);
        }
    };

    const onValueChange = (d: Date | string | null): void => {
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
    };

    const showCalendar = (): void => {
        showMode('date');
    };

    const showClock = (): void => {
        showMode('time');
    };

    const showMode = (currentMode: string): void => {
        if (!props.disabled) {
            const dateValue = value ? getDate(value, config) : getNow();
            setDate(dateValue);
            setVisible(true);
            setMode(currentMode);
        }
    };

    const hide = (): void => {
        setVisible(false);
    };

    const selectDate = (): void => {
        hide();
        onValueChange(date);
    };

    const renderDateTimePicker = (): JSX.Element | null => {
        if (visible) {
            return (
                <DateTimePicker
                    value={date ?? getNow()}
                    mode={mode as any}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            );
        }
        return null;
    };

    const onValuesChange = (values: string[]): void => {
        if (values.length === 0) {
            onValueChange(null);
        } else {
            onValueChange(values[0]);
        }
    };

    const getTags = (): string[] => {
        if (formattedValue) {
            return [formattedValue];
        }
        return [];
    };

    const getActionButtons = (): JSX.Element[] => {
        const actionButtons = [];
        if (config.calendarType === 'date') {
            actionButtons.push(
                <IconButton
                    iconName="event"
                    containerStyle={Styles.fieldIconButton}
                    iconColor={getActionColor()}
                    onPress={showCalendar}
                />,
            );
        }
        if (config.clockType === 'time') {
            actionButtons.push(
                <IconButton
                    iconName="schedule"
                    containerStyle={Styles.fieldIconButton}
                    iconColor={getActionColor()}
                    onPress={showClock}
                />,
            );
        }
        return actionButtons;
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            {(config.calendarType === 'date' ||
                config.clockType === 'time') && (
                <Fragment>
                    <TagField
                        style={props.style}
                        label={props.label}
                        values={getTags()}
                        error={props.error}
                        onValuesChange={onValuesChange}
                        required={props.required}
                        disabled={props.disabled}
                        actionButtons={getActionButtons()}
                    />
                    {Platform.OS === 'ios' && (
                        <Dialog
                            visible={visible}
                            title={props.label}
                            onClose={hide}
                            buttons={[
                                <Button
                                    key={0}
                                    title={props.okText}
                                    onPress={selectDate}
                                />,
                            ]}
                        >
                            {renderDateTimePicker()}
                        </Dialog>
                    )}
                    {Platform.OS === 'android' && renderDateTimePicker()}
                </Fragment>
            )}
            {config.calendarType === 'year' && (
                <SelectField
                    style={props.style}
                    label={props.label}
                    error={props.error}
                    items={years}
                    value={value}
                    onValueChange={onValueChange}
                    okText={props.okText}
                    searchPlaceholder={props.searchPlaceholder}
                    required={props.required}
                    disabled={props.disabled}
                    desc={props.desc}
                    onPressDesc={props.onPressDesc}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

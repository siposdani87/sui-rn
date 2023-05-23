import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { SelectField } from './SelectField';
import { IconButton } from './IconButton';
import { Styles } from '../constants';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { TagField } from './TagField';
import { useActionColor } from '../hooks';
import { format, parse, parseISO } from 'date-fns';
import { ErrorValueType } from './ErrorField';

interface Year {
    label: string;
    value: number;
}

interface Mode {
    format?: string;
    calendarType: string;
    clockType: string;
}

interface Modes {
    'datetime-local': Mode;
    datetime: Mode;
    date: Mode;
    time: Mode;
    month: Mode;
    week: Mode;
    year: Mode;
}

const MODES: Modes = {
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

const convertToISOFormat = (formatString: string): string => {
    return formatString.replace('YYYY', 'yyyy').replace(/D/g, 'd');
};

export function DateTimeField(props: {
    mode: keyof Modes;
    value: Date | string | null | undefined;
    onValueChange: (_value: string | null) => void;
    okText: string;
    format: string;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    searchPlaceholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}) {
    const [value, setValue] = useState<Date | string>(props.value ?? '');
    const [formattedValue, setFormattedValue] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [config, setConfig] = useState<Mode>(MODES[props.mode]);
    const [years, setYears] = useState<Year[]>([]);
    const [pickerMode, setPickerMode] = useState<string>('date');
    const [visible, setVisible] = useState<boolean>(false);
    const getActionColor = useActionColor(props.disabled);

    const getDate = (v: Date | string, c: Mode): Date => {
        if (v instanceof Date) {
            return v;
        }
        if (!c.format) {
            return parseISO(v);
        }
        return parse(v, c.format, new Date());
    };

    const getFormattedValue = useCallback(
        (v: Date | string, c: Mode): string => {
            // TODO: moment format to date-fns iso standard
            const formatString = convertToISOFormat(props.format);
            if (v instanceof Date) {
                return format(v, formatString);
            }
            if (!c.format) {
                return format(parseISO(v), formatString);
            }
            return format(parse(v, c.format, new Date()), formatString);
        },
        [props.format],
    );

    const getValue = (v: Date | string, c: Mode): string => {
        if (v instanceof Date) {
            if (!c.format) {
                return v.toISOString();
            }
            return format(v, c.format);
        }
        return v;
    };

    const getNow = (): Date => {
        return new Date();
    };

    const onChange = (
        _event: DateTimePickerEvent,
        selectedDate?: Date | undefined,
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
            setValue('');
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
            setPickerMode(currentMode);
        }
    };

    const hide = (): void => {
        setVisible(false);
    };

    const selectDate = (): void => {
        hide();
        onValueChange(date);
    };

    const renderDateTimePicker = (): ReactNode => {
        if (visible) {
            return (
                <DateTimePicker
                    value={date ?? getNow()}
                    mode={pickerMode as any}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            );
        }
        return undefined;
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

    const getActionButtons = (): ReactNode[] => {
        const actionButtons: ReactNode[] = [];
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
    }, [props.mode, config, getFormattedValue]);

    useEffect(() => {
        setValue(props.value ?? '');
    }, [props.value]);

    useEffect(() => {
        if (value) {
            setDate(getDate(value, config));
            setFormattedValue(getFormattedValue(value, config));
        } else {
            setDate(null);
            setFormattedValue('');
        }
    }, [config, value, getFormattedValue]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            {(config.calendarType === 'date' ||
                config.clockType === 'time') && (
                <>
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
                </>
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

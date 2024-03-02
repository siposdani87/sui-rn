import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
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
export type DateTimeFieldValueType = Date | string | number | null | undefined;
export declare function DateTimeField(props: {
    mode: keyof Modes;
    value: DateTimeFieldValueType;
    onValueChange: (value: string | null) => void;
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
}): React.JSX.Element;
export {};

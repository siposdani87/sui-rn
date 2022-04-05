/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
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
export default function DatetimeField(props: {
    mode: keyof Modes;
    value: string | null | undefined;
    onValueChange: (_value: string | null) => void;
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
}): JSX.Element;
export {};

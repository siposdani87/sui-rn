import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export declare function SelectField<T, K>(props: {
    items: T[];
    okText: string;
    onSearch?: (value: string) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    labelKey?: keyof T;
    valueKey?: keyof T;
    searchPlaceholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
} & ({
    multiple: true;
    value: K[] | null | undefined;
    onValueChange: (value: K[] | null | undefined) => void;
} | {
    multiple?: false;
    value: K | null | undefined;
    onValueChange: (value: K | null | undefined) => void;
})): React.JSX.Element;

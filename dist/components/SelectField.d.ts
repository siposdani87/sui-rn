/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export declare function SelectField(props: {
    value: any;
    items: any[];
    onValueChange: (_value: any) => void;
    okText: string;
    multiple?: boolean;
    onSearch?: (_value: any) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    labelKey?: string;
    valueKey?: string;
    searchPlaceholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;

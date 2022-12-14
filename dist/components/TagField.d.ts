/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type TagFieldValueType = string[];
export declare function TagField(props: {
    values: TagFieldValueType;
    onValuesChange: (_value: TagFieldValueType) => void;
    onPress?: (_index: number) => void;
    readonly?: boolean;
    label?: string;
    error?: ErrorValueType;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element;

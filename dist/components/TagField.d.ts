/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function TagField(props: {
    values: any[];
    onValuesChange: (_value: any[]) => void;
    onPress?: (_index: number) => void;
    readonly?: boolean;
    label?: string;
    error?: string | null;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: any[];
}): JSX.Element;

/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function IconToggleField(props: {
    value: any;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: any;
    falseValue?: any;
    onValueChange: (_value: any) => void;
    disableUncheck?: boolean;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element;

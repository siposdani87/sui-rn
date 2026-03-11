import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';

export interface BaseFieldProps {
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}

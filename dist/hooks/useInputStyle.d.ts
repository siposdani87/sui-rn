import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from '../components';
export declare function useInputStyle<T>(value: T, error: ErrorValueType, required?: boolean, disabled?: boolean, focused?: boolean): StyleProp<ViewStyle>;

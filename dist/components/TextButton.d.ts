/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function TextButton(props: {
    onPress: () => void;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title: string;
    keepFormat?: boolean;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;

/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function Button(props: {
    onPress: () => void;
    iconColor?: string;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
    imageSource?: any;
    iconName?: any;
    iconSize?: number;
    iconType?: string;
    keepFormat?: boolean;
    layout?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;

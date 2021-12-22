/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function IconButton(props: {
    onPress: () => void;
    iconColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    imageSource?: any;
    iconName?: any;
    iconType?: string;
    iconSize?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;

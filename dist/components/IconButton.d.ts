/// <reference types="react" />
import { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
export declare function IconButton(props: {
    onPress: () => void;
    iconColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    imageSource?: ImageSourcePropType;
    iconName?: any;
    iconType?: string;
    iconSize?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;

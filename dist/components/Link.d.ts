/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function Link(props: {
    title: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}): JSX.Element;

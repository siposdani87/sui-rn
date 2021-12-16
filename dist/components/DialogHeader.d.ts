/// <reference types="react" />
import { ImageSourcePropType } from 'react-native';
export default function DialogHeader(props: {
    title?: string;
    imageSource?: ImageSourcePropType;
    onClose?: () => void;
}): JSX.Element;

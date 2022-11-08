/// <reference types="react" />
import { ImageURISource, StyleProp, ViewStyle } from 'react-native';
import { MapStyleElement, MapType } from 'react-native-maps';
export interface LocationType {
    address: string;
    latitude: number;
    longitude: number;
}
export declare function LocationField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    latitudeText: string;
    longitudeText: string;
    markerImage?: ImageURISource;
    onSearch?: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    mapType?: MapType;
    customMapStyle?: MapStyleElement[];
}): JSX.Element;

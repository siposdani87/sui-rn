/// <reference types="react" />
import { ImageURISource } from 'react-native';
import { MapTypes, MapStyleElement } from 'react-native-maps';
export interface LocationType {
    address: string;
    latitude: number;
    longitude: number;
}
export default function LocationField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    latitudeText: string;
    longitudeText: string;
    markerImage?: ImageURISource;
    onSearch?: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    mapType?: MapTypes;
    customMapStyle?: MapStyleElement[];
}): JSX.Element;

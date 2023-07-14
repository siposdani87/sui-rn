import React from 'react';
import { ImageURISource, StyleProp, ViewStyle } from 'react-native';
import { MapStyleElement, MapType } from 'react-native-maps';
import { ErrorValueType } from './ErrorField';
type LocationType = {
    address: string;
    latitude: number;
    longitude: number;
};
export type LocationFieldValueType = LocationType | null;
export declare function LocationField(props: {
    value: LocationFieldValueType;
    onValueChange: (_value: LocationFieldValueType) => void;
    latitudeText: string;
    longitudeText: string;
    markerImage?: ImageURISource;
    onSearch?: (_value: LocationFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    mapType?: MapType;
    customMapStyle?: MapStyleElement[];
}): React.JSX.Element;
export {};

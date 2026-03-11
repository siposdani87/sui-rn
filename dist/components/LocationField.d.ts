import React from 'react';
import { ImageURISource } from 'react-native';
import { MapStyleElement, MapType } from 'react-native-maps';
import { BaseFieldProps } from './BaseFieldProps';
export type LocationType = {
    address: string;
    latitude: number;
    longitude: number;
};
export type LocationFieldValueType = LocationType | null;
export declare function LocationField(props: BaseFieldProps & {
    value: LocationFieldValueType;
    onValueChange: (value: LocationFieldValueType) => void;
    latitudeText: string;
    longitudeText: string;
    markerImage?: ImageURISource;
    onSearch?: (value: LocationFieldValueType) => void;
    mapType?: MapType;
    customMapStyle?: MapStyleElement[];
}): React.JSX.Element;
//# sourceMappingURL=LocationField.d.ts.map
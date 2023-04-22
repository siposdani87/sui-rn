import React, { useState, useEffect, ReactNode } from 'react';
import {
    View,
    StyleSheet,
    ImageURISource,
    NativeSyntheticEvent,
    LayoutRectangle,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { TextField } from './TextField';
import { Colors, Styles } from '../constants';
import { IconButton } from './IconButton';
import MapView, {
    Marker,
    MapStyleElement,
    LatLng,
    Region,
    MapMarkerProps,
    MapType,
    MarkerDragStartEndEvent,
} from 'react-native-maps';
import { NumberField } from './NumberField';
import { useDarkTheme, useActionColor } from '../hooks';
import { ErrorValueType } from './ErrorField';

type LocationType = {
    address: string;
    latitude: number;
    longitude: number;
};

export type LocationFieldValueType = LocationType | null;

const defaultValue: LocationFieldValueType = {
    address: '',
    latitude: 0,
    longitude: 0,
};

export function LocationField(props: {
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
}) {
    const [value, setValue] = useState<LocationFieldValueType>(
        props.value || defaultValue,
    );
    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const [visibleCoords, setVisibleCoords] = useState<boolean>(false);
    const isDarkTheme = useDarkTheme();
    const getActionColor = useActionColor(props.disabled);

    const onValueChange = (v: LocationFieldValueType): void => {
        setValue(v);
        props.onValueChange(v);
    };

    const onAddressChange = (address: string): void => {
        const v = {
            ...value!,
            address,
        };
        onValueChange(v);
    };

    const onLatitudeChange = (latitude: number): void => {
        const v = { ...value!, latitude };
        onValueChange(v);
    };

    const onLongitudeChange = (longitude: number): void => {
        const v = { ...value!, longitude };
        onValueChange(v);
    };

    const onCoordinatehange = (latitude: number, longitude: number): void => {
        const v = { ...value!, latitude, longitude };
        onValueChange(v);
    };

    const toggleSettings = (): void => {
        setVisibleCoords(!visibleCoords);
    };

    const onSearch = (): void => {
        props.onSearch?.(value);
    };

    const getLocationProps = (): Partial<MapMarkerProps> => {
        return {
            style: { height: 100, width: 100 },
            image: props.markerImage,
        };
    };

    const onDragEnd = (event: MarkerDragStartEndEvent): void => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        onCoordinatehange(latitude, longitude);
    };

    const getCoordinates = (v: LocationFieldValueType): LatLng => {
        return {
            latitude: v!.latitude,
            longitude: v!.longitude,
        };
    };

    const regionFrom = (coords: {
        latitude: number;
        longitude: number;
        accuracy?: number;
    }): Region => {
        const latitude = coords?.latitude || 0;
        const longitude = coords?.longitude || 0;

        const latitudeDelta = 0.02;
        const longitudeDelta =
            ((dimensions?.width ?? 1) / (dimensions?.height ?? 1)) *
            latitudeDelta;

        return {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        };
    };

    const onLayout = (
        event: NativeSyntheticEvent<{ layout: LayoutRectangle }>,
    ): void => {
        if (dimensions) {
            return;
        }
        const { width } = event.nativeEvent.layout;
        const height = (width / 16) * 9;
        setDimensions({ width, height });
    };

    const getActionButtons = (): ReactNode[] => {
        const actionButtons: ReactNode[] = [];
        if (props.onSearch) {
            actionButtons.push(
                <IconButton
                    iconName="pin-drop"
                    containerStyle={Styles.fieldIconButton}
                    iconColor={getActionColor()}
                    onPress={onSearch}
                />,
            );
        }
        const primaryColor = isDarkTheme
            ? Colors.primaryBright
            : Colors.primary;

        actionButtons.push(
            <IconButton
                iconName="settings"
                containerStyle={Styles.fieldIconButton}
                iconColor={visibleCoords ? Colors.accent : primaryColor}
                onPress={toggleSettings}
            />,
        );
        return actionButtons;
    };

    useEffect(() => {
        const coords = props.value || defaultValue;
        setValue(coords);
    }, [props.value]);

    return (
        <View
            style={[styles.container, props.containerStyle]}
            onLayout={onLayout}
        >
            <TextField
                style={styles.addressInput}
                label={props.label}
                value={value?.address}
                onValueChange={onAddressChange}
                required={props.required}
                error={props.error}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
                actionButtons={getActionButtons()}
            />
            {visibleCoords && (
                <View style={styles.coordsContainer}>
                    <NumberField
                        containerStyle={{ flex: 1, marginRight: 5 }}
                        label={props.latitudeText}
                        value={value?.latitude}
                        onValueChange={onLatitudeChange}
                        required={props.required}
                        disabled={props.disabled}
                    />
                    <NumberField
                        containerStyle={{ flex: 1, marginLeft: 5 }}
                        label={props.longitudeText}
                        value={value?.longitude}
                        onValueChange={onLongitudeChange}
                        required={props.required}
                        disabled={props.disabled}
                    />
                </View>
            )}
            {dimensions && (
                <MapView
                    style={[styles.mapContainer, dimensions]}
                    region={regionFrom(getCoordinates(value))}
                    mapType={props.mapType}
                    customMapStyle={props.customMapStyle}
                >
                    {!!value?.latitude && !!value?.longitude && (
                        <Marker
                            draggable={true}
                            onDragEnd={onDragEnd}
                            tracksViewChanges={false}
                            {...getLocationProps()}
                            identifier="marker"
                            coordinate={getCoordinates(value)}
                            title={value?.address.toString()}
                        />
                    )}
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    coordsContainer: {
        flexDirection: 'row',
    },
    addressInput: {
        paddingRight: 60,
    },
    mapContainer: {
        borderRadius: 3,
    },
});

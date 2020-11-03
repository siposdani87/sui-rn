import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageURISource } from 'react-native';
import TextField from './TextField';
import { Colors, Styles } from '../constants';
import IconButton from './IconButton';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import NumberField from './NumberField';
import useDarkTheme from '../hooks/useDarkTheme';

export default function LocationField(props: { value: any, onValueChange: (value: any) => void, latitudeText: string, longitudeText: string, markerImage?: ImageURISource, onSearch?: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any }) {
  const defaultValue = {
    address: '',
    latitude: 0,
    longitude: 0,
  };
  const [value, setValue] = useState(props.value || defaultValue);
  const [dimensions, setDimensions] = useState(null);
  const [visibleCoords, setVisibleCoords] = useState(false);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    const coords = props.value || defaultValue;
    setValue(coords);
  }, [props.value]);

  function onValueChange(v) {
    setValue(v);
    props.onValueChange(v);
  }

  function onAddressChange(address) {
    const v = { ...value, address };
    onValueChange(v);
  }

  function onLatitudeChange(latitude) {
    const v = { ...value, latitude };
    onValueChange(v);
  }

  function onLongitudeChange(longitude) {
    const v = { ...value, longitude };
    onValueChange(v);
  }

  function toggleSettings() {
    setVisibleCoords(!visibleCoords);
  }

  function onSearch() {
    if (props.onSearch) {
      props.onSearch(value);
    }
  }

  function getLocationProps() {
    return {
      style: { height: 100, width: 100 },
      image: props.markerImage,
    };
  }

  function onDragEnd(event: MapEvent) {
    console.log(event);
  }

  function getCoordinates(v) {
    return {
      latitude: v.latitude,
      longitude: v.longitude,
    }
  }

  function regionFrom(coords: { latitude: number, longitude: number, accuracy?: number }) {
    const lat = coords?.latitude || 0;
    const lon = coords?.longitude || 0;
    const accuracy = coords?.accuracy || 10;
    // const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    // const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
    // const longitudeDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    const latitudeDelta = 0.02;
    const longitudeDelta = (dimensions.width / dimensions.height) * latitudeDelta;

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
      accuracy,
    }
  }

  function onLayout(event) {
    if (dimensions) {
      return;
    }
    let { width, height } = event.nativeEvent.layout;
    height = (width / 16) * 9;
    setDimensions({ width, height });
  }

  return (
    <View style={[styles.container, props.containerStyle]} onLayout={onLayout}>
      <TextField style={styles.addressInput} label={props.label} value={value.address} onValueChange={onAddressChange} required={props.required} error={props.error} disabled={props.disabled}>
        {!!props.onSearch && (
          <IconButton iconName='pin-drop' containerStyle={Styles.fieldIconButton} iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={onSearch} />
        )}
        <IconButton iconName='settings' containerStyle={Styles.fieldIconButton} iconColor={visibleCoords ? Colors.accent : (isDarkTheme ? Colors.primaryBright : Colors.primary)} onPress={toggleSettings} />
      </TextField>
      {visibleCoords && (
        <View style={styles.coordsContainer}>
          <NumberField containerStyle={{ flex: 1, marginRight: 5 }} label={props.latitudeText} value={value.latitude} onValueChange={onLatitudeChange} required={props.required} disabled={props.disabled} />
          <NumberField containerStyle={{ flex: 1, marginLeft: 5 }} label={props.longitudeText} value={value.longitude} onValueChange={onLongitudeChange} required={props.required} disabled={props.disabled} />
        </View>
      )}
      {dimensions && (
        <MapView style={[styles.mapContainer, dimensions]} region={regionFrom(getCoordinates(value))} scrollEnabled={true}>
          {!!value.latitude && !!value.longitude && (
            <Marker draggable={false} onDragEnd={onDragEnd} key='marker' {...getLocationProps()} identifier='marker' coordinate={getCoordinates(value)} title={value.address} />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  coordsContainer: {
    flexDirection: 'row',
  },
  addressInput: {
    paddingRight: 60,
  },
  mapContainer: {
    borderRadius: 3,
    // ...StyleSheet.absoluteFillObject,
  },
});

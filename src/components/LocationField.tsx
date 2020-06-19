import React, { useState, useEffect } from 'react';
// import ErrorField from './ErrorField';
// import Label from './Label';
import { View, StyleSheet, ImageURISource } from 'react-native';
// import useBaseField from './useBaseField';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import TextField from './TextField';
import NumberField from './NumberField';
import { Colors } from '../constants';
import IconButton from './IconButton';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import { Layout } from '../constants';

export default function LocationField(props: { markerImage: ImageURISource, region: any, value: any, label: string, error: any, onValueChange: (value: any) => void, onSearch?: (value: any) => void, latitudeText: string, longitudeText: string, required?: boolean, disabled?: boolean, color?: string }) {
  const defaultValue = {
    address: '',
    latitude: null,
    longitude: null,
  };
  const [value, setValue] = useState(props.value || defaultValue);
  const [visibleCoords, setVisibleCoords] = useState(false);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    const coords = props.value || defaultValue;
    setValue(coords);
  }, [props.value]);

  function _onValueChange(v) {
    props.onValueChange(v);
    setValue(v);
  }

  function _onAddressChange(address) {
    value.address = address;
    _onValueChange(value);
  }

  function _onLatitudeChange(latitude) {
    value.latitude = latitude;
    _onValueChange(value);
  }

  function _onLongitudeChange(longitude) {
    value.longitude = longitude;
    _onValueChange(value);
  }

  function toggleSettings() {
    setVisibleCoords(!visibleCoords);
  }

  /* function onSearch() {
    if (props.onSearch) {
      props.onSearch(value);
    }
  } */

  function getLocationProps() {
    return {
      style: { height: 100, width: 100 },
      image: props.markerImage,
    };
  }

  function onDragEnd(event: MapEvent){
    console.log(event)
  }

  return (
    <View style={styles.baseContainer}>
      <TextField style={styles.input} label={props.label} value={value.address} onValueChange={_onAddressChange} required={props.required} error={props.error} disabled={props.disabled} />
      <View style={styles.actionsContainer}>
        {/* <IconButton iconName='pin-drop' style={styles.iconButton} color='transparent' textColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={onSearch} /> */}
        <IconButton iconName='settings' style={styles.iconButton} color='transparent' textColor={visibleCoords ? Colors.accent : (isDarkTheme ? Colors.primaryBright : Colors.primary)} onPress={toggleSettings} />
      </View>
      {visibleCoords && (
        <View style={styles.coordsContainer}>
          <NumberField containerStyle={{ flex: 1, marginRight: 5 }} label={props.latitudeText} value={value.latitude} onValueChange={_onLatitudeChange} required={props.required} error={null} disabled={props.disabled} />
          <NumberField containerStyle={{ flex: 1, marginLeft: 5 }} label={props.longitudeText} value={value.longitude} onValueChange={_onLongitudeChange} required={props.required} error={null} disabled={props.disabled} />
        </View>
      )}
      <MapView style={styles.mapContainer} region={props.region} scrollEnabled={true}>
          {value.latitude && value.longitude && (
            <Marker draggable={true} onDragEnd={onDragEnd} key={'marker'} {...getLocationProps()} identifier={'marker'} coordinate={value} title={value.address} description='' />
          )}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  coordsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionsContainer: {
    position: 'absolute',
    top: 25,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    padding: 1,
    margin: 2,
  },
  input: {
    paddingRight: 60,
  },
  mapContainer: {
    borderRadius: 5,
    width: Layout.window.width - 40,
    height: 200,
  },
});

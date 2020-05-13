import React, { useState, useEffect } from 'react';
// import ErrorField from './ErrorField';
// import Label from './Label';
import { View, StyleSheet } from 'react-native';
// import useBaseField from './useBaseField';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import TextField from './TextField';
import NumberField from './NumberField';

export default function LocationField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, latitudeText: string, longitudeText: string, required?: boolean, disabled?: boolean, color?: string}) {
  const defaultValue = {
    address: '',
    latitude: null,
    longitude: null,
  };
  const [value, setValue] = useState(props.value || defaultValue);

  useEffect(() => {
    setValue(props.value || defaultValue);
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

  return (
    <View style={styles.baseContainer}>
      <TextField label={props.label} value={value.address} onValueChange={_onAddressChange} required={props.required} error={props.error} disabled={props.disabled} />
      <NumberField label={props.latitudeText} value={value.latitude} onValueChange={_onLatitudeChange} required={props.required} error={null} disabled={props.disabled} />
      <NumberField label={props.longitudeText} value={value.longitude} onValueChange={_onLongitudeChange} required={props.required} error={null} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
});

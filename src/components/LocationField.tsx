import React, { useState, useEffect } from 'react';
// import ErrorField from './ErrorField';
// import Label from './Label';
import { View, StyleSheet } from 'react-native';
// import useBaseField from './useBaseField';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import TextField from './TextField';
import NumberField from './NumberField';
import Dialog from './Dialog';
import { useTranslation } from 'react-i18next';
import { Colors, Styles } from '../constants';
import Button from './Button';
import TextButton from './TextButton';
import IconButton from './IconButton';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function LocationField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, onSearch?: (value: any) => void, latitudeText: string, longitudeText: string, required?: boolean, disabled?: boolean, color?: string}) {
  const defaultValue = {
    address: '',
    latitude: null,
    longitude: null,
  };
  const { t } = useTranslation(); 
  const [value, setValue] = useState(props.value || defaultValue);
  const [visibleCoords, setVisibleCoords] = useState(false);
  const [visibleMap, setVisibleMap] = useState(false);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;


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

  function closeMapDialog() {
    setVisibleMap(false);
  }

  function setMapDialog() {
    setVisibleMap(false);
  }

  function openMapDialog() {
    setVisibleMap(true);
  }

  function toggleSettings() {
    setVisibleCoords(!visibleCoords);
  }

  return (
    <View style={styles.baseContainer}>
      <Dialog visible={!!visibleMap} title={t('captions.site.info')} onClose={closeMapDialog} buttons={[<TextButton key={0} title={t('buttons.cancel')} style={{ marginLeft: 10 }} onPress={closeMapDialog} />, <Button key={1} title={t('buttons.ok')} style={{ marginLeft: 10 }} onPress={setMapDialog} />]}>
        
      </Dialog>
      <TextField style={styles.input} label={props.label} value={value.address} onValueChange={_onAddressChange} required={props.required} error={props.error} disabled={props.disabled} />
      <View style={styles.actionsContainer}>
        <IconButton iconName='map' style={styles.iconButton} color='transparent' textColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openMapDialog} />
        <IconButton iconName='settings' style={styles.iconButton} color='transparent' textColor={visibleCoords ? Colors.accent : (isDarkTheme ? Colors.primaryBright : Colors.primary)} onPress={toggleSettings} />
      </View>
      {visibleCoords && (
        <View style={styles.coordsContainer}>
          <NumberField label={props.latitudeText} value={value.latitude} onValueChange={_onLatitudeChange} required={props.required} error={null} disabled={props.disabled} />
          <NumberField label={props.longitudeText} value={value.longitude} onValueChange={_onLongitudeChange} required={props.required} error={null} disabled={props.disabled} />
        </View>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  coordsContainer: {
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
});

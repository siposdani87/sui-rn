import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Image } from 'react-native';
import useBaseField from './useBaseField';
import IconButton from './IconButton';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors } from '../constants';

export default function FileField(props: { value: any, mimeType: string, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, color?: string }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [hasCameraRollPermission, setCameraRollPermission] = useState(false);
  // const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  const options = {
    mediaTypes: isImage() ? ImagePicker.MediaTypeOptions.Images : (isVideo() ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.All),
    allowsEditing: true,
    // aspect: [16, 9],
    quality: 1,
    base64: true,
    exif: false,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    async function _requestCameraPermission() {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    }
    _requestCameraPermission();
  }, []);

  useEffect(() => {
    async function _requestCameraRollPermission() {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      setCameraRollPermission(status === 'granted');
    }
    _requestCameraRollPermission();
  }, []);

  function _onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function isImage(): boolean {
    return props.mimeType.indexOf('images/') !== -1;
  }

  function isVideo(): boolean {
    return props.mimeType.indexOf('videos/') !== -1;
  }

  function isOther(): boolean {
    return !isImage() && !isVideo();
  }

  async function openImageLibrary() {
    if (!hasCameraRollPermission) {
      return null;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        _onValueChange('data:image/jpeg;base64,' + result.base64);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function openCamera() {
    if (!hasCameraPermission || !hasCameraRollPermission) {
      return null;
    }
    try {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        _onValueChange('data:image/jpeg;base64,' + result.base64);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function openDocumentLibrary() {
    DocumentPicker.getDocumentAsync({
      type: props.mimeType || '*/*',
    });
  }

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {isOther() && (
          <IconButton iconName='file' color={Colors.accent} textColor={Colors.black} onPress={openDocumentLibrary} />
        )}
        {!isOther() && (
          <IconButton iconName='add_a_photo' color={Colors.accent} textColor={Colors.black} onPress={openCamera} />
        )}
        {!isOther() && (
          <IconButton iconName='add_photo_alternate' color={Colors.accent} textColor={Colors.black} onPress={openImageLibrary} />
        )}
        {value && (
          <Image source={{ uri: value }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 36,
  },
});

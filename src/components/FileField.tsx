import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Image, Alert, ImageSourcePropType, Text } from 'react-native';
import useBaseField from './useBaseField';
import IconButton from './IconButton';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Styles } from '../constants';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FileField(props: { value: any, mimeType: string, label: string, error: any, onValueChange: (value: any) => void, imageSource?: ImageSourcePropType, required?: boolean, disabled?: boolean, aspect?: [number, number], quality?: number }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);
  const [fileName, setFileName] = useState('');
  const [error, onErrorChange] = useBaseField(props);
  // const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: isImage() ? ImagePicker.MediaTypeOptions.Images : (isVideo() ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.All),
    allowsEditing: true,
    aspect: props.aspect,
    quality: props.quality,
    base64: true,
    exif: true,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function _onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function isImage(): boolean {
    return props.mimeType.indexOf('image') === 0;
  }

  function isVideo(): boolean {
    return props.mimeType.indexOf('video') === 0;
  }

  function isDocument(): boolean {
    return !(isImage() || isVideo());
  }

  async function openImageLibrary() {
    const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (cameraRollPermission.status === 'granted') {
      try {
        const result = await ImagePicker.launchImageLibraryAsync(options);
        if (result.cancelled === false) {
          setFileName(result.uri.split('/').pop());
          _onValueChange('data:image/jpeg;base64,' + result.base64);
        }
      } catch (e) {
        showAlert(e);
      }
    }
  }

  async function openCamera() {
    const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraRollPermission.status === 'granted' && cameraPermission.status === 'granted') {
      try {
        const result = await ImagePicker.launchCameraAsync(options);
        if (result.cancelled === false) {
          setFileName(result.uri.split('/').pop());
          _onValueChange('data:image/jpeg;base64,' + result.base64);
        }
      } catch (e) {
        showAlert(e);
      }
    }
  }

  async function openDocumentLibrary() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: props.mimeType || '*/*',
      });
      if (result.type !== 'cancel') {
        setFileName(result.name);
        _onValueChange(result.uri);
      }
    } catch (e) {
      showAlert(e);
    }
  }

  function showAlert(e) {
    Alert.alert(
      t('errors.info'),
      e.message,
      [
        { text: t('buttons.ok'), onPress: () => { } },
      ],
      { cancelable: true },
    );
  }

  function removeImage() {
    setFileName('');
    _onValueChange(null);
  }

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <View style={styles.uploaderContainer}>
        <View style={styles.imageContainer}>
          {!isDocument() && value && (
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeImage}>
              <Image source={{ uri: value }} style={styles.image} />
            </TouchableOpacity>
          )}
          {!isDocument() && !value && props.imageSource && (
            <Image source={props.imageSource} style={styles.image} />
          )}
          {!!fileName && (
            <Text style={styles.text}>{fileName}</Text>
          )}
        </View>
        <View style={styles.actionContainer}>
          {isDocument() && (
            <IconButton iconName='note-add' color={Colors.accent} textColor={Colors.black} onPress={openDocumentLibrary} />
          )}
          {!isDocument() && (
            <IconButton iconName='add-a-photo' color={Colors.accent} textColor={Colors.black} onPress={openCamera} />
          )}
          {!isDocument() && (
            <IconButton iconName='library-add' color={Colors.accent} textColor={Colors.black} onPress={openImageLibrary} />
          )}
        </View>
      </View>
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  uploaderContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  actionContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {

  },
});

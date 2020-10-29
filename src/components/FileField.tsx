import React, { useState, useEffect, useReducer } from 'react';
import Label from './Label';
import { View, StyleSheet, Image, Alert, ImageURISource, ImageRequireSource, TouchableOpacity } from 'react-native';
import useBaseField from './useBaseField';
import IconButton from './IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Styles } from '../constants';
import TextField from './TextField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function FileField(props: { value: ImageURISource | ImageRequireSource, mimeType: string, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, aspect?: [number, number], quality?: number, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    { fileName: '', fileData: '' },
  );
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: isImage() ? ImagePicker.MediaTypeOptions.Images : (isVideo() ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.All),
    allowsEditing: true,
    aspect: props.aspect,
    quality: props.quality,
    base64: true,
    exif: true,
  };

  /* useEffect(() => {
    if ((typeof props.value === 'number' || (props.value as ImageURISource)?.uri) && !state.fileData) {
      setValue(props.value);
      removeImage();
    }
  }, [props.value]); */

  useEffect(() => {
    if ((props.value as ImageURISource)?.uri && !state.fileData) {
      setValue(props.value);
      removeImage();
    }
  }, [(props.value as ImageURISource)?.uri]);

  function _onFileDataChange(fileName, fileData) {
    onErrorChange();
    setState({ fileName, fileData });
    props.onValueChange(fileData);
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
          _onFileDataChange(result.uri.split('/').pop(), 'data:image/jpeg;base64,' + result.base64);
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
          _onFileDataChange(result.uri.split('/').pop(), 'data:image/jpeg;base64,' + result.base64);
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
        _onFileDataChange(result.name, result.uri);
      }
    } catch (e) {
      showAlert(e);
    }
  }

  function showAlert(e) {
    Alert.alert(
      'ERROR',
      e.message,
      [
        { text: 'OK', onPress: () => null },
      ],
      { cancelable: true },
    );
  }

  function removeImage() {
    _onFileDataChange('', '');
  }

  function onFilenameChange(v) {
    setState({ fileName: v });
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <View style={styles.imageContainer}>
        {!isDocument() && !!state.fileData && (
          <View style={styles.imageBox}>
            <IconButton containerStyle={styles.removeIconButtonContainer} iconName='close' backgroundColor={Colors.accent} iconColor={Colors.accentText} onPress={removeImage} />
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeImage}>
              <Image source={{ uri: state.fileData }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
        {!isDocument() && !state.fileData && !!value && (
          <Image source={value} style={styles.image} />
        )}
      </View>
      <TextField style={styles.fileInput} label='' value={state.fileName || ''} onValueChange={onFilenameChange} required={props.required} error={error} disabled={props.disabled}>
        {isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='description' iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openDocumentLibrary} />
        )}
        {!isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='photo-camera' iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openCamera} />
        )}
        {!isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='collections' iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openImageLibrary} />
        )}
      </TextField>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 100,
    marginBottom: 5,
  },
  fileInput: {
    paddingRight: 60,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageBox: {
    position: 'relative',
  },
  removeIconButtonContainer: {
    position: 'absolute',
    top: -10,
    right: -20,
    zIndex: 1,
  },
});

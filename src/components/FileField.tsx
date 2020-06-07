import React, { useState, useEffect, useReducer } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Image, Alert, Text } from 'react-native';
import useBaseField from './useBaseField';
import IconButton from './IconButton';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Styles } from '../constants';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FileField(props: { value: any, mimeType: string, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, aspect?: [number, number], quality?: number }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { fileName: '', fileData: null }
  );
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
    if (props.value.uri){
      setValue(props.value);
    }
  }, [props.value.uri]);

  function _onFileDataChange(fileName, fileData) {
    onErrorChange();
    props.onValueChange(fileData);
    setState({ fileName, fileData });
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
      t('errors.info'),
      e.message,
      [
        { text: t('buttons.ok'), onPress: () => { } },
      ],
      { cancelable: true },
    );
  }

  function removeImage() {
    _onFileDataChange('', null);
  }

  console.log(state.fileName, value)

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <View style={styles.uploaderContainer}>
        <View style={styles.imageContainer}>
          {!isDocument() && state.fileData && (
            <View style={styles.imageBox}>
              <IconButton containerStyle={styles.removeIconButtonContainer} style={styles.removeIconButton} iconName='delete' color={Colors.accent} textColor={Colors.black} onPress={removeImage}></IconButton>
              <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeImage}>
                <Image source={{ uri: state.fileData }} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
          {!isDocument() && !state.fileData && value && (
            <Image source={value} style={styles.image} />
          )}
          {!!state.fileName && (
            <Text style={styles.text}>{state.fileName}</Text>
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
  imageBox: {
    position: 'relative',
  },
  removeIconButtonContainer: {
    position: 'absolute',
    top: -15,
    right: -15,
    zIndex: 1,
  },
  removeIconButton: {
    padding: 1,

  }
});

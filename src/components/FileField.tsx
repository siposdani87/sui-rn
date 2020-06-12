import React, { useState, useEffect, useReducer } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Image, Alert, Text, ImageURISource } from 'react-native';
import useBaseField from './useBaseField';
import IconButton from './IconButton';
// import { useColorScheme } from 'react-native-appearance';
// import environment from '../config/environment';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Styles } from '../constants';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextField from './TextField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function FileField(props: { value: ImageURISource, source: ImageURISource, mimeType: string, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, aspect?: [number, number], quality?: number }) {
  const { t } = useTranslation();
  const [_value, setValue] = useState(props.value);
  const [source, setSource] = useState(props.source);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { fileName: '', fileData: '' }
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

  useEffect(() => {
    setValue(props.value);
  }, [props.value.uri]);

  useEffect(() => {
    if (props.source.uri) {
      setSource(props.source);
      removeImage();
    }
  }, [props.source.uri]);

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
    _onFileDataChange('', '');
  }

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <View style={styles.imageContainer}>
        {!isDocument() && !!state.fileData && (
          <View style={styles.imageBox}>
            <IconButton containerStyle={styles.removeIconButtonContainer} style={styles.removeIconButton} iconName='close' iconSize={20} color={Colors.accent} textColor={Colors.black} onPress={removeImage}></IconButton>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeImage}>
              <Image source={{ uri: state.fileData }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
        {!isDocument() && !state.fileData && source && (
          <Image source={source} style={styles.image} />
        )}
      </View>
      <TextField style={styles.input} label='' value={state.fileName || ''} onValueChange={() => { }} required={props.required} error={error} disabled={props.disabled} />
      <View style={styles.actionsContainer}>
        {isDocument() && (
          <IconButton style={styles.iconButton} iconName='description' color='transparent' textColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openDocumentLibrary} />
        )}
        {!isDocument() && (
          <IconButton style={styles.iconButton} iconName='photo-camera' color='transparent' textColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openCamera} />
        )}
        {!isDocument() && (
          <IconButton style={styles.iconButton} iconName='collections' color='transparent' textColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={openImageLibrary} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 100,
    marginBottom: 5,
  },
  actionsContainer: {
    position: 'absolute',
    top: 130,
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
  image: {
    width: 100,
    height: 100,
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

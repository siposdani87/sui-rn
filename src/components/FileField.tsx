import React, { useState, useEffect, useReducer } from 'react';
import Label from './Label';
import SUI from 'sui-js';
import { View, StyleSheet, Image, Alert, ImageURISource, ImageRequireSource, TouchableOpacity } from 'react-native';
import useErrorField from '../hooks/useErrorField';
import IconButton from './IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Styles } from '../constants';
import TextField from './TextField';
import useActionColor from '../hooks/useActionColor';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { SvgCss } from 'react-native-svg';

const fileTypes = {
  'docx': 'blue',
  'xlsx': 'green',
  'pdf': 'red',
};

const fileTypeSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
  '<path style="fill:#E2E5E7;" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>' +
  '<path style="fill:#B0B7BD;" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>' +
  '<polygon style="fill:#CAD1D8;" points="480,224 384,128 480,128 "/>' +
  '<path style="fill:#CAD1D8;" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>' +
  '<path style="fill:#000000;" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16V416z"/>' +
  '<text x="220" y="380" text-anchor="middle" style="fill:#FFF;font-weight:700;font-family:Arial;font-size:120px;">TYPE</text>' +
  '</svg>';

export default function FileField(props: { value: ImageURISource | ImageRequireSource, mimeType: string, onValueChange: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, aspect?: [number, number], quality?: number, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [svgXml, setSvgXml] = useState(null);
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    { fileName: '', fileData: '' },
  );
  const [error, onErrorChange] = useErrorField(props.error);
  const getActionColor = useActionColor(props.disabled);
  const searchStr = ';base64,';

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: isImage() ? ImagePicker.MediaTypeOptions.Images : (isVideo() ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.All),
    allowsEditing: true,
    aspect: props.aspect,
    quality: props.quality,
    base64: true,
    exif: true,
  };

  useEffect(() => {
    if (isDocument()) {
      _setDefaultSvg();
    }
  }, []);

  useEffect(() => {
    if ((props.value as ImageURISource)?.uri && !state.fileData) {
      setValue(props.value);
      removeImage();
    }
  }, [(props.value as ImageURISource)?.uri]);

  function _setDefaultSvg(){
    const color = props.required ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10' : 'grey';
    const defaultSrc = _getFileIconSrc('N/A', color);
    setSvgXml(defaultSrc);
  }

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

  function _getFileIconSrc(type, color) {
    return fileTypeSVG.replace('#000000', color).replace('TYPE', type);
  }

  function handleDataUri(result: ImageInfo) {
    const filename = result.uri.split('/').pop();
    const uri = 'data:image/jpeg;base64,' + result.base64;
    const dataUri = uri.replace(searchStr, ';filename=' + filename + searchStr);
    _onFileDataChange(filename, dataUri);
  }

  async function openImageLibrary() {
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryPermission.status === 'granted') {
      try {
        const result = await ImagePicker.launchImageLibraryAsync(options);
        if (result.cancelled === false) {
          handleDataUri(result);
        }
      } catch (e) {
        showAlert(e);
      }
    }
  }

  async function openCamera() {
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (mediaLibraryPermission.status === 'granted' && cameraPermission.status === 'granted') {
      try {
        const result = await ImagePicker.launchCameraAsync(options);
        if (result.cancelled === false) {
          handleDataUri(result);
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
        const type = SUI.getExtensionName(result.name);
        const color = fileTypes[type];
        const fileIconSrc = _getFileIconSrc(type, color);
        setSvgXml(fileIconSrc);
        const dataUri = result.uri.replace(searchStr, ';filename=' + result.name + searchStr);
        _onFileDataChange(result.name, dataUri);
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

  function removeDocument() {
    _setDefaultSvg();
    _onFileDataChange('', '');
  }

  function onFilenameChange(v) {
    setState({ fileName: v });
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      <View style={styles.imageContainer}>
        {!isDocument() && !!state.fileData && (
          <View style={styles.imageBox}>
            <IconButton containerStyle={styles.removeIconButtonContainer} style={{ padding: 0 }} iconName='close' backgroundColor={Colors.accent} iconColor={Colors.accentText} onPress={removeImage} />
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeImage}>
              <Image source={{ uri: state.fileData }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
        {!isDocument() && !state.fileData && !!value && (
          <Image source={value} style={styles.image} />
        )}
        {isDocument() && !!state.fileData && !!svgXml && (
          <View style={styles.imageBox}>
            <IconButton containerStyle={styles.removeIconButtonContainer} style={{ padding: 0 }} iconName='close' backgroundColor={Colors.accent} iconColor={Colors.accentText} onPress={removeDocument} />
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={removeDocument}>
              <SvgCss xml={svgXml} width="100" height="100" />
            </TouchableOpacity>
          </View>
        )}
        {isDocument() && !state.fileData && !!svgXml && (
          <SvgCss xml={svgXml} width="100" height="100" />
        )}
      </View>
      <TextField style={[props.style, styles.fileInput]} label='' value={state.fileName || ''} onValueChange={onFilenameChange} required={props.required} error={error} disabled={props.disabled}>
        {isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='description' iconColor={getActionColor()} onPress={openDocumentLibrary} />
        )}
        {!isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='photo-camera' iconColor={getActionColor()} onPress={openCamera} />
        )}
        {!isDocument() && (
          <IconButton containerStyle={Styles.fieldIconButton} iconName='image' iconColor={getActionColor()} onPress={openImageLibrary} />
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
    margin: 5,
  },
});

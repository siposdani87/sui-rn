import React, { useState, useEffect, useCallback } from 'react';
import { Label } from './Label';
import { View, StyleSheet, Image, Alert, } from 'react-native';
import { useErrorField } from '../hooks/useErrorField';
import { IconButton } from './IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Styles } from '../constants';
import { TextField } from './TextField';
import { useActionColor } from '../hooks/useActionColor';
import { SvgCss } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import { getExtensionName } from '@siposdani87/sui-js';
const fileColors = {
    docx: 'blue',
    xlsx: 'green',
    pdf: 'red',
};
const mimeTypes = {
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
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
const searchStr = ';base64,';
const isImage = (mimeType) => {
    return mimeType.indexOf('image') === 0;
};
const isVideo = (mimeType) => {
    return mimeType.indexOf('video') === 0;
};
const isDocument = (mimeType) => {
    return !isImage(mimeType) && !isVideo(mimeType);
};
const isRequireSourceType = (v) => {
    return v !== null && v >= 0;
};
const getValueUri = (v) => {
    return v?.uri ?? '';
};
const isValidValueUri = (imageSourceType) => {
    return !!getValueUri(imageSourceType);
};
const isValidValue = (v) => {
    return isValidValueUri(v) || isRequireSourceType(v);
};
const getFileIconSrc = (type, color) => {
    return fileTypeSVG.replace('#000000', color).replace('TYPE', type);
};
const getSvgXmlByFilename = (filename) => {
    const type = getExtensionName(filename);
    const color = fileColors[type] ?? 'black';
    return getFileIconSrc(type, color);
};
const getDataUri = (base64Data, filename) => {
    const mimeType = mimeTypes[getExtensionName(filename)];
    const uri = 'data:' + mimeType + ';base64,' + base64Data;
    return uri.replace(searchStr, ';filename=' + filename + searchStr);
};
const showAlert = (e) => {
    Alert.alert('ERROR', e.message, [{ text: 'OK', onPress: () => null }], {
        cancelable: true,
    });
};
export function FileField(props) {
    const [value, setValue] = useState(props.value);
    const [svgXml, setSvgXml] = useState(null);
    const [defaultSvgXml, setDefaultSvgXml] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [defaultImageSource, setDefaultImageSource] = useState(null);
    const [fileData, setFileData] = useState({
        filename: '',
        content: null,
    });
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);
    let mediaTypes = ImagePicker.MediaTypeOptions.All;
    if (isImage(props.mimeType)) {
        mediaTypes = ImagePicker.MediaTypeOptions.Images;
    }
    else if (isVideo(props.mimeType)) {
        mediaTypes = ImagePicker.MediaTypeOptions.Videos;
    }
    const options = {
        mediaTypes,
        allowsEditing: true,
        aspect: props.aspect,
        quality: props.quality,
        base64: true,
        exif: true,
    };
    const handleDefaultSvgXml = useCallback((v) => {
        if (isValidValueUri(v)) {
            setDefaultSvgXml(getSvgXmlByFilename(getValueUri(v)));
        }
        else {
            const color = props.required
                ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10'
                : 'grey';
            setDefaultSvgXml(getFileIconSrc('N/A', color));
        }
    }, [props.required]);
    const handleDefaultImageSource = useCallback((v) => {
        if (v && props.required) {
            setDefaultImageSource(v);
        }
        else if (props.defaultValue) {
            setDefaultImageSource(props.defaultValue);
        }
    }, [props.defaultValue, props.required]);
    const onDataChange = useCallback((filename, content) => {
        onErrorChange();
        setFileData({ filename, content });
        props.onValueChange(content);
    }, [onErrorChange, props]);
    const handleImageDataUri = async (result) => {
        if (!result.canceled) {
            const asset = result.assets[0];
            const filename = asset.fileName ?? asset.uri.split('/').pop() ?? 'file.jpeg';
            const dataUri = getDataUri(asset.base64, filename);
            setImageSource({ uri: dataUri });
            onDataChange(filename, dataUri);
        }
    };
    const handleDocumentDataUri = async (result) => {
        if (result.type === 'success') {
            const filename = result.name;
            const fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
                encoding: 'base64',
            });
            const dataUri = getDataUri(fileBase64, filename);
            setSvgXml(getSvgXmlByFilename(filename));
            onDataChange(filename, dataUri);
        }
    };
    const openImageLibrary = async () => {
        if (props.disabled) {
            return;
        }
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermission.status === 'granted') {
            try {
                const result = await ImagePicker.launchImageLibraryAsync(options);
                await handleImageDataUri(result);
            }
            catch (e) {
                showAlert(e);
            }
        }
    };
    const openCamera = async () => {
        if (props.disabled) {
            return;
        }
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (mediaLibraryPermission.status === 'granted' &&
            cameraPermission.status === 'granted') {
            try {
                const result = await ImagePicker.launchCameraAsync(options);
                await handleImageDataUri(result);
            }
            catch (e) {
                showAlert(e);
            }
        }
    };
    const openDocumentLibrary = async () => {
        if (props.disabled) {
            return;
        }
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: props.mimeType,
            });
            await handleDocumentDataUri(result);
        }
        catch (e) {
            showAlert(e);
        }
    };
    const isRemovable = () => {
        return !props.required && (isValidValue(value) || !!fileData.content);
    };
    const remove = () => {
        if (isRemovable()) {
            setSvgXml(defaultSvgXml);
            setImageSource(defaultImageSource);
            setValue(null);
            onDataChange('', null);
        }
    };
    const isRequired = () => {
        return !!props.required && !isValidValue(value);
    };
    const getActionButtons = () => {
        const actionsButtons = [];
        if (isRemovable()) {
            actionsButtons.push(<IconButton containerStyle={Styles.fieldIconButton} iconName="delete" iconColor={getActionColor()} onPress={remove} disabled={props.disabled}/>);
        }
        if (isDocument(props.mimeType)) {
            actionsButtons.push(<IconButton containerStyle={Styles.fieldIconButton} iconName="description" iconColor={getActionColor()} onPress={openDocumentLibrary} disabled={props.disabled}/>);
        }
        if (!isDocument(props.mimeType)) {
            actionsButtons.push(<IconButton containerStyle={Styles.fieldIconButton} iconName="photo-camera" iconColor={getActionColor()} onPress={openCamera} disabled={props.disabled}/>);
        }
        if (!isDocument(props.mimeType)) {
            actionsButtons.push(<IconButton containerStyle={Styles.fieldIconButton} iconName="image" iconColor={getActionColor()} onPress={openImageLibrary} disabled={props.disabled}/>);
        }
        return actionsButtons;
    };
    useEffect(() => {
        if (isDocument(props.mimeType)) {
            handleDefaultSvgXml(value);
        }
        else {
            handleDefaultImageSource(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    useEffect(() => {
        if (isValidValue(props.value) && !fileData.content) {
            setValue(props.value);
            onDataChange('', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValueUri(props.value)]);
    useEffect(() => {
        if (isValidValue(value)) {
            setImageSource(value);
        }
        else {
            setImageSource(defaultImageSource);
        }
    }, [value, defaultImageSource]);
    useEffect(() => {
        if (isValidValueUri(value)) {
            setSvgXml(getSvgXmlByFilename(getValueUri(value)));
        }
        else {
            setSvgXml(defaultSvgXml);
        }
    }, [value, defaultSvgXml]);
    return (<View style={props.containerStyle}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <View style={styles.imageContainer}>
                {!isDocument(props.mimeType) && !!imageSource && (<Image source={imageSource} style={styles.image}/>)}
                {isDocument(props.mimeType) && !!svgXml && (<SvgCss xml={svgXml} width="100" height="100"/>)}
            </View>
            <TextField style={props.style} value={fileData.filename} onValueChange={() => { }} required={isRequired()} error={error} disabled={props.disabled} readonly={true} actionButtons={getActionButtons()}/>
        </View>);
}
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        height: 100,
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});
//# sourceMappingURL=FileField.js.map
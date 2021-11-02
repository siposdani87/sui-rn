import React, { useState, useEffect, useReducer } from 'react';
import Label from './Label';
import SUI from 'sui-js';
import {
    View,
    StyleSheet,
    Image,
    Alert,
    ImageURISource,
    ImageRequireSource,
} from 'react-native';
import useErrorField from '../hooks/useErrorField';
import IconButton from './IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Styles } from '../constants';
import TextField from './TextField';
import useActionColor from '../hooks/useActionColor';
import { SvgCss } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';

const fileColors = {
    docx: 'blue',
    xlsx: 'green',
    pdf: 'red',
};

const mimeTypes = {
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
};

const fileTypeSVG =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<path style="fill:#E2E5E7;" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>' +
    '<path style="fill:#B0B7BD;" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>' +
    '<polygon style="fill:#CAD1D8;" points="480,224 384,128 480,128 "/>' +
    '<path style="fill:#CAD1D8;" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>' +
    '<path style="fill:#000000;" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16V416z"/>' +
    '<text x="220" y="380" text-anchor="middle" style="fill:#FFF;font-weight:700;font-family:Arial;font-size:120px;">TYPE</text>' +
    '</svg>';

export default function FileField(props: {
    value: ImageURISource | ImageRequireSource;
    defaultValue?: ImageURISource | ImageRequireSource;
    mimeType: string;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: any;
    style?: any;
}) {
    const [value, setValue] = useState(props.value);
    const [svgXml, setSvgXml] = useState(null);
    const [defaultSvgXml, setDefaultSvgXml] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [defaultImageSource, setDefaultImageSource] = useState(null);
    const [state, setState] = useReducer(
        (oldState, newState) => ({ ...oldState, ...newState }),
        { fileName: '', fileData: '' },
    );
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);
    const searchStr = ';base64,';

    const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: isImage()
            ? ImagePicker.MediaTypeOptions.Images
            : isVideo()
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: props.aspect,
        quality: props.quality,
        base64: true,
        exif: true,
    };

    useEffect(() => {
        if (isDocument()) {
            handleDefaultSvgXml(value);
        } else {
            handleDefaultImageSource(value);
        }
    }, [value]);

    useEffect(() => {
        if (isValidValue(props.value) && !state.fileData) {
            setValue(props.value);
            onFileDataChange('', '');
        }
    }, [getValueUri(props.value)]);

    useEffect(() => {
        if (isValidValue(value)) {
            setImageSource(value);
        } else {
            setImageSource(defaultImageSource);
        }
    }, [value, defaultImageSource]);

    useEffect(() => {
        if (isValidValueUri(value)) {
            setSvgXml(getSvgXmlByFilename(getValueUri(value)));
        } else {
            setSvgXml(defaultSvgXml);
        }
    }, [value, defaultSvgXml]);

    function isValidValue(v): boolean {
        return isValidValueUri(v) || isRequireFile(v);
    }

    function isRequireFile(v): boolean {
        return v !== null && v >= 0; // SUI.isNumber(v);
    }

    function isValidValueUri(v): boolean {
        return !!getValueUri(v);
    }

    function getValueUri(v) {
        return (v as ImageURISource)?.uri;
    }

    function handleDefaultSvgXml(v?: any) {
        if (isValidValue(v)) {
            setDefaultSvgXml(getSvgXmlByFilename(getValueUri(v)));
        } else {
            const color = props.required
                ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10'
                : 'grey';
            setDefaultSvgXml(getFileIconSrc('N/A', color));
        }
    }

    function handleDefaultImageSource(v?: any) {
        if (v && props.required) {
            setDefaultImageSource(v);
        } else if (props.defaultValue) {
            setDefaultImageSource(props.defaultValue);
        }
    }

    function getSvgXmlByFilename(filename: string): string {
        const type = SUI.getExtensionName(filename);
        const color = fileColors[type];
        return getFileIconSrc(type, color);
    }

    function onFileDataChange(fileName, fileData) {
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

    function getFileIconSrc(type, color) {
        return fileTypeSVG.replace('#000000', color).replace('TYPE', type);
    }

    async function handleImageDataUri(result: ImagePicker.ImagePickerResult) {
        if (result.cancelled === false) {
            const filename = result.uri.split('/').pop();
            const uri = 'data:image/jpeg;base64,' + result.base64;
            const dataUri = getDataUri(uri, filename);
            setImageSource({ uri: dataUri });
            onFileDataChange(filename, dataUri);
        }
    }

    async function handleDocumentDataUri(
        result: DocumentPicker.DocumentResult,
    ) {
        if (result.type !== 'cancel') {
            const filename = result.name;
            const mimeType = mimeTypes[SUI.getExtensionName(filename)];
            const fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
                encoding: 'base64',
            });
            const uri = 'data:' + mimeType + ';base64,' + fileBase64;
            const dataUri = getDataUri(uri, filename);
            setSvgXml(getSvgXmlByFilename(filename));
            onFileDataChange(filename, dataUri);
        }
    }

    function getDataUri(uri: string, filename: string): string {
        return uri.replace(searchStr, ';filename=' + filename + searchStr);
    }

    async function openImageLibrary() {
        if (!props.disabled) {
            const mediaLibraryPermission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (mediaLibraryPermission.status === 'granted') {
                try {
                    const result = await ImagePicker.launchImageLibraryAsync(
                        options,
                    );
                    if (result.cancelled === false) {
                        await handleImageDataUri(result);
                    }
                } catch (e) {
                    showAlert(e);
                }
            }
        }
    }

    async function openCamera() {
        if (!props.disabled) {
            const mediaLibraryPermission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraPermission =
                await ImagePicker.requestCameraPermissionsAsync();
            if (
                mediaLibraryPermission.status === 'granted' &&
                cameraPermission.status === 'granted'
            ) {
                try {
                    const result = await ImagePicker.launchCameraAsync(options);
                    if (result.cancelled === false) {
                        await handleImageDataUri(result);
                    }
                } catch (e) {
                    showAlert(e);
                }
            }
        }
    }

    async function openDocumentLibrary() {
        if (!props.disabled) {
            try {
                const result = await DocumentPicker.getDocumentAsync({
                    type: props.mimeType || '*/*',
                });
                if (result.type !== 'cancel') {
                    await handleDocumentDataUri(result);
                }
            } catch (e) {
                showAlert(e);
            }
        }
    }

    function showAlert(e) {
        Alert.alert('ERROR', e.message, [{ text: 'OK', onPress: () => null }], {
            cancelable: true,
        });
    }

    function isRemovable(): boolean {
        return !props.required && (isValidValue(value) || !!state.fileData);
    }

    function remove() {
        if (isDocument()) {
            removeDocument();
        } else {
            removeImage();
        }
    }

    function removeImage() {
        if (isRemovable()) {
            setImageSource(defaultImageSource);
            setValue(null);
            onFileDataChange('', null);
        }
    }

    function removeDocument() {
        if (isRemovable()) {
            setSvgXml(defaultSvgXml);
            setValue(null);
            onFileDataChange('', null);
        }
    }

    function onFilenameChange(filename: string) {
        setState({ fileName: filename });
    }

    function getRequiredTextField(): boolean {
        return props.required && !isValidValue(value);
    }

    function getActionButtons(): any[] {
        const actionsButtons = [];
        if (isRemovable()) {
            actionsButtons.push(
                <IconButton
                    containerStyle={Styles.fieldIconButton}
                    iconName="delete"
                    iconColor={getActionColor()}
                    onPress={remove}
                    disabled={props.disabled}
                />,
            );
        }
        if (isDocument()) {
            actionsButtons.push(
                <IconButton
                    containerStyle={Styles.fieldIconButton}
                    iconName="description"
                    iconColor={getActionColor()}
                    onPress={openDocumentLibrary}
                    disabled={props.disabled}
                />,
            );
        }
        if (!isDocument()) {
            actionsButtons.push(
                <IconButton
                    containerStyle={Styles.fieldIconButton}
                    iconName="photo-camera"
                    iconColor={getActionColor()}
                    onPress={openCamera}
                    disabled={props.disabled}
                />,
            );
        }
        if (!isDocument()) {
            actionsButtons.push(
                <IconButton
                    containerStyle={Styles.fieldIconButton}
                    iconName="image"
                    iconColor={getActionColor()}
                    onPress={openImageLibrary}
                    disabled={props.disabled}
                />,
            );
        }
        return actionsButtons;
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <View style={styles.imageContainer}>
                {!isDocument() && !!imageSource && (
                    <Image source={imageSource} style={styles.image} />
                )}
                {isDocument() && !!svgXml && (
                    <SvgCss xml={svgXml} width="100" height="100" />
                )}
            </View>
            <TextField
                style={props.style}
                label=""
                value={state.fileName || ''}
                onValueChange={onFilenameChange}
                required={getRequiredTextField()}
                error={error}
                disabled={props.disabled}
                readonly={true}
                actionButtons={getActionButtons()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
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

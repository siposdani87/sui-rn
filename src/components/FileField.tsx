import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Label } from './Label';
import {
    View,
    StyleSheet,
    Image,
    Alert,
    ImageURISource,
    ImageRequireSource,
    StyleProp,
    ViewStyle,
} from 'react-native';
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

export type ImageSourceType =
    | ImageURISource
    | ImageRequireSource
    | null
    | { uri: string | null };

interface FileColor {
    [key: string]: string;
}

interface MimeType {
    [key: string]: string;
}

const fileColors: FileColor = {
    docx: 'blue',
    xlsx: 'green',
    pdf: 'red',
};

const mimeTypes: MimeType = {
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
};

const fileTypeSVG: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<path style="fill:#E2E5E7;" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>' +
    '<path style="fill:#B0B7BD;" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>' +
    '<polygon style="fill:#CAD1D8;" points="480,224 384,128 480,128 "/>' +
    '<path style="fill:#CAD1D8;" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>' +
    '<path style="fill:#000000;" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16V416z"/>' +
    '<text x="220" y="380" text-anchor="middle" style="fill:#FFF;font-weight:700;font-family:Arial;font-size:120px;">TYPE</text>' +
    '</svg>';

const searchStr: string = ';base64,';

const isRequireValue = (v: ImageSourceType): boolean => {
    return v !== null && v >= 0;
};

const getValueUri = (v: ImageSourceType): string => {
    return (v as ImageURISource)?.uri ?? '';
};

const isValidValueUri = (imageSourceType: ImageSourceType): boolean => {
    return !!getValueUri(imageSourceType);
};

const isValidValue = (v: ImageSourceType): boolean => {
    return isValidValueUri(v) || isRequireValue(v);
};

const getFileIconSrc = (type: string, color: string): string => {
    return fileTypeSVG.replace('#000000', color).replace('TYPE', type);
};

const getSvgXmlByFilename = (filename: string): string => {
    const type = getExtensionName(filename);
    const color = fileColors[type] ?? 'black';
    return getFileIconSrc(type, color);
};

const getDataUri = (uri: string, filename: string): string => {
    return uri.replace(searchStr, ';filename=' + filename + searchStr);
};

const showAlert = (e: any): void => {
    Alert.alert('ERROR', e.message, [{ text: 'OK', onPress: () => null }], {
        cancelable: true,
    });
};

export function FileField(props: {
    value: ImageSourceType;
    defaultValue?: ImageSourceType;
    mimeType: string;
    onValueChange: (_value: string | null) => void;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element {
    const [value, setValue] = useState<ImageSourceType>(props.value);
    const [svgXml, setSvgXml] = useState<string | null>(null);
    const [defaultSvgXml, setDefaultSvgXml] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<ImageSourceType>(null);
    const [defaultImageSource, setDefaultImageSource] =
        useState<ImageSourceType>(null);
    const [state, setState] = useReducer(
        (oldState: any, newState: any) => ({ ...oldState, ...newState }),
        { filename: '', content: '' },
    );
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);

    const handleDefaultSvgXml = useCallback(
        (v: ImageSourceType): void => {
            if (isValidValue(v)) {
                setDefaultSvgXml(getSvgXmlByFilename(getValueUri(v)));
            } else {
                const color = props.required
                    ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10'
                    : 'grey';
                setDefaultSvgXml(getFileIconSrc('N/A', color));
            }
        },
        [props.required],
    );

    const handleDefaultImageSource = useCallback(
        (v?: ImageSourceType): void => {
            if (v && props.required) {
                setDefaultImageSource(v);
            } else if (props.defaultValue) {
                setDefaultImageSource(props.defaultValue);
            }
        },
        [props.defaultValue, props.required],
    );

    const onDataChange = useCallback(
        (filename: string, content: string | null): void => {
            onErrorChange();
            setState({ filename, content });
            props.onValueChange(content);
        },
        [onErrorChange, props],
    );

    const isImage = useCallback((): boolean => {
        return props.mimeType.indexOf('image') === 0;
    }, [props.mimeType]);

    const isVideo = useCallback((): boolean => {
        return props.mimeType.indexOf('video') === 0;
    }, [props.mimeType]);

    const isDocument = useCallback((): boolean => {
        return !(isImage() || isVideo());
    }, [isImage, isVideo]);

    const handleImageDataUri = async (
        result: ImagePicker.ImagePickerResult,
    ): Promise<void> => {
        if (!result.canceled) {
            const asset = result.assets[0];
            const filename =
                asset.fileName ?? asset.uri.split('/').pop() ?? 'file';
            const uri = 'data:image/jpeg;base64,' + asset.base64;
            const dataUri = getDataUri(uri, filename);
            setImageSource({ uri: dataUri });
            onDataChange(filename, dataUri);
        }
    };

    const handleDocumentDataUri = async (
        result: DocumentPicker.DocumentResult,
    ): Promise<void> => {
        if (result.type === 'success') {
            const filename = result.name;
            const mimeType = mimeTypes[getExtensionName(filename)];
            const fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
                encoding: 'base64',
            });
            const uri = 'data:' + mimeType + ';base64,' + fileBase64;
            const dataUri = getDataUri(uri, filename);
            setSvgXml(getSvgXmlByFilename(filename));
            onDataChange(filename, dataUri);
        }
    };

    const openImageLibrary = async (): Promise<void> => {
        if (props.disabled) {
            return;
        }
        const mediaLibraryPermission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermission.status === 'granted') {
            try {
                const result = await ImagePicker.launchImageLibraryAsync(
                    options,
                );
                await handleImageDataUri(result);
            } catch (e) {
                showAlert(e);
            }
        }
    };

    const openCamera = async (): Promise<void> => {
        if (props.disabled) {
            return;
        }
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
                await handleImageDataUri(result);
            } catch (e) {
                showAlert(e);
            }
        }
    };

    const openDocumentLibrary = async (): Promise<void> => {
        if (props.disabled) {
            return;
        }
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: props.mimeType || '*/*',
            });
            await handleDocumentDataUri(result);
        } catch (e) {
            showAlert(e);
        }
    };

    const isRemovable = (): boolean => {
        return !props.required && (isValidValue(value) || !!state.content);
    };

    const remove = (): void => {
        if (isDocument()) {
            removeDocument();
        } else {
            removeImage();
        }
    };

    const removeImage = (): void => {
        if (isRemovable()) {
            setImageSource(defaultImageSource);
            setValue(null);
            onDataChange('', null);
        }
    };

    const removeDocument = (): void => {
        if (isRemovable()) {
            setSvgXml(defaultSvgXml);
            setValue(null);
            onDataChange('', null);
        }
    };

    const getRequiredTextField = (): boolean => {
        return !!props.required && !isValidValue(value);
    };

    const getActionButtons = (): JSX.Element[] => {
        const actionsButtons: JSX.Element[] = [];
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
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (isValidValue(props.value) && !state.content) {
            setValue(props.value);
            onDataChange('', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Image source={imageSource as any} style={styles.image} />
                )}
                {isDocument() && !!svgXml && (
                    <SvgCss xml={svgXml} width="100" height="100" />
                )}
            </View>
            <TextField
                style={props.style}
                value={state.filename ?? ''}
                onValueChange={() => {}}
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

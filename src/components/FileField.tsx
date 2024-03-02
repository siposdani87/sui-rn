import React, { useState, useEffect, useCallback, ReactNode } from 'react';
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
    ImageSourcePropType,
} from 'react-native';
import { useErrorField, useActionColor } from '../hooks';
import { IconButton } from './IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Styles } from '../constants';
import { TextField } from './TextField';
import { SvgXml } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import { ErrorValueType } from './ErrorField';

export type FileSourceType =
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
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
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

const getExtensionName = (url: string): string => {
    const realUrl = url.split('?', 2)[0];
    return realUrl.slice(
        (Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1,
    );
};

const isImage = (mimeType: string): boolean => {
    return mimeType.startsWith('image');
};

const isVideo = (mimeType: string): boolean => {
    return mimeType.startsWith('video');
};

const isDocument = (mimeType: string): boolean => {
    return !isImage(mimeType) && !isVideo(mimeType);
};

const isRequireSourceType = (v: FileSourceType): boolean => {
    return v !== null && typeof v === 'number' && v >= 0;
};

const getValueUri = (v: FileSourceType): string => {
    return (v as ImageURISource)?.uri ?? '';
};

const isValidValueUri = (imageSourceType: FileSourceType): boolean => {
    return !!getValueUri(imageSourceType);
};

const isValidValue = (v: FileSourceType): boolean => {
    return isValidValueUri(v) || isRequireSourceType(v);
};

const getFileIconSrc = (type: string, color: string): string => {
    return fileTypeSVG.replace('#000000', color).replace('TYPE', type);
};

const getSvgXmlByFilename = (filename: string): string => {
    const type = getExtensionName(filename);
    const color = fileColors[type] ?? 'black';
    return getFileIconSrc(type, color);
};

const getDataUri = (base64Data: string, filename: string): string => {
    const mimeType = mimeTypes[getExtensionName(filename)];
    const uri = 'data:' + mimeType + ';base64,' + base64Data;
    return uri.replace(searchStr, ';filename=' + filename + searchStr);
};

const showAlert = (e: Error): void => {
    Alert.alert('ERROR', e.message, [{ text: 'OK', onPress: () => null }], {
        cancelable: true,
    });
};

interface FileContent {
    filename: string;
    content: string | null;
}

export function FileField(props: {
    value: FileSourceType;
    defaultValue?: FileSourceType;
    mimeType: string;
    onValueChange: (value: string | null) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}) {
    const [value, setValue] = useState<FileSourceType>(props.value);
    const [svgXml, setSvgXml] = useState<string | null>(null);
    const [defaultSvgXml, setDefaultSvgXml] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<FileSourceType>(null);
    const [defaultImageSource, setDefaultImageSource] =
        useState<FileSourceType>(null);
    const [fileData, setFileData] = useState<FileContent>({
        filename: '',
        content: null,
    });
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);

    let mediaTypes: ImagePicker.MediaTypeOptions =
        ImagePicker.MediaTypeOptions.All;
    if (isImage(props.mimeType)) {
        mediaTypes = ImagePicker.MediaTypeOptions.Images;
    } else if (isVideo(props.mimeType)) {
        mediaTypes = ImagePicker.MediaTypeOptions.Videos;
    }

    const options: ImagePicker.ImagePickerOptions = {
        mediaTypes,
        allowsEditing: true,
        aspect: props.aspect,
        quality: props.quality,
        base64: true,
        exif: true,
    };

    const handleDefaultSvgXml = useCallback(
        (v: FileSourceType): void => {
            if (isValidValueUri(v)) {
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
        (v: FileSourceType): void => {
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
            setFileData({ filename, content });
            props.onValueChange(content);
        },
        [onErrorChange, props],
    );

    const handleImageDataUri = async (
        result: ImagePicker.ImagePickerResult,
    ): Promise<void> => {
        if (!result.canceled) {
            const asset = result.assets[0];
            const filename =
                asset.fileName ?? asset.uri.split('/').pop() ?? 'unknown.jpeg';
            const dataUri = getDataUri(asset.base64!, filename);
            setImageSource({ uri: dataUri });
            onDataChange(filename, dataUri);
        }
    };

    const handleDocumentDataUri = async (
        result: DocumentPicker.DocumentPickerResult,
    ): Promise<void> => {
        if (!result.canceled) {
            const asset = result.assets[0];
            const filename = asset.name;
            const fileBase64 = await FileSystem.readAsStringAsync(asset.uri, {
                encoding: 'base64',
            });
            const dataUri = getDataUri(fileBase64, filename);
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
            } catch (e: any) {
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
            } catch (e: any) {
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
                type: props.mimeType,
            });
            await handleDocumentDataUri(result);
        } catch (e: any) {
            showAlert(e);
        }
    };

    const isRemovable = (): boolean => {
        return !props.required && (isValidValue(value) || !!fileData.content);
    };

    const remove = (): void => {
        if (isRemovable()) {
            setSvgXml(defaultSvgXml);
            setImageSource(defaultImageSource);
            setValue(null);
            onDataChange('', null);
        }
    };

    const isRequired = (): boolean => {
        return !!props.required && !isValidValue(value);
    };

    const getActionButtons = (): ReactNode[] => {
        const actionsButtons: ReactNode[] = [];
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
        if (isDocument(props.mimeType)) {
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
        if (!isDocument(props.mimeType)) {
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
        if (!isDocument(props.mimeType)) {
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

    useEffect(() => {
        if (isDocument(props.mimeType)) {
            handleDefaultSvgXml(value);
        } else {
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
        <View style={props.containerStyle}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <View style={styles.imageContainer}>
                {!isDocument(props.mimeType) && !!imageSource && (
                    <Image
                        source={imageSource as ImageSourcePropType}
                        style={styles.image}
                    />
                )}
                {isDocument(props.mimeType) && !!svgXml && (
                    <SvgXml xml={svgXml} width="100" height="100" />
                )}
            </View>
            <TextField
                style={props.style}
                value={fileData.filename}
                onValueChange={() => {}}
                required={isRequired()}
                error={error}
                disabled={props.disabled}
                readonly={true}
                actionButtons={getActionButtons()}
            />
        </View>
    );
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

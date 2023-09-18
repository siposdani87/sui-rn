import React, { useState, useEffect } from 'react';
import { ErrorField, ErrorValueType } from './ErrorField';
import { Label } from './Label';
import {
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import {
    ActionKey,
    ActionMap,
    RichTextEditor,
} from '@siposdani87/expo-rich-text-editor';
import { Colors, Styles } from '../constants';
import { useErrorField, useInputStyle, useActionColor } from '../hooks';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const getActionMap = (getColor: (selected: boolean) => string): ActionMap => {
    const size = 24;

    return {
        [ActionKey.undo]: ({ selected }) => (
            <MaterialIcons name="undo" size={size} color={getColor(selected)} />
        ),
        [ActionKey.redo]: ({ selected }) => (
            <MaterialIcons name="redo" size={size} color={getColor(selected)} />
        ),
        [ActionKey.bold]: ({ selected }) => (
            <MaterialIcons
                name="format-bold"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.italic]: ({ selected }) => (
            <MaterialIcons
                name="format-italic"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.underline]: ({ selected }) => (
            <MaterialIcons
                name="format-underlined"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.unorderedList]: ({ selected }) => (
            <MaterialIcons
                name="format-list-bulleted"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.orderedList]: ({ selected }) => (
            <MaterialIcons
                name="format-list-numbered"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.clear]: ({ selected }) => (
            <MaterialIcons
                name="format-clear"
                size={size}
                color={getColor(selected)}
            />
        ),
        [ActionKey.code]: ({ selected }) => (
            <MaterialIcons name="code" size={size} color={getColor(selected)} />
        ),
    };
};

export type RichTextAreaFieldValueType = string | null | undefined;

export function RichTextAreaField(props: {
    value: RichTextAreaFieldValueType;
    onValueChange: (_value: RichTextAreaFieldValueType) => void;
    numberOfLines?: number;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}) {
    const textStyle = StyleSheet.flatten(props.style);
    const [value, setValue] = useState<RichTextAreaFieldValueType>(props.value);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
        isFocused,
    );
    const containerStyle = [styles.container, inputStyle];
    const getActionColor = useActionColor(props.disabled);
    const numberOfLines = props.numberOfLines || 5;
    const height = 20 * numberOfLines + 16;

    const onValueChange = (v: RichTextAreaFieldValueType): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <View style={props.containerStyle}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <RichTextEditor
                minHeight={height}
                value={value ?? ''}
                onValueChange={onValueChange}
                selectionColor={Colors.deepGreyBright}
                actionMap={getActionMap(getActionColor)}
                toolbarStyle={styles.toolbar}
                textStyle={textStyle}
                containerStyle={containerStyle}
                disabled={props.disabled}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
            />
            <ErrorField error={error} disabled={props.disabled} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
    },
    toolbar: {},
});

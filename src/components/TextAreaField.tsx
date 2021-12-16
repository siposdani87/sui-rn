import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import { ActionMap, RichTextEditor } from '@siposdani87/expo-rich-text-editor';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import { MaterialIcons } from '@expo/vector-icons';
import useInputStyle from '../hooks/useInputStyle';
import useActionColor from '../hooks/useActionColor';

export default function TextAreaField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    numberOfLines?: number;
    richText?: boolean;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
}): JSX.Element {
    const style = StyleSheet.flatten(props.style);
    const [value, setValue] = useState<string>(props.value);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
        isFocused,
    );
    const getActionColor = useActionColor(props.disabled);
    const numberOfLines = props.numberOfLines || 5;
    const height = 20 * numberOfLines + 16;

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (v: string): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const getActionMap = (): ActionMap => {
        const size = 24;

        return {
            undo: ({ selected }) => (
                <MaterialIcons
                    name="undo"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            redo: ({ selected }) => (
                <MaterialIcons
                    name="redo"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            bold: ({ selected }) => (
                <MaterialIcons
                    name="format-bold"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            italic: ({ selected }) => (
                <MaterialIcons
                    name="format-italic"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            underline: ({ selected }) => (
                <MaterialIcons
                    name="format-underlined"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            unorderedList: ({ selected }) => (
                <MaterialIcons
                    name="format-list-bulleted"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            orderedList: ({ selected }) => (
                <MaterialIcons
                    name="format-list-numbered"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            clear: ({ selected }) => (
                <MaterialIcons
                    name="format-clear"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
            code: ({ selected }) => (
                <MaterialIcons
                    name="code"
                    size={size}
                    color={getActionColor(selected)}
                />
            ),
        };
    };

    if (props.richText) {
        const editorStyle = [styles.editor, style, inputStyle];

        return (
            <View style={[styles.container, props.containerStyle]}>
                <Label
                    text={props.label}
                    required={props.required}
                    disabled={props.disabled}
                    desc={props.desc}
                    onPressDesc={props.onPressDesc}
                />
                <RichTextEditor
                    minHeight={height}
                    value={value}
                    onValueChange={onValueChange}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    selectionColor={Colors.deepGreyBright}
                    actionMap={getActionMap()}
                    toolbarStyle={styles.toolbar}
                    editorStyle={editorStyle}
                    disabled={props.disabled}
                />
                <ErrorField error={error} disabled={props.disabled} />
            </View>
        );
    }

    const textareaStyle = {
        height,
        textAlignVertical: 'top',
        paddingTop: 5,
        ...style,
    };

    return (
        <TextField
            value={props.value}
            error={props.error}
            onValueChange={props.onValueChange}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            containerStyle={props.containerStyle}
            style={textareaStyle}
            multiline={true}
            numberOfLines={numberOfLines}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
    editor: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        borderRadius: 3,
        borderWidth: 1,
        padding: 10,
    },
    toolbar: {},
});

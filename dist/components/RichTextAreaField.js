import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet, } from 'react-native';
import { RichTextEditor } from '@siposdani87/expo-rich-text-editor';
import { Colors, Styles } from '../constants';
import { useErrorField } from '../hooks/useErrorField';
import { MaterialIcons } from '@expo/vector-icons';
import { useInputStyle } from '../hooks/useInputStyle';
import { useActionColor } from '../hooks/useActionColor';
const getActionMap = (getColor) => {
    const size = 24;
    return {
        undo: ({ selected }) => (<MaterialIcons name="undo" size={size} color={getColor(selected)}/>),
        redo: ({ selected }) => (<MaterialIcons name="redo" size={size} color={getColor(selected)}/>),
        bold: ({ selected }) => (<MaterialIcons name="format-bold" size={size} color={getColor(selected)}/>),
        italic: ({ selected }) => (<MaterialIcons name="format-italic" size={size} color={getColor(selected)}/>),
        underline: ({ selected }) => (<MaterialIcons name="format-underlined" size={size} color={getColor(selected)}/>),
        unorderedList: ({ selected }) => (<MaterialIcons name="format-list-bulleted" size={size} color={getColor(selected)}/>),
        orderedList: ({ selected }) => (<MaterialIcons name="format-list-numbered" size={size} color={getColor(selected)}/>),
        clear: ({ selected }) => (<MaterialIcons name="format-clear" size={size} color={getColor(selected)}/>),
        code: ({ selected }) => (<MaterialIcons name="code" size={size} color={getColor(selected)}/>),
    };
};
export function RichTextAreaField(props) {
    const style = StyleSheet.flatten(props.style);
    const [value, setValue] = useState(props.value);
    const [isFocused, setIsFocused] = useState(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(value, error, props.required, props.disabled, isFocused);
    const editorStyle = [styles.editor, style, inputStyle];
    const getActionColor = useActionColor(props.disabled);
    const numberOfLines = props.numberOfLines || 5;
    const height = 20 * numberOfLines + 16;
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<View style={[styles.container, props.containerStyle]}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <RichTextEditor minHeight={height} value={value} onValueChange={onValueChange} selectionColor={Colors.deepGreyBright} actionMap={getActionMap(getActionColor)} toolbarStyle={styles.toolbar} editorStyle={editorStyle} disabled={props.disabled} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)}/>
            <ErrorField error={error} disabled={props.disabled}/>
        </View>);
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
//# sourceMappingURL=RichTextAreaField.js.map
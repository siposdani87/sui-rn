import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { TextInputProps, View, StyleSheet } from 'react-native';
import RichTextEditor from 'expo-rich-text-editor/src/RichTextEditor';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import { MaterialIcons } from '@expo/vector-icons';
import useInputStyle from '../hooks/useInputStyle';
import useDarkTheme from '../hooks/useDarkTheme';

export default function TextAreaField(props: { value: any, onValueChange: (value: any) => void, richText?: boolean, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any } & TextInputProps) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(value, error, props.required, props.disabled);
  const isDarkTheme = useDarkTheme();
  const numberOfLines = props.numberOfLines || 5;
  const defaultStyle = {
    height: 20 * numberOfLines + 16,
    maxHeight: 300,
    textAlignVertical: 'top',
    ...props.style,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function getActionMap() {
    const size = 24;

    function getColor(_selected) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }

    return {
      undo: ({ selected }) => (<MaterialIcons name='undo' size={size} color={getColor(selected)} />),
      redo: ({ selected }) => (<MaterialIcons name='redo' size={size} color={getColor(selected)} />),
      bold: ({ selected }) => (<MaterialIcons name='format-bold' size={size} color={getColor(selected)} />),
      italic: ({ selected }) => (<MaterialIcons name='format-italic' size={size} color={getColor(selected)} />),
      underline: ({ selected }) => (<MaterialIcons name='format-underlined' size={size} color={getColor(selected)} />),
      unorderedList: ({ selected }) => (<MaterialIcons name='format-list-bulleted' size={size} color={getColor(selected)} />),
      orderedList: ({ selected }) => (<MaterialIcons name='format-list-numbered' size={size} color={getColor(selected)} />),
      clear: ({ selected }) => (<MaterialIcons name='format-clear' size={size} color={getColor(selected)} />),
      code: ({ selected }) => (<MaterialIcons name='code' size={size} color={getColor(selected)} />),
    };
  }

  const backgroundColor = isDarkTheme ? Colors.black : Colors.white;
  const color = isDarkTheme ? Colors.white : Colors.black;
  const editorStyle = [styles.textInput, defaultStyle, getInputStyle(), { backgroundColor, color }];

  if (props.richText) {
    return (
      <View style={[styles.container, props.containerStyle]}>
        <Label text={props.label} required={props.required} disabled={props.disabled} />
        <RichTextEditor minHeight={defaultStyle.height} value={value} onValueChange={onValueChange} actionMap={getActionMap()} toolbarStyle={styles.toolbar} editorStyle={editorStyle} />
        <ErrorField error={error} disabled={props.disabled} />
      </View>
    );
  }

  return (
    <TextField {...props} numberOfLines={numberOfLines} style={[defaultStyle, { paddingTop: 5 }]} multiline={true} />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  editor: {},
  toolbar: {},
});

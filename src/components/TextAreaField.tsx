import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import { RichTextEditor } from 'expo-rich-text-editor/src';
import { Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import { MaterialIcons } from '@expo/vector-icons';
import useInputStyle from '../hooks/useInputStyle';
import useActionColor from '../hooks/useActionColor';

export default function TextAreaField(props: { value: any, onValueChange: (value: any) => void, numberOfLines?: number, richText?: boolean, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any }) {
  const style = StyleSheet.flatten(props.style);
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(value, error, props.required, props.disabled);
  const getActionColor = useActionColor(props.disabled);
  const numberOfLines = props.numberOfLines || 5;
  const defaultStyle = {
    height: 20 * numberOfLines + 16,
    maxHeight: 300,
    textAlignVertical: 'top',
    ...style,
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

    return {
      undo: ({ selected }) => (<MaterialIcons name='undo' size={size} color={getActionColor(selected)} />),
      redo: ({ selected }) => (<MaterialIcons name='redo' size={size} color={getActionColor(selected)} />),
      bold: ({ selected }) => (<MaterialIcons name='format-bold' size={size} color={getActionColor(selected)} />),
      italic: ({ selected }) => (<MaterialIcons name='format-italic' size={size} color={getActionColor(selected)} />),
      underline: ({ selected }) => (<MaterialIcons name='format-underlined' size={size} color={getActionColor(selected)} />),
      unorderedList: ({ selected }) => (<MaterialIcons name='format-list-bulleted' size={size} color={getActionColor(selected)} />),
      orderedList: ({ selected }) => (<MaterialIcons name='format-list-numbered' size={size} color={getActionColor(selected)} />),
      clear: ({ selected }) => (<MaterialIcons name='format-clear' size={size} color={getActionColor(selected)} />),
      code: ({ selected }) => (<MaterialIcons name='code' size={size} color={getActionColor(selected)} />),
    };
  }

  const editorStyle = [styles.editor, defaultStyle, getInputStyle()];

  if (props.richText) {
    return (
      <View style={[styles.container, props.containerStyle]}>
        <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
        <RichTextEditor minHeight={defaultStyle.height} value={value} onValueChange={onValueChange} actionMap={getActionMap()} toolbarStyle={styles.toolbar} editorStyle={editorStyle} disabled={props.disabled} />
        <ErrorField error={error} disabled={props.disabled} />
      </View>
    );
  }

  return (
    <TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={[defaultStyle, { paddingTop: 5 }]} multiline={true} numberOfLines={numberOfLines} />
  );
}

const styles = StyleSheet.create({
  container: {},
  editor: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },
  toolbar: {},
});

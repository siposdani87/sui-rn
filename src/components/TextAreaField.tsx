import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { TextInputProps, View, StyleSheet } from 'react-native';
import { RichToolbar, RichEditor } from 'react-native-pell-rich-editor';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextAreaField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, richText?: boolean, style?: any, containerStyle?: any } & TextInputProps) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const [richtext, setRichtext] = useState(null);
  const numberOfLines = props.numberOfLines || 4;
  const style = {
    height: 20 * numberOfLines + (props.richText ? 65 : 16),
    textAlignVertical: 'top',
    ...props.style,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  async function onValueChange() {
    // console.log('_v', _v)
    const v = await richtext.getContentHtml();
    // console.log('v', v)
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function onHeightChange() {
    // console.log('height', h)
  }

  function getEditor() {
    return richtext;
  }

  function _getTextInputStyle() {
    if (hasError) {
      if (props.disabled) {
        return isDarkTheme ? styles.hasErrorDisabledDark : styles.hasErrorDisabledLight;
      }
      return isDarkTheme ? styles.hasErrorDefaultDark : styles.hasErrorDefaultLight;
    }
    if (props.disabled) {
      return isDarkTheme ? styles.disabledDarkTextInput : styles.disabledLightTextInput;
    }
    return isDarkTheme ? styles.defaultDarkTextInput : styles.defaultLightTextInput;
  }

  const backgroundColor = isDarkTheme ? Colors.black : Colors.white;
  const color = isDarkTheme ? Colors.white : Colors.black;

  if (props.richText) {
    return (
      <View style={[styles.container, props.containerStyle]}>
        <Label label={props.label} required={props.required} disabled={props.disabled} />
        <View style={[styles.textInput, style, _getTextInputStyle()]}>
          {!!richtext && (
          <RichToolbar getEditor={getEditor} actions={['bold', 'italic', 'unorderedList', 'orderedList']} disabled={props.disabled} />
          )}
          <RichEditor ref={(r) => setRichtext(r)} initialContentHTML={props.value} onHeightChange={onHeightChange} onChange={onValueChange} editorStyle={{backgroundColor, color}} />
        </View>
        <ErrorField error={error} disabled={props.disabled} />
      </View>
    );
  }

  return (
    <TextField numberOfLines={numberOfLines} {...props} style={style} multiline={true} />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    // fontFamily: Styles.fontFamilyBody,
    // fontSize: 16,
    // height: 36,
    borderRadius: 3,
    borderWidth: 1,
    // paddingHorizontal: 10,
  },
  defaultLightTextInput: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.inputDefaultLight,
  },
  defaultDarkTextInput: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.inputDefaultDark,
  },
  disabledLightTextInput: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.inputDisabledLight,
    borderStyle: 'dotted',
  },
  disabledDarkTextInput: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.inputDisabledDark,
    borderStyle: 'dotted',
  },
  hasErrorDefaultLight: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.errorDefaultLight,
  },
  hasErrorDefaultDark: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.errorDefaultDark,
  },
  hasErrorDisabledLight: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.errorDisabledLight,
  },
  hasErrorDisabledDark: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.errorDisabledDark,
  },
});

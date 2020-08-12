import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { TextInputProps, View, StyleSheet } from 'react-native';
import { RichToolbar, RichEditor } from 'react-native-pell-rich-editor';
import { Colors, Styles } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { MaterialIcons } from '@expo/vector-icons';

export default function TextAreaField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, richText?: boolean, style?: any, containerStyle?: any } & TextInputProps) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const [editor, setEditor] = useState(null);
  const numberOfLines = props.numberOfLines || 5;
  const style = {
    [props.richText ? 'minHeight' : 'height']: 20 * numberOfLines + (props.richText ? 65 : 16),
    maxHeight: 300,
    textAlignVertical: 'top',
    ...props.style,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  async function onValueChange() {
    const v = await editor.getContentHtml();
    console.log('onValueChange', v);
    onErrorChange();
    props.onValueChange(v);
    // setValue(v);
  }
  console.log('value', value);

  function onHeightChange() {
    // console.log('onHeightChange', h);
  }

  function editorInitializedCallback() {
    // console.log('editorInitializedCallback');
  }

  function getEditor() {
    return editor;
  }

  function iconMap() {
    function getColor(_selected) {
      if (true) {
        return isDarkTheme ? Colors.primaryBright : Colors.primary;
      }
      // return isDarkTheme ? Colors.white : Colors.black;
    }

    return {
      bold: ({selected}) => (<MaterialIcons name='format-bold' size={22} color={getColor(selected)} />),
      italic: ({selected}) => (<MaterialIcons name='format-italic' size={22} color={getColor(selected)} />),
      underline: ({selected}) => (<MaterialIcons name='format-underlined' size={22} color={getColor(selected)} />),
      unorderedList: ({selected}) => (<MaterialIcons name='format-list-bulleted' size={22} color={getColor(selected)} />),
      orderedList: ({selected}) => (<MaterialIcons name='format-list-numbered' size={22} color={getColor(selected)} />),
    };
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
        {!!editor && (
          <RichToolbar getEditor={getEditor} style={styles.toolbar} actions={['bold', 'italic', 'underline', 'unorderedList', 'orderedList']} iconMap={iconMap()} disabled={props.disabled} />
        )}
        <View style={[styles.textInput, style, _getTextInputStyle()]}>
          <RichEditor ref={(r) => setEditor(r)} initialContentHTML={value} editorInitializedCallback={editorInitializedCallback} onHeightChange={onHeightChange} onChange={onValueChange} editorStyle={{backgroundColor, color}} />
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
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 0,
    marginVertical: 0,
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
  toolbar: {
    height: 40,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

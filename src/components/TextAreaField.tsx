import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import ErrorField from './ErrorField';
import Label from './Label';
import { TextInputProps, View, StyleSheet, Text } from 'react-native';
import { RichToolbar, RichEditor } from 'react-native-pell-rich-editor';
import CNRichTextEditor, { CNToolbar, convertToHtmlString, convertToObject, getDefaultStyles, getInitialObject } from 'react-native-cn-richtext-editor';
import { Colors, Styles } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextAreaField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, richText?: boolean, style?: any, containerStyle?: any } & TextInputProps) {
  const [value, setValue] = useState(props.value);
  const [initValue, setInitValue] = useState(convert(value));
  const [selectedTag, setSelectedTag] = useState('body');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const [editor, setEditor] = useState(null);
  const numberOfLines = props.numberOfLines || 5;
  const style = {
    height: 20 * numberOfLines + (props.richText ? 65 : 16),
    textAlignVertical: 'top',
    ...props.style,
  };
  const defaultStyles = getDefaultStyles();
  
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setInitValue(convert(value));
  }, [value]);

  function convert(v){
    console.log('convert', v);
    if (v){
      //return convertToObject((v || '').replace('br', 'br /'));
    }
    return getInitialObject();
  }

  async function onValueChange(o) {
    console.log('_o', o);
    // const v = await editor.getContentHtml();
    // console.log('v', v);
    //const v = convertToHtmlString(o);
    onErrorChange();
    // props.onValueChange(v);
    // setInitValue(o);
    // setValue(v);
  }

  function onStyleKeyPress(toolType) {
    editor.applyToolbar(toolType);
  }

  function onSelectedTagChanged(tag) {
    setSelectedTag(tag);
  }

  function onSelectedStyleChanged(s) {
    setSelectedStyles(s);
  }

  function onHeightChange() {
    // console.log('height', h)
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
          {!!editor && (
            <CNToolbar
              style={{
                height: 35,
              }}
              iconSetContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
              size={30}
              iconSet={[
                {
                  type: 'tool',
                  iconArray: [{
                    toolTypeText: 'italic',
                    buttonTypes: 'style',
                    iconComponent: <Text style={styles.toolbarButton}>italic</Text>,
                  }],
                },
                {
                  type: 'tool',
                  iconArray: [{
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: <Text style={styles.toolbarButton}>bold</Text>,
                  }],
                },
                {
                  type: 'seperator',
                },
                {
                  type: 'tool',
                  iconArray: [
                    {
                      toolTypeText: 'body',
                      buttonTypes: 'tag',
                      iconComponent: <Text style={styles.toolbarButton}>body</Text>,
                    },
                  ],
                },
                {
                  type: 'tool',
                  iconArray: [
                    {
                      toolTypeText: 'ul',
                      buttonTypes: 'tag',
                      iconComponent: <Text style={styles.toolbarButton}>ul</Text>,
                    },
                  ],
                },
                {
                  type: 'tool',
                  iconArray: [
                    {
                      toolTypeText: 'ol',
                      buttonTypes: 'tag',
                      iconComponent: <Text style={styles.toolbarButton}>ol</Text>,
                    },
                  ],
                },
              ]}
              selectedTag={selectedTag}
              selectedStyles={selectedStyles}
              onStyleKeyPress={onStyleKeyPress}
            />
          )}
          <CNRichTextEditor ref={(r) => setEditor(r)} placeholder='' textInputStyle={[styles.textInput, style, _getTextInputStyle(), {borderWidth: 0}]} onSelectedTagChanged={onSelectedTagChanged} onSelectedStyleChanged={onSelectedStyleChanged} value={initValue} style={{ backgroundColor }} styleList={defaultStyles} onValueChanged={onValueChange} />
        </View>
        {/* <View style={[styles.textInput, style, _getTextInputStyle()]}>
          {!!editor && (
          <RichToolbar getEditor={() => editor} actions={['bold', 'italic', 'unorderedList', 'orderedList']} disabled={props.disabled} />
          )}
          <RichEditor ref={(r) => setEditor(r)} initialContentHTML={props.value} editorInitializedCallback={() => null} onHeightChange={onHeightChange} onChange={onValueChange} editorStyle={{backgroundColor, color}} />
        </View> */}
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
  main: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
  lineThroughButton: {
    textDecorationLine: 'line-through',
  },
});

import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useInputStyle from '../hooks/useInputStyle';
import useDarkTheme from '../hooks/useDarkTheme';
import IconButton from './IconButton';

export default function TagField(props: { values: any[], onValuesChange: (_value: any[]) => void, readonly?: boolean, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, children?: any }) {
  const [values, setValues] = useState(props.values);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(values.length, error, props.required, props.disabled);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValues(props.values);
  }, [props.values]);

  function onValuesChange(v) {
    onErrorChange();
    setValues(v);
    props.onValuesChange(v);
  }

  function removeTag(v) {
    return () => {
      const filteredValues = values.filter((_v) => {
        return _v !== v;
      })
      onValuesChange(filteredValues);
    }
  }

  function getTextColor() {
    if (props.disabled){
      return isDarkTheme ? Colors.contentDisabledDark : Colors.contentDisabledLight;
    }
    return isDarkTheme ? Colors.contentDefaultDark : Colors.contentDefaultLight;
  }

  function getBackgroundColor() {
    if (props.disabled){
      return isDarkTheme ? Colors.inputDisabledDark : Colors.inputDisabledLight;
    }
    return isDarkTheme ? Colors.inputDefaultDark : Colors.inputDefaultLight;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      <View style={[styles.textInput, props.style, getInputStyle()]}>
        {values.map((value, index) => (
          <View key={index} style={[styles.tagContainer, { backgroundColor: getBackgroundColor(), paddingRight: (props.readonly || props.disabled) ? null : 25 }]}>
            <Text style={[styles.tagText, { color: getTextColor() }]}>{value}</Text>
            {!props.readonly && !props.disabled && (
              <IconButton containerStyle={styles.actionButtonContainer} style={styles.actionButton} iconName='close' iconColor={getTextColor()} iconSize={20} onPress={removeTag(value)} />
            )}
          </View>
        ))}
      </View>
      {props.children && (
        <View style={[styles.actionsContainer, Platform.select({
          android: {
            top: props.label ? 26 : -2,
          },
          ios: {
            top: props.label ? 22 : -2,
          },
        })]}>
          {props.children}
        </View>
      )}
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  actionsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    zIndex: 1,
  },
  textInput: {
    minHeight: 36,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 3,
    paddingTop: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    marginRight: 3,
    marginBottom: 3,
  },
  tagText: {
    fontFamily: Styles.fontFamilyBodyRegular,
    fontWeight: '400',
    fontSize: 16,
  },
  actionButtonContainer: {
    margin: 0,
    position: 'absolute',
    right: 0,
    top: 3,
    zIndex: 1,
  },
  actionButton: {
    padding: 0,
  },
});

import React, { useState, useEffect, Fragment } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useInputStyle from '../hooks/useInputStyle';
import useDarkTheme from '../hooks/useDarkTheme';
import IconButton from './IconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TagField(props: { values: any[], onValuesChange: (_value: any[]) => void, onPress?: (_index: number) => void, readonly?: boolean, label?: string, error?: any, placeholder?: string, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, actionButtons?: any[] }) {
  const [values, setValues] = useState(props.values);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(getValuesLength(), error, props.required, props.disabled);
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

  function onPressTag(index){
    return () => {
      if (props.disabled) {
        return;
      } else if (props.onPress) {
        props.onPress(index);
      }
    };
  }

  function getValuesLength(): number {
    if (values?.[0] === props.placeholder) {
      return 0;
    }
    return values.length;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      <View style={[styles.textInput, props.style, getInputStyle()]}>
        {values.map((value, index) => (
          <View key={index} style={[styles.tagContainer, { backgroundColor: getBackgroundColor(), paddingRight: (props.readonly || props.disabled) ? null : 25 }]}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={onPressTag(index)}>
              <Text style={[styles.tagText, { color: getTextColor() }]}>{value}</Text>
            </TouchableOpacity>
            {!props.readonly && !props.disabled && (
              <IconButton containerStyle={styles.actionButtonContainer} style={styles.actionButton} iconName='close' iconColor={getTextColor()} iconSize={20} onPress={removeTag(value)} />
            )}
          </View>
        ))}
      </View>
      {props.actionButtons && (
        <View style={[Styles.actionsContainer as any, Platform.select({
          android: {
            top: props.label ? 26 : -2,
          },
          ios: {
            top: props.label ? 21 : -1,
          },
        })]}>
          {props.actionButtons.map((actionButton, key) => (
            <Fragment key={key}>{actionButton}</Fragment>
          ))}
        </View>
      )}
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    minHeight: 36,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 3,
    paddingTop: 3,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    borderRadius: 3,
    minHeight: 20,
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

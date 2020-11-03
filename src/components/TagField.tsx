import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useInputStyle from '../hooks/useInputStyle';
import useDarkTheme from '../hooks/useDarkTheme';
import IconButton from './IconButton';

export default function TagField(props: { values: any[], onValuesChange: (value: any[]) => void, readonly?: boolean, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
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

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} />
      <View style={[styles.textInput, props.style, getInputStyle()]}>
        {values.map((value, index) => (
          <View key={index} style={[styles.tagContainer, isDarkTheme ? styles.tagContainerDark : styles.tagContainerLight, { paddingRight: props.readonly ? null : 25 }]}>
            <Text style={[styles.tagText, isDarkTheme ? styles.tagTextDark : styles.tagTextLight]}>{value}</Text>
            {!props.readonly && !props.disabled && (
              <IconButton containerStyle={styles.actionButtonContainer} style={styles.actionButton} iconName='close' iconColor={isDarkTheme ? styles.tagTextDark.color : styles.tagTextLight.color} iconSize={20} onPress={removeTag(value)} />
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
  container: {
    marginBottom: 10,
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
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
  tagContainerDark: {
    backgroundColor: Colors.inputDefaultDark,
  },
  tagContainerLight: {
    backgroundColor: Colors.inputDefaultLight,
  },
  tagText: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
  },
  tagTextDark: {
    color: Colors.contentDefaultDark,
  },
  tagTextLight: {
    color: Colors.contentDefaultLight,
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
  }
});

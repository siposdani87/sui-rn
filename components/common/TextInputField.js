import React from 'react';
import BaseField from '../common/BaseField';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class TextInputField extends BaseField {
  render() {
    return (
      <View style={styles.baseContainer}>
        <Label label={this.props.label} required={this.props.required} />
        <TextInput {...this.props} style={[this.props.style, styles.textInput, this.state.error || (this.props.required && (!this.props.value || this.props.value && this.props.value.length === 0)) ? styles.hasError : styles.noError]} onChange={this.onChange} underlineColorAndroid="transparent" selectionColor={Colors.grey} />
        <ErrorField error={this.state.error} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.greyBright,
    paddingHorizontal: 10,
  },
  hasError: {
    borderColor: Colors.red,
  },
  noError: {
    borderColor: Colors.greyBright,
  },
});

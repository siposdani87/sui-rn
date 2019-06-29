import React from 'react';
import BaseField from '../common/BaseField';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, Switch, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default class SwitchField extends BaseField {

  render() {
    return (
      <View style={styles.baseContainer}>
        <Switch {...this.props} onValueChange={this.onValueChange} style={[this.props.style, styles.switch]} disabled={this.props.disabled} onTintColor={Colors.primaryBright} thumbTintColor={this.props.disabled ? Colors.lightGreyDark : (!this.props.value ? Colors.whiteDark : Colors.primary)} tintColor={Colors.lightGreyDark} />
        <Label style={styles.label} label={this.props.label} required={this.props.required}>{this.props.text}</Label>
        <ErrorField error={this.state.error} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 55,
  },
  switch: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});

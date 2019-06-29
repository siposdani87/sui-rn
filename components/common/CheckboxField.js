import React from 'react';
import BaseField from '../common/BaseField';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';


export default class CheckboxField extends BaseField {
  constructor(props) {
    super(props);
    this.state = {
      clearError: false,
      error: null,
      value: false,
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const error = state.clearError !== nextProps.error ? nextProps.error : null;
    return {
      error,
      value: nextProps.value,
    };
  }

  changeValue = () => {
    const value = !this.state.value;
    this.onValueChange(value);
    this.setState({
      value,
    });
  }

  getColor = () => {
    if (this.props.disabled) {
      return Colors.lightGreyDark;
    } else if (this.props.required && !this.state.value){
      return Colors.red;
    } else if (this.state.value) {
      return Colors.primary;
    }
    return Colors.grey;
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.changeValue} style={[this.props.style, styles.checkbox]}>
          <MaterialIcons name={this.state.value ? 'check-box' : 'check-box-outline-blank'} size={26} color={this.getColor()} />
        </TouchableOpacity>
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
    marginLeft: 30,
  },
  checkbox: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});

import React from 'react';
import TextInputField from './TextInputField';

export default class EmailInputField extends React.PureComponent {
  render() {
    return (
      <TextInputField {...this.props} keyboardType="email-address" />     
    );
  }
}

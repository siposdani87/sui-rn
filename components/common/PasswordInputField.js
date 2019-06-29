import React from 'react';
import TextInputField from './TextInputField';

export default class PasswordInputField extends React.PureComponent {
  render() {
    return (
      <TextInputField {...this.props} secureTextEntry />     
    );
  }
}

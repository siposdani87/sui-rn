import React from 'react';
import TextInputField from './TextInputField';

export default function PasswordInputField(props) {
  return (
    <TextInputField {...props} secureTextEntry={true} />
  );
}

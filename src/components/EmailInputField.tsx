import React from 'react';
import TextInputField from './TextInputField';

export default function EmailInputField(props) {
  return (
    <TextInputField {...props} keyboardType='email-address' />
  );
}

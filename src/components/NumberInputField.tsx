import React from 'react';
import TextInputField from './TextInputField';

export default function NumberInputField(props) {
  return (
    <TextInputField {...props} keyboardType='numeric' />
  );
}

import React from 'react';
import TextInputField from './TextInputField';

export default function PhoneInputField(props) {
  return (
    <TextInputField {...props} value={(props.value || '').toString()} keyboardType='phone-pad' />
  );
}

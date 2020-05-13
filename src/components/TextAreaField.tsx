import React from 'react';
import TextField from './TextField';

export default function TextAreaField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any}) {
  return (
    <TextField {...props} multiline={true} numberOfLines={4} />
  );
}

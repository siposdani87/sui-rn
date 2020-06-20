import React from 'react';
import TextField from './TextField';
import { TextInputProps } from 'react-native';

export default function TextAreaField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any } & TextInputProps) {
  const numberOfLines = props.numberOfLines || 4;
  const style = {
    height: 20 * numberOfLines + 16,
    textAlignVertical: 'top',
    ...props.style,
  };

  return (
    <TextField numberOfLines={numberOfLines} {...props} style={style} multiline={true} />
  );
}

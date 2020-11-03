import React, { useEffect, useState } from 'react';
import { Styles, Colors } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function clear(){
    setValue('');
    props.onValueChange('');
  }
  
  return (
    <TextField {...props} value={value} onValueChange={props.onValueChange}>
      {props.children}
      <IconButton iconName='close' containerStyle={Styles.fieldIconButton} iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={clear} />
    </TextField>
  );
}

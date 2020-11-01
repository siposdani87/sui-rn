import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import environment from '../config/environment';
import { Styles, Colors } from '../constants';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

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

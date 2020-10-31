import React, { useEffect, useState } from 'react';
import { Styles } from '../constants';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);

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
      <IconButton iconName='close' containerStyle={Styles.fieldIconButton} onPress={clear} />
    </TextField>
  );
}

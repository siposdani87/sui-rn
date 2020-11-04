import React, { useEffect, useState } from 'react';
import { Styles } from '../constants';
import useActionColor from '../hooks/useActionColor';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const getActionColor = useActionColor(props.disabled);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function clear(){
    setValue('');
    props.onValueChange('');
  }
  
  return (
    <TextField value={value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} containerStyle={props.containerStyle} style={props.style}>
      {props.children}
      <IconButton iconName='close' containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={clear} />
    </TextField>
  );
}

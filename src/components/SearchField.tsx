import React, { useEffect, useState } from 'react';
import useActionColor from '../hooks/useActionColor';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: { value: any, onValueChange: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, placeholder?: string, containerStyle?: any, style?: any, children?: any }) {
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
    <TextField value={value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} placeholder={props.placeholder} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style}>
      {props.children}
      <IconButton iconName='close' iconSize={20} containerStyle={{margin: 4}} iconColor={getActionColor()} onPress={clear} />
    </TextField>
  );
}

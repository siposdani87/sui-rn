import React from 'react';
import { TextField } from './TextField';
import { StyleSheet } from 'react-native';
export function TextAreaField(props) {
    const style = StyleSheet.flatten(props.style);
    const numberOfLines = props.numberOfLines || 5;
    const height = 20 * numberOfLines + 16;
    const textareaStyle = {
        height,
        textAlignVertical: 'top',
        paddingTop: 5,
        ...style,
    };
    return (<TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={textareaStyle} multiline={true} numberOfLines={numberOfLines}/>);
}
//# sourceMappingURL=TextAreaField.js.map
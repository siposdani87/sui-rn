import React, { useEffect, useState } from 'react';
import { Styles } from '../constants';
import { useActionColor } from '../hooks/useActionColor';
import { IconButton } from './IconButton';
import { TextField } from './TextField';
export function SearchField(props) {
    const [value, setValue] = useState(props.value);
    const getActionColor = useActionColor(props.disabled);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const clear = () => {
        setValue('');
        props.onValueChange('');
    };
    const getActionButtons = () => {
        let actionsButtons = [];
        if (props.actionButtons) {
            actionsButtons = [...props.actionButtons];
        }
        actionsButtons.push(<IconButton iconName="close" iconSize={20} style={{ padding: 7 }} containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={clear}/>);
        return actionsButtons;
    };
    return (<TextField value={value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} placeholder={props.placeholder} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style} actionButtons={getActionButtons()}/>);
}
//# sourceMappingURL=SearchField.js.map
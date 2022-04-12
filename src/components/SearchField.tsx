import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Styles } from '../constants';
import useActionColor from '../hooks/useActionColor';
import IconButton from './IconButton';
import TextField from './TextField';

export default function SearchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element {
    const [value, setValue] = useState<string>(props.value);
    const getActionColor = useActionColor(props.disabled);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const clear = (): void => {
        setValue('');
        props.onValueChange('');
    };

    const getActionButtons = (): JSX.Element[] => {
        const actionsButtons: JSX.Element[] = [];
        if (props.actionButtons) {
            actionsButtons.concat(props.actionButtons);
        }
        actionsButtons.push(
            <IconButton
                iconName="close"
                iconSize={20}
                style={{ padding: 7 }}
                containerStyle={Styles.fieldIconButton}
                iconColor={getActionColor()}
                onPress={clear}
            />,
        );
        return actionsButtons;
    };

    return (
        <TextField
            value={value}
            error={props.error}
            onValueChange={props.onValueChange}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            placeholder={props.placeholder}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            containerStyle={props.containerStyle}
            style={props.style}
            actionButtons={getActionButtons()}
        />
    );
}

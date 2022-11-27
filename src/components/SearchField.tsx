import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Styles } from '../constants';
import { useActionColor } from '../hooks/useActionColor';
import { IconButton } from './IconButton';
import { TextField, TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';

export type SearchFieldValueType = TextFieldValueType;

export function SearchField(props: {
    value: SearchFieldValueType;
    onValueChange: (_value: SearchFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element {
    const [value, setValue] = useState<SearchFieldValueType>(props.value);
    const getActionColor = useActionColor(props.disabled);

    const clear = (): void => {
        setValue('');
        props.onValueChange('');
    };

    const getActionButtons = (): JSX.Element[] => {
        let actionsButtons: JSX.Element[] = [];
        if (props.actionButtons) {
            actionsButtons = [...props.actionButtons];
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

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

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

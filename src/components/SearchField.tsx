import React, { ReactNode, useEffect, useState } from 'react';
import { Styles } from '../constants';
import { useActionColor } from '../hooks';
import { IconButton } from './IconButton';
import { TextField, TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';

export type SearchFieldValueType = TextFieldValueType;

export function SearchField(
    props: BaseFieldProps & {
        value: SearchFieldValueType;
        onValueChange: (value: SearchFieldValueType) => void;
        placeholder?: string;
        actionButtons?: ReactNode[];
    },
) {
    const [value, setValue] = useState<SearchFieldValueType>(props.value);
    const getActionColor = useActionColor(props.disabled);

    const clear = (): void => {
        setValue('');
        props.onValueChange('');
    };

    const getActionButtons = (): ReactNode[] => {
        let actionsButtons: ReactNode[] = [];
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

import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import useErrorField from '../hooks/useErrorField';
import IconToggleField from './IconToggleField';

export default function RadioButtonField(props: {
    value: any;
    trueValue?: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element {
    const [value, setValue] = useState<any>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (v: string): void => {
        if (v === props.trueValue) {
            onErrorChange();
            setValue(v);
            props.onValueChange(v);
        }
    };

    return (
        <IconToggleField
            value={value}
            onValueChange={onValueChange}
            trueValue={props.trueValue}
            disableUncheck={true}
            error={error}
            containerStyle={props.containerStyle}
            style={props.style}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            checkedIcon="radio-button-checked"
            uncheckedIcon="radio-button-unchecked"
        >
            {props.children}
        </IconToggleField>
    );
}

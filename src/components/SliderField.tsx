import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { useErrorField, useInputStyle, useDarkTheme } from '../hooks';
import Slider from '@react-native-community/slider';
import { BaseFieldProps } from './BaseFieldProps';

export type SliderFieldValueType = number | undefined | null;

export function SliderField(
    props: BaseFieldProps & {
        value: SliderFieldValueType;
        onValueChange: (value: SliderFieldValueType) => void;
        minimumValue?: number;
        maximumValue?: number;
        step?: number;
    },
) {
    const [value, setValue] = useState<SliderFieldValueType>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
    );
    const isDarkTheme = useDarkTheme();

    const onValueChange = (v: number): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <Slider
                style={[{ flex: 1, height: 40 }, props.style, inputStyle]}
                value={value ?? undefined}
                onSlidingComplete={onValueChange}
                step={props.step}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                minimumTrackTintColor={Colors.deepGreyBright}
                maximumTrackTintColor={Colors.deepGreyBright}
                thumbTintColor={
                    isDarkTheme ? Colors.primaryBright : Colors.primary
                }
                disabled={props.disabled}
            />
            <ErrorField error={error} disabled={props.disabled} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

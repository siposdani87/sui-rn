import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { useErrorField } from '../hooks/useErrorField';
import Slider from '@react-native-community/slider';
import { useInputStyle } from '../hooks/useInputStyle';
import { useDarkTheme } from '../hooks/useDarkTheme';
export function SliderField(props) {
    const [value, setValue] = useState(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(value, error, props.required, props.disabled);
    const isDarkTheme = useDarkTheme();
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<View style={[styles.container, props.containerStyle]}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <Slider style={[{ flex: 1, height: 40 }, props.style, inputStyle]} value={value} onSlidingComplete={onValueChange} step={props.step} minimumValue={props.minimumValue} maximumValue={props.maximumValue} minimumTrackTintColor={Colors.deepGreyBright} maximumTrackTintColor={Colors.deepGreyBright} thumbTintColor={isDarkTheme ? Colors.primaryBright : Colors.primary} disabled={props.disabled}/>
            <ErrorField error={error} disabled={props.disabled}/>
        </View>);
}
const styles = StyleSheet.create({
    container: {},
});
//# sourceMappingURL=SliderField.js.map
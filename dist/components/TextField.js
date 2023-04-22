import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, TextInput, StyleSheet, } from 'react-native';
import { Colors, Styles } from '../constants';
import { useErrorField, useInputStyle } from '../hooks';
import ActionButtons from './ActionButtons';
export function TextField(props) {
    const [value, setValue] = useState(props.value);
    const [isFocused, setIsFocused] = useState(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(value, error, props.required, props.disabled, isFocused);
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const getValue = () => {
        return value?.toString() ?? '';
    };
    const getActionButtonsStyle = () => {
        return {
            paddingRight: (props.actionButtons?.length || 0) * 38,
        };
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<View style={[styles.container, props.containerStyle]}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <TextInput value={getValue()} style={[
            styles.textInput,
            props.style,
            inputStyle,
            getActionButtonsStyle(),
        ]} onChangeText={onValueChange} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} placeholderTextColor={Colors.deepGreyBright} placeholder={props.placeholder} underlineColorAndroid="transparent" selectionColor={Colors.deepGreyBright} numberOfLines={props.numberOfLines} multiline={props.multiline} keyboardType={props.keyboardType} secureTextEntry={props.secureTextEntry} autoCapitalize={props.autoCapitalize} editable={!props.disabled && !props.readonly}/>
            <ActionButtons actionButtons={props.actionButtons} label={props.label}/>
            <ErrorField error={error} disabled={props.disabled}/>
        </View>);
}
const styles = StyleSheet.create({
    container: {},
    textInput: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        height: 36,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
//# sourceMappingURL=TextField.js.map
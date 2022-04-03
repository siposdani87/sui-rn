import React, { useState, useEffect, Fragment } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, TextInput, StyleSheet, Platform, } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useInputStyle from '../hooks/useInputStyle';
export default function TextField(props) {
    const [value, setValue] = useState(props.value);
    const [isFocused, setIsFocused] = useState(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(value, error, props.required, props.disabled, isFocused);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const getPlaceholderTextColor = () => {
        return Colors.deepGreyBright;
    };
    const getValue = () => {
        if (value === undefined || value === null) {
            return '';
        }
        return value.toString();
    };
    const getActionButtonsStyle = () => {
        return {
            paddingRight: (props.actionButtons?.length || 0) * 38,
        };
    };
    return (<View style={[styles.container, props.containerStyle]}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <TextInput value={getValue()} style={[
            styles.textInput,
            props.style,
            inputStyle,
            getActionButtonsStyle(),
        ]} onChangeText={onValueChange} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} placeholderTextColor={getPlaceholderTextColor()} placeholder={props.placeholder} underlineColorAndroid="transparent" selectionColor={Colors.deepGreyBright} numberOfLines={props.numberOfLines} multiline={props.multiline} keyboardType={props.keyboardType} secureTextEntry={props.secureTextEntry} autoCapitalize={props.autoCapitalize} editable={!props.disabled && !props.readonly}/>
            {props.actionButtons && (<View style={[
                Styles.actionsContainer,
                Platform.select({
                    android: {
                        top: props.label ? 26 : -2,
                    },
                    ios: {
                        top: props.label ? 21 : -1,
                    },
                }),
            ]}>
                    {props.actionButtons.map((actionButton, key) => (<Fragment key={key}>{actionButton}</Fragment>))}
                </View>)}
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
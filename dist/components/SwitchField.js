import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, Switch, StyleSheet, Platform, } from 'react-native';
import { Colors } from '../constants';
import { useErrorField, useDarkTheme } from '../hooks';
export function SwitchField(props) {
    const trueValue = props.trueValue || true;
    const falseValue = props.falseValue || false;
    const [value, setValue] = useState(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();
    const onValueChange = (boolV) => {
        const v = boolV ? trueValue : falseValue;
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const getTrackColor = () => {
        return {
            false: isDarkTheme ? Colors.blackBright : Colors.lightGreyBright,
            true: isDarkTheme ? Colors.primaryBright : Colors.primaryDark,
        };
    };
    const getThumbColor = () => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.checkboxDisabledDark
                : Colors.checkboxDisabledLight;
        }
        else if (props.required && value !== trueValue) {
            return isDarkTheme
                ? Colors.errorDefaultDark
                : Colors.errorDefaultLight;
        }
        else if (value) {
            return isDarkTheme ? Colors.primaryDark : Colors.primaryBright;
        }
        return isDarkTheme
            ? Colors.checkboxDefaultDark
            : Colors.checkboxDefaultLight;
    };
    const getValue = () => {
        return value === trueValue;
    };
    const toggle = () => {
        if (props.disabled) {
            return;
        }
        const v = getValue() ? falseValue : trueValue;
        onValueChange(v);
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<View style={[styles.container, props.containerStyle]}>
            <Switch value={getValue()} onValueChange={onValueChange} style={[styles.switch, props.style]} disabled={props.disabled} ios_backgroundColor={getTrackColor().false} trackColor={getTrackColor()} thumbColor={getThumbColor()}/>
            <Label onPress={toggle} containerStyle={styles.labelContainer} text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <ErrorField error={error}/>
        </View>);
}
const styles = StyleSheet.create({
    container: {},
    labelContainer: {
        ...Platform.select({
            android: {
                marginLeft: 50,
            },
            ios: {
                marginLeft: 60,
            },
        }),
    },
    switch: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        ...Platform.select({
            android: {
                top: -1,
            },
            ios: {
                top: -6,
            },
        }),
    },
});
//# sourceMappingURL=SwitchField.js.map
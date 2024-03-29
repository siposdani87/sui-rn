import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colors, Styles } from '../constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useErrorField, useDarkTheme } from '../hooks';
export function IconToggleField(props) {
    const trueValue = props.trueValue || true;
    const falseValue = props.falseValue || false;
    const [value, setValue] = useState(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const toggle = () => {
        if (props.disabled) {
            return;
        }
        const falseV = props.disableUncheck ? trueValue : falseValue;
        const v = value === trueValue ? falseV : trueValue;
        onValueChange(v);
    };
    const getColor = () => {
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
        else if (value === trueValue) {
            return isDarkTheme ? Colors.primaryBright : Colors.primary;
        }
        return isDarkTheme
            ? Colors.checkboxDefaultDark
            : Colors.checkboxDefaultLight;
    };
    const getIcon = () => {
        return value === trueValue ? props.checkedIcon : props.uncheckedIcon;
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={toggle} style={[styles.iconToggle, props.style]}>
                <MaterialIcons name={getIcon()} size={26} color={getColor()}/>
            </TouchableOpacity>
            <Label containerStyle={styles.labelContainer} text={props.label} onPress={toggle} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}>
                {props.children}
            </Label>
            <ErrorField error={error} disabled={props.disabled}/>
        </View>);
}
const styles = StyleSheet.create({
    container: {},
    labelContainer: {
        marginLeft: 30,
    },
    iconToggle: {
        position: 'absolute',
        top: -3,
        left: 0,
        zIndex: 1,
    },
});
//# sourceMappingURL=IconToggleField.js.map
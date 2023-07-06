import React, { useState, useEffect, ReactNode } from 'react';
import { ErrorField, ErrorValueType } from './ErrorField';
import { Label } from './Label';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useErrorField, useDarkTheme } from '../hooks';

export type IconToggleFieldValueType = any;

export function IconToggleField(props: {
    value: IconToggleFieldValueType;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: IconToggleFieldValueType;
    falseValue?: IconToggleFieldValueType;
    onValueChange: (_value: IconToggleFieldValueType) => void;
    disableUncheck?: boolean;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}) {
    const trueValue = props.trueValue || true;
    const falseValue = props.falseValue || false;
    const [value, setValue] = useState<IconToggleFieldValueType>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();

    const onValueChange = (v: IconToggleFieldValueType): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const toggle = (): void => {
        if (props.disabled) {
            return;
        }
        const falseV = props.disableUncheck ? trueValue : falseValue;
        const v = value === trueValue ? falseV : trueValue;
        onValueChange(v);
    };

    const getColor = (): string => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.checkboxDisabledDark
                : Colors.checkboxDisabledLight;
        } else if (props.required && value !== trueValue) {
            return isDarkTheme
                ? Colors.errorDefaultDark
                : Colors.errorDefaultLight;
        } else if (value === trueValue) {
            return isDarkTheme ? Colors.primaryBright : Colors.primary;
        }
        return isDarkTheme
            ? Colors.checkboxDefaultDark
            : Colors.checkboxDefaultLight;
    };

    const getIcon = (): any => {
        return value === trueValue ? props.checkedIcon : props.uncheckedIcon;
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity
                activeOpacity={Styles.activeOpacity}
                onPress={toggle}
                style={[styles.iconToggle, props.style]}
            >
                <MaterialIcons name={getIcon()} size={26} color={getColor()} />
            </TouchableOpacity>
            <Label
                containerStyle={styles.labelContainer}
                text={props.label}
                onPress={toggle}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            >
                {props.children}
            </Label>
            <ErrorField error={error} disabled={props.disabled} />
        </View>
    );
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

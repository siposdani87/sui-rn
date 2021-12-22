import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useErrorField from '../hooks/useErrorField';
import useDarkTheme from '../hooks/useDarkTheme';

export default function IconToggleField(props: {
    value: any;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: any;
    falseValue?: any;
    onValueChange: (_value: any) => void;
    disableUncheck?: boolean;
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
    const trueValue = props.trueValue || true;
    const falseValue = props.falseValue || false;
    const [value, setValue] = useState<boolean>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (v: boolean): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const onPress = (): void => {
        const falseV = props.disableUncheck ? trueValue : falseValue;
        const v = value === trueValue ? falseV : trueValue;
        onValueChange(v);
    };

    const getColor = (): string => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.checkboxDisabledDark
                : Colors.checkboxDisabledLight;
        } else if (props.required && value === falseValue) {
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

    const getIcon = (): string => {
        return value === trueValue ? props.checkedIcon : props.uncheckedIcon;
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity
                activeOpacity={Styles.activeOpacity}
                onPress={onPress}
                style={[styles.iconToggle, props.style]}
            >
                <MaterialIcons
                    name={getIcon() as any}
                    size={26}
                    color={getColor()}
                />
            </TouchableOpacity>
            <Label
                containerStyle={styles.labelContainer}
                text={props.label}
                onPress={onPress}
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

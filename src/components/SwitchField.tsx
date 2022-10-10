import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import {
    View,
    Switch,
    StyleSheet,
    Platform,
    ColorValue,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors } from '../constants';
import { useErrorField } from '../hooks/useErrorField';
import { useDarkTheme } from '../hooks/useDarkTheme';

interface TrackColor {
    false?: ColorValue;
    true?: ColorValue;
}

export function SwitchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    trueValue?: any;
    falseValue?: any;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element {
    const trueValue = props.trueValue || true;
    const falseValue = props.falseValue || false;
    const [value, setValue] = useState<boolean>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (boolV: boolean): void => {
        const v = boolV ? trueValue : falseValue;
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const getTrackColor = (): TrackColor => {
        return {
            false: !isDarkTheme
                ? Colors.contentDisabledDark
                : Colors.contentDefaultLight,
            true: isDarkTheme ? Colors.primary : Colors.primaryBright,
        };
    };

    const getThumbColor = (): string => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.checkboxDisabledDark
                : Colors.checkboxDisabledLight;
        } else if (props.required && !value) {
            return isDarkTheme
                ? Colors.errorDefaultDark
                : Colors.errorDefaultLight;
        } else if (value) {
            return isDarkTheme ? Colors.primaryBright : Colors.primary;
        }
        return isDarkTheme
            ? Colors.checkboxDefaultDark
            : Colors.checkboxDefaultLight;
    };

    const getValue = (): boolean => {
        return value === trueValue;
    };

    const onPress = (): void => {
        const v = getValue() ? falseValue : trueValue;
        onValueChange(v);
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Switch
                value={getValue()}
                onValueChange={onValueChange}
                style={[styles.switch, props.style]}
                disabled={props.disabled}
                ios_backgroundColor={getTrackColor().false}
                trackColor={getTrackColor()}
                thumbColor={getThumbColor()}
            />
            <Label
                onPress={onPress}
                containerStyle={styles.labelContainer}
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <ErrorField error={error} />
        </View>
    );
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

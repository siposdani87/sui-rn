import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Tokens } from '../constants';
import {
    useErrorField,
    useInputStyle,
    useDarkTheme,
    usePressableStyle,
} from '../hooks';
import ColorPicker from 'react-native-wheel-color-picker';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { BaseFieldProps } from './BaseFieldProps';

export function ColorField(
    props: BaseFieldProps & {
        value: string;
        onValueChange: (value: string) => void;
        okText: string;
        defaultColor?: string;
    },
) {
    const defaultColor = props.defaultColor ?? Colors.deepGreyBright;
    const [value, setValue] = useState<string>(props.value);
    const [currentColor, setCurrentColor] = useState<string>(defaultColor);
    const [error, onErrorChange] = useErrorField(props.error);
    const [visible, setVisible] = useState<boolean>(false);
    const isDarkTheme = useDarkTheme();
    const pressable = usePressableStyle(styles.colorDotContainer);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
    );

    const onValueChange = (v: string): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const showColorPicker = (): void => {
        if (!props.disabled) {
            setVisible(true);
        }
    };

    const hideColorPicker = (): void => {
        setVisible(false);
    };

    const selectColor = () => {
        hideColorPicker();
        onValueChange(currentColor);
    };

    const getValue = (): string => {
        return value ?? defaultColor;
    };

    const onColorChange = (color: string) => {
        setCurrentColor(color);
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Dialog
                visible={visible}
                title={props.label}
                onClose={hideColorPicker}
                buttons={[
                    <Button
                        key="0"
                        title={props.okText}
                        onPress={selectColor}
                    />,
                ]}
            >
                <View style={styles.colorPickerContainer}>
                    <ColorPicker
                        color={currentColor}
                        onColorChangeComplete={onColorChange}
                    />
                </View>
            </Dialog>
            <Pressable
                onPress={showColorPicker}
                style={pressable.style}
                android_ripple={pressable.android_ripple}
            >
                <View
                    style={[
                        styles.colorDot,
                        {
                            backgroundColor: getValue(),
                            borderColor: isDarkTheme
                                ? Colors.white
                                : Colors.black,
                        },
                        props.style,
                        inputStyle,
                    ]}
                />
            </Pressable>
            <Label
                text={props.label}
                onPress={showColorPicker}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
                containerStyle={styles.label}
            />
            <ErrorField error={error} disabled={props.disabled} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    label: {
        marginLeft: 40,
    },
    colorDotContainer: {
        position: 'absolute',
        top: -5,
        left: 0,
        zIndex: 1,
    },
    colorDot: {
        width: Tokens.borderRadiusColorDot * 2,
        height: Tokens.borderRadiusColorDot * 2,
        borderRadius: Tokens.borderRadiusColorDot,
        borderColor: Colors.black, // overridden inline for dark mode
        borderWidth: Tokens.inputBorderWidth,
    },
    colorPickerContainer: {
        height: Tokens.colorPickerHeight,
    },
});

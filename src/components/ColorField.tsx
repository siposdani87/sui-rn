import React, { useState, useEffect, useRef } from 'react';
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
import useErrorField from '../hooks/useErrorField';
import HsvColorPicker from 'react-native-hsv-color-picker';
import Dialog from './Dialog';
import Button from './Button';
import useInputStyle from '../hooks/useInputStyle';
import { convertHEXToHSV } from 'sui-js';

interface Color {
    saturation: number;
    hue: number;
    value: number;
}

export default function ColorField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    defaultColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element {
    const defaultColor = props.defaultColor || Colors.deepGreyBright;
    const [value, setValue] = useState<string>(props.value);
    const [hue, setHue] = useState<number>(0);
    const [sat, setSat] = useState<number>(0);
    const [val, setVal] = useState<number>(1);
    const [error, onErrorChange] = useErrorField(props.error);
    const [visible, setVisible] = useState<boolean>(false);
    const colorPickerRef = useRef<any>(null);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
    );

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (v: string): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const showColorPicker = (): void => {
        if (!props.disabled) {
            const [h, s, v] = convertHEXToHSV(getValue());
            setHue(h);
            setSat(s);
            setVal(v);
            setVisible(true);
        }
    };

    const hideColorPicker = (): void => {
        setVisible(false);
    };

    const onSatValPickerChange = (c: Color): void => {
        setSat(c.saturation);
        setVal(c.value);
    };

    const onHuePickerChange = (c: Color): void => {
        setHue(c.hue);
    };

    const selectColor = () => {
        hideColorPicker();
        const hexColor = colorPickerRef.current?.getCurrentColor();
        onValueChange(hexColor);
    };

    const getValue = (): string => {
        return value || defaultColor;
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Dialog
                visible={visible}
                title={props.label}
                onClose={hideColorPicker}
                buttons={[
                    <Button
                        key={0}
                        title={props.okText}
                        onPress={selectColor}
                    />,
                ]}
            >
                <HsvColorPicker
                    ref={colorPickerRef}
                    huePickerHue={hue}
                    onHuePickerDragEnd={onHuePickerChange}
                    onHuePickerPress={onHuePickerChange}
                    satValPickerHue={hue}
                    satValPickerSaturation={sat}
                    satValPickerValue={val}
                    onSatValPickerDragEnd={onSatValPickerChange}
                    onSatValPickerPress={onSatValPickerChange}
                />
            </Dialog>
            <TouchableOpacity
                activeOpacity={Styles.activeOpacity}
                onPress={showColorPicker}
                style={styles.colorDotContainer}
            >
                <View
                    style={[
                        styles.colorDot,
                        { backgroundColor: getValue() },
                        props.style,
                        inputStyle,
                    ]}
                />
            </TouchableOpacity>
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
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: Colors.black,
        borderWidth: 1,
    },
});

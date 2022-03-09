import React, { useState, useEffect, useRef } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import HsvColorPicker from 'react-native-hsv-color-picker';
import Dialog from './Dialog';
import Button from './Button';
import useInputStyle from '../hooks/useInputStyle';
import * as SUI from 'sui-js';
export default function ColorField(props) {
    const defaultColor = props.defaultColor || Colors.deepGreyBright;
    const [value, setValue] = useState(props.value);
    const [hue, setHue] = useState(0);
    const [sat, setSat] = useState(0);
    const [val, setVal] = useState(1);
    const [error, onErrorChange] = useErrorField(props.error);
    const [visible, setVisible] = useState(false);
    const colorPickerRef = useRef(null);
    const inputStyle = useInputStyle(value, error, props.required, props.disabled);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const showColorPicker = () => {
        if (!props.disabled) {
            const [h, s, v] = SUI.convertHEXToHSV(getValue());
            setHue(h);
            setSat(s);
            setVal(v);
            setVisible(true);
        }
    };
    const hideColorPicker = () => {
        setVisible(false);
    };
    const onSatValPickerChange = (c) => {
        setSat(c.saturation);
        setVal(c.value);
    };
    const onHuePickerChange = (c) => {
        setHue(c.hue);
    };
    const selectColor = () => {
        hideColorPicker();
        const hexColor = colorPickerRef.current?.getCurrentColor();
        onValueChange(hexColor);
    };
    const getValue = () => {
        return value || defaultColor;
    };
    return (<View style={[styles.container, props.containerStyle]}>
            <Dialog visible={visible} title={props.label} onClose={hideColorPicker} buttons={[
            <Button key={0} title={props.okText} onPress={selectColor}/>,
        ]}>
                <HsvColorPicker ref={colorPickerRef} huePickerHue={hue} onHuePickerDragEnd={onHuePickerChange} onHuePickerPress={onHuePickerChange} satValPickerHue={hue} satValPickerSaturation={sat} satValPickerValue={val} onSatValPickerDragEnd={onSatValPickerChange} onSatValPickerPress={onSatValPickerChange}/>
            </Dialog>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={showColorPicker} style={styles.colorDotContainer}>
                <View style={[
            styles.colorDot,
            { backgroundColor: getValue() },
            props.style,
            inputStyle,
        ]}/>
            </TouchableOpacity>
            <Label text={props.label} onPress={showColorPicker} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={styles.label}/>
            <ErrorField error={error} disabled={props.disabled}/>
        </View>);
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
//# sourceMappingURL=ColorField.js.map
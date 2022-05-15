import React, { useState, useEffect } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colors, Styles } from '../constants';
import { useErrorField } from '../hooks/useErrorField';
import ColorPicker from 'react-native-wheel-color-picker';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { useInputStyle } from '../hooks/useInputStyle';
export function ColorField(props) {
    const defaultColor = props.defaultColor || Colors.deepGreyBright;
    const [value, setValue] = useState(props.value);
    const [currentColor, setCurrentColor] = useState(defaultColor);
    const [error, onErrorChange] = useErrorField(props.error);
    const [visible, setVisible] = useState(false);
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
            setVisible(true);
        }
    };
    const hideColorPicker = () => {
        setVisible(false);
    };
    const selectColor = () => {
        hideColorPicker();
        onValueChange(currentColor);
    };
    const getValue = () => {
        return value || defaultColor;
    };
    const onColorChange = (color) => {
        setCurrentColor(color);
    };
    return (<View style={[styles.container, props.containerStyle]}>
            <Dialog visible={visible} title={props.label} onClose={hideColorPicker} buttons={[
            <Button key="0" title={props.okText} onPress={selectColor}/>,
        ]}>
                <View style={styles.colorPickerContainer}>
                    <ColorPicker color={currentColor} onColorChangeComplete={onColorChange}/>
                </View>
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
    colorPickerContainer: {
        height: 300,
    },
});
//# sourceMappingURL=ColorField.js.map
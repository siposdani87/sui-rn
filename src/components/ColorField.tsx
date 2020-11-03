import React, { useState, useEffect, useRef } from 'react';
import ErrorField from './ErrorField';
import SUI from 'sui-js';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import HsvColorPicker from 'react-native-hsv-color-picker';
import Dialog from './Dialog';
import Button from './Button';
import useInputStyle from '../hooks/useInputStyle';

export default function ColorField(props: { value: any, onValueChange: (value: any) => void, okText: string, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [color, setColor] = useState(SUI.HEXToHSV(props.value));
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [val, setVal] = useState(1);
  const [error, onErrorChange] = useErrorField(props.error);
  const [visible, setVisible] = useState(false);
  const colorPickerRef = useRef(null);
  const getInputStyle = useInputStyle(value, error, props.required, props.disabled);

  useEffect(() => {
    setValue(props.value);
    setColor(SUI.HEXToHSV(props.value));
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    setColor(SUI.HEXToHSV(v));
    props.onValueChange(v);
  }

  function showColorPicker() {
    const [h, s, v] = color;
    setHue(h);
    setSat(s);
    setVal(v);
    setVisible(true);
  }

  function hideColorPicker() {
    setVisible(false);
  }

  function onSatValPickerChange(c) {
    setSat(c.saturation);
    setVal(c.value);
  }

  function onHuePickerChange(c) {
    setHue(c.hue);
  }

  function selectColor() {
    hideColorPicker();
    const hexColor = colorPickerRef.current.getCurrentColor();
    onValueChange(hexColor);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Dialog visible={visible} title={props.label} onClose={hideColorPicker} buttons={[
            <Button title={props.okText} onPress={selectColor} />
          ]}>
        <HsvColorPicker ref={colorPickerRef}
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
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={showColorPicker} style={styles.colorDotContainer}>
        <View style={[styles.colorDot, { backgroundColor: value }, getInputStyle()]}></View>
      </TouchableOpacity>
      <Label containerStyle={styles.label} text={props.label} required={props.required} disabled={props.disabled} />
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
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

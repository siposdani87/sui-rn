import React, { useState, useEffect, ReactNode } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useErrorField, useInputStyle } from '../hooks';
import ActionButtons from './ActionButtons';
import { ErrorValueType } from './ErrorField';

export type TextFieldValueType = any; // string | null | undefined;

export function TextField(
    props: {
        value: TextFieldValueType;
        onValueChange: (_value: TextFieldValueType) => void;
        readonly?: boolean;
        label?: string;
        error?: ErrorValueType;
        required?: boolean;
        disabled?: boolean;
        placeholder?: string;
        desc?: string;
        onPressDesc?: () => void;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<TextStyle>;
        actionButtons?: ReactNode[];
    } & TextInputProps,
) {
    const [value, setValue] = useState<TextFieldValueType>(props.value);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [error, onErrorChange] = useErrorField(props.error);
    const inputStyle = useInputStyle(
        value,
        error,
        props.required,
        props.disabled,
        isFocused,
    );

    const onValueChange = (v: string): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };

    const getValue = (): string => {
        return value?.toString() ?? '';
    };

    const getActionButtonsStyle = (): StyleProp<ViewStyle> => {
        return {
            paddingRight: (props.actionButtons?.length || 0) * 38,
        };
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <TextInput
                value={getValue()}
                style={[
                    styles.textInput,
                    props.style,
                    inputStyle,
                    getActionButtonsStyle(),
                ]}
                onChangeText={onValueChange}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                placeholderTextColor={Colors.deepGreyBright}
                placeholder={props.placeholder}
                underlineColorAndroid="transparent"
                selectionColor={Colors.deepGreyBright}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                autoCapitalize={props.autoCapitalize}
                editable={!props.disabled && !props.readonly}
            />
            <ActionButtons
                actionButtons={props.actionButtons}
                label={props.label}
            />
            <ErrorField error={error} disabled={props.disabled} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    textInput: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        height: 36,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

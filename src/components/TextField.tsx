import React, { useState, useEffect, Fragment } from 'react';
import { ErrorField } from './ErrorField';
import { Label } from './Label';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    Platform,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useErrorField } from '../hooks/useErrorField';
import { useInputStyle } from '../hooks/useInputStyle';

export function TextField(
    props: {
        value: any;
        onValueChange: (_value: any) => void;
        readonly?: boolean;
        label?: string;
        error?: string | null;
        required?: boolean;
        disabled?: boolean;
        placeholder?: string;
        desc?: string;
        onPressDesc?: () => void;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<TextStyle>;
        actionButtons?: JSX.Element[];
    } & TextInputProps,
): JSX.Element {
    const [value, setValue] = useState<string>(props.value);
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
        if (value === undefined || value === null) {
            return '';
        }
        return value.toString();
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
            {props.actionButtons && (
                <View
                    style={[
                        Styles.actionsContainer as any,
                        Platform.select({
                            android: {
                                top: props.label ? 26 : -2,
                            },
                            ios: {
                                top: props.label ? 21 : -1,
                            },
                        }),
                    ]}
                >
                    {props.actionButtons.map((actionButton, key) => (
                        <Fragment key={key}>{actionButton}</Fragment>
                    ))}
                </View>
            )}
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

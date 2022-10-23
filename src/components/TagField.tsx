import React, { Fragment, useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { useErrorField } from '../hooks/useErrorField';
import { useInputStyle } from '../hooks/useInputStyle';
import { ErrorField } from './ErrorField';
import { IconButton } from './IconButton';
import { Label } from './Label';

export function TagField(props: {
    values: any[];
    onValuesChange: (_value: any[]) => void;
    onPress?: (_index: number) => void;
    readonly?: boolean;
    label?: string;
    error?: string | null;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}) {
    const [values, setValues] = useState<string[]>(props.values);
    const [error, onErrorChange] = useErrorField(props.error);
    const isDarkTheme = useDarkTheme();

    useEffect(() => {
        const v = props.values;
        if (v.length === 0 && props.placeholder) {
            v.push(props.placeholder);
        }
        setValues(v);
    }, [props.values, props.placeholder]);

    const onValuesChange = (v: string[]): void => {
        onErrorChange();
        setValues(v);
        props.onValuesChange(
            v.filter((k) => {
                return k !== getPlaceholder();
            }),
        );
    };

    const removeTag = (v: string): (() => void) => {
        return () => {
            const filteredValues = values.filter((_v) => {
                return _v !== v;
            });
            onValuesChange(filteredValues);
        };
    };

    const getTextColor = (): string => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.contentDisabledDark
                : Colors.contentDisabledLight;
        }
        return isDarkTheme
            ? Colors.contentDefaultDark
            : Colors.contentDefaultLight;
    };

    const getBackgroundColor = (): string => {
        if (props.disabled) {
            return isDarkTheme
                ? Colors.inputDisabledDark
                : Colors.inputDisabledLight;
        }
        return isDarkTheme ? Colors.inputDefaultDark : Colors.inputDefaultLight;
    };

    const onPressTag = (index: number): (() => void) => {
        return () => {
            if (props.disabled) {
                return;
            } else if (props.onPress) {
                props.onPress(index);
            }
        };
    };

    const getValuesLength = (): number => {
        if (values?.[0] === getPlaceholder()) {
            return 0;
        }
        return values.length;
    };

    const allowRemove = (v: string): boolean => {
        return !props.readonly && !props.disabled && v !== getPlaceholder();
    };

    const getPlaceholder = (): string => {
        return props.placeholder || '';
    };

    const inputStyle = useInputStyle(
        getValuesLength(),
        error,
        props.required,
        props.disabled,
    );

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <View style={[styles.textInput, props.style, inputStyle]}>
                {values.map((value, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tagContainer,
                            {
                                backgroundColor: getBackgroundColor(),
                                paddingRight: allowRemove(value)
                                    ? 25
                                    : undefined,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={Styles.activeOpacity}
                            onPress={onPressTag(index)}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    { color: getTextColor() },
                                ]}
                            >
                                {value}
                            </Text>
                        </TouchableOpacity>
                        {allowRemove(value) && (
                            <IconButton
                                containerStyle={styles.actionButtonContainer}
                                style={styles.actionButton}
                                iconName="close"
                                iconColor={getTextColor()}
                                iconSize={20}
                                onPress={removeTag(value)}
                            />
                        )}
                    </View>
                ))}
            </View>
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
        minHeight: 36,
        borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 3,
        paddingTop: 3,
        paddingBottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagContainer: {
        borderRadius: 3,
        minHeight: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexDirection: 'row',
        marginRight: 3,
        marginBottom: 3,
    },
    tagText: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
    },
    actionButtonContainer: {
        margin: 0,
        position: 'absolute',
        right: 0,
        top: 3,
        zIndex: 1,
    },
    actionButton: {
        padding: 0,
    },
});

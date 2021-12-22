import React, { Fragment, useState } from 'react';
import SUI from 'sui-js';
import {
    View,
    StyleSheet,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
import IconButton from './IconButton';
import Text from './Text';
import Dialog from './Dialog';

export default function Label(props: {
    text?: string;
    onPress?: () => void;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element | null {
    const isDarkTheme = useDarkTheme();
    const [visible, setVisible] = useState<boolean>(false);

    const getTextStyle = (): StyleProp<TextStyle> => {
        if (props.disabled) {
            return isDarkTheme
                ? styles.labelDisabledDarkText
                : styles.labelDisabledLightText;
        }
        return isDarkTheme
            ? styles.labelDefaultDarkText
            : styles.labelDefaultLightText;
    };

    const onPressDesc = (): void => {
        if (props.onPressDesc) {
            props.onPressDesc();
        } else {
            setVisible(true);
        }
    };

    if (!props.text && !props.children) {
        return null;
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            {props.children}
            <TouchableOpacity
                activeOpacity={Styles.activeOpacity}
                onPress={props.onPress}
            >
                <Text style={[styles.text, props.style, getTextStyle()]}>
                    {props.text ? SUI.capitalize(props.text) : ''}{' '}
                    {props.required ? '*' : ''}
                </Text>
            </TouchableOpacity>
            {(props.desc || props.onPressDesc) && (
                <Fragment>
                    <Dialog
                        visible={visible}
                        onClose={() => {
                            setVisible(false);
                        }}
                    >
                        <Text>{props.desc}</Text>
                    </Dialog>
                    <IconButton
                        containerStyle={styles.infoContainer}
                        iconName="info-outline"
                        iconSize={20}
                        iconColor={
                            isDarkTheme ? Colors.primaryBright : Colors.primary
                        }
                        onPress={onPressDesc}
                    />
                </Fragment>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
    },
    labelDefaultLightText: {
        color: Colors.labelDefaultLight,
    },
    labelDefaultDarkText: {
        color: Colors.labelDefaultDark,
    },
    labelDisabledLightText: {
        color: Colors.labelDisabledLight,
    },
    labelDisabledDarkText: {
        color: Colors.labelDisabledDark,
    },
    infoContainer: {
        position: 'absolute',
        right: -5,
        top: -5,
        margin: 0,
    },
});

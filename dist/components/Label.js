import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { IconButton } from './IconButton';
import { Text } from './Text';
import { Dialog } from './Dialog';
import { capitalize } from '@siposdani87/sui-js';
export function Label(props) {
    const isDarkTheme = useDarkTheme();
    const [visible, setVisible] = useState(false);
    const getTextStyle = () => {
        if (props.disabled) {
            return isDarkTheme
                ? styles.labelDisabledDarkText
                : styles.labelDisabledLightText;
        }
        return isDarkTheme
            ? styles.labelDefaultDarkText
            : styles.labelDefaultLightText;
    };
    const onPressDesc = () => {
        if (props.onPressDesc) {
            props.onPressDesc();
        }
        else {
            setVisible(true);
        }
    };
    if (!props.text && !props.children) {
        return null;
    }
    return (<View style={[styles.container, props.containerStyle]}>
            {props.children}
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
                <Text style={[styles.text, props.style, getTextStyle()]}>
                    {props.text ? capitalize(props.text) : ''}{' '}
                    {props.required ? '*' : ''}
                </Text>
            </TouchableOpacity>
            {(props.desc || props.onPressDesc) && (<>
                    <Dialog visible={visible} onClose={() => {
                setVisible(false);
            }}>
                        <Text>{props.desc}</Text>
                    </Dialog>
                    <IconButton containerStyle={styles.infoContainer} iconName="info-outline" iconSize={20} iconColor={isDarkTheme ? Colors.primaryBright : Colors.primary} onPress={onPressDesc}/>
                </>)}
        </View>);
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
//# sourceMappingURL=Label.js.map
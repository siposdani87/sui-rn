import React, { useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Pressable, Image, } from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks';
export function IconButton(props) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor ?? 'transparent';
    const borderColor = props.borderColor ?? backgroundColor;
    const iconColor = props.iconColor ?? defaultColor;
    const iconSize = props.iconSize ?? 26;
    const onPress = useCallback(() => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    }, [props.disabled, props.onPress]);
    return (<Pressable style={[styles.container, props.containerStyle]} onPress={onPress}>
            <View style={[
            styles.button,
            { backgroundColor, borderColor },
            backgroundColor !== 'transparent'
                ? Styles.lightShadow
                : null,
            props.style,
        ]}>
                {!!props.imageSource && (<Image style={[
                styles.image,
                { width: iconSize, height: iconSize },
            ]} source={props.imageSource}/>)}
                {!!props.iconName && !props.iconType && (<MaterialIcons style={[
                styles.icon,
                { color: iconColor, fontSize: iconSize },
            ]} name={props.iconName}/>)}
                {!!props.iconName && props.iconType === 'Community' && (<MaterialCommunityIcons style={[
                styles.icon,
                { color: iconColor, fontSize: iconSize },
            ]} name={props.iconName}/>)}
            </View>
        </Pressable>);
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    button: {
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
    },
    image: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    icon: {
        fontSize: 26,
    },
});
//# sourceMappingURL=IconButton.js.map
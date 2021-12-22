import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
export default function IconButton(props) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor || 'transparent';
    const borderColor = props.borderColor || backgroundColor;
    const iconColor = props.iconColor || defaultColor;
    const iconSize = props.iconSize || 26;
    const onPress = () => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    };
    return (<TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={onPress}>
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
        </TouchableOpacity>);
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
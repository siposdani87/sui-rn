import React, { ComponentProps, useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    StyleProp,
    ViewStyle,
    ImageSourcePropType,
    ColorValue,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks';

export function IconButton(props: {
    onPress: () => void;
    iconColor?: ColorValue;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    imageSource?: ImageSourcePropType;
    iconName?: string;
    iconType?: string;
    iconSize?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor ?? 'transparent';
    const borderColor = props.borderColor ?? backgroundColor;
    const iconColor = props.iconColor ?? defaultColor;
    const iconSize = props.iconSize ?? 26;

    const onPress = useCallback((): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    }, [props.disabled, props.onPress]);

    return (
        <Pressable
            style={[styles.container, props.containerStyle]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.button,
                    { backgroundColor, borderColor },
                    backgroundColor !== 'transparent'
                        ? Styles.lightShadow
                        : null,
                    props.style,
                ]}
            >
                {!!props.imageSource && (
                    <Image
                        style={[
                            styles.image,
                            { width: iconSize, height: iconSize },
                        ]}
                        source={props.imageSource}
                    />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons
                        style={[
                            styles.icon,
                            { color: iconColor, fontSize: iconSize },
                        ]}
                        name={
                            props.iconName as ComponentProps<
                                typeof MaterialIcons
                            >['name']
                        }
                    />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons
                        style={[
                            styles.icon,
                            { color: iconColor, fontSize: iconSize },
                        ]}
                        name={
                            props.iconName as ComponentProps<
                                typeof MaterialCommunityIcons
                            >['name']
                        }
                    />
                )}
            </View>
        </Pressable>
    );
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

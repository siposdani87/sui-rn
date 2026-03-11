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
import { Colors, Styles, Tokens } from '../constants';
import { useDarkTheme, usePressableStyle } from '../hooks';

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
    const iconSize = props.iconSize ?? Tokens.iconSizeDefault;

    const pressable = usePressableStyle([
        styles.container,
        props.containerStyle,
    ]);

    const onPress = useCallback((): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    }, [props.disabled, props.onPress]);

    return (
        <Pressable
            style={pressable.style}
            android_ripple={pressable.android_ripple}
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
        margin: Tokens.buttonMargin,
    },
    button: {
        borderRadius: Tokens.borderRadiusButton,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Tokens.buttonBorderWidth,
        padding: Tokens.buttonPadding,
    },
    image: {
        width: Tokens.imageSizeSmall,
        height: Tokens.imageSizeSmall,
        resizeMode: 'contain',
    },
    icon: {
        fontSize: Tokens.iconSizeDefault,
    },
});

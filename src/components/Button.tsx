import React, { ComponentProps, useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    StyleProp,
    ImageStyle,
    ViewStyle,
    ImageSourcePropType,
    ColorValue,
} from 'react-native';
import { Colors, Styles, Tokens } from '../constants';
import { usePressableStyle } from '../hooks';

export function Button(props: {
    onPress: () => void;
    iconColor?: ColorValue;
    textColor?: ColorValue;
    textSize?: number;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    title?: string;
    imageSource?: ImageSourcePropType;
    iconName?: string;
    iconSize?: number;
    iconType?: string;
    keepFormat?: boolean;
    layout?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}) {
    const backgroundColor = props.backgroundColor ?? Colors.primary;
    const borderColor = props.borderColor ?? backgroundColor;
    const textColor = props.textColor ?? Colors.primaryText;
    const iconColor = props.iconColor ?? textColor;
    const textSize = props.textSize ?? Tokens.fontSizeBody;
    const iconSize = props.iconSize ?? Tokens.iconSizeDefault;
    const layout = props.layout ?? 'left';

    const hasIcon = (): boolean => {
        return !!props.imageSource || !!props.iconName;
    };

    const hasTitle = (): boolean => {
        return !!props.title;
    };

    const getSpacing = (): StyleProp<ImageStyle> => {
        if (layout === 'left') {
            return {
                marginRight: hasTitle() ? Tokens.buttonMargin : undefined,
            };
        }
        return { marginLeft: hasTitle() ? Tokens.buttonMargin : undefined };
    };

    const getTitle = (): string => {
        return (
            (props.keepFormat ? props.title : props.title?.toUpperCase()) ?? ''
        );
    };

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
                {layout === 'right' && hasTitle() && (
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        style={[
                            styles.text,
                            {
                                paddingRight: hasIcon() ? 0 : undefined,
                                color: textColor,
                                fontSize: textSize,
                            },
                        ]}
                    >
                        {getTitle()}
                    </Text>
                )}
                {!!props.imageSource && (
                    <Image
                        style={[
                            styles.image,
                            getSpacing(),
                            { width: iconSize, height: iconSize },
                        ]}
                        source={props.imageSource}
                    />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons
                        style={[
                            styles.icon,
                            getSpacing(),
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
                            getSpacing(),
                            { color: iconColor, fontSize: iconSize },
                        ]}
                        name={
                            props.iconName as ComponentProps<
                                typeof MaterialCommunityIcons
                            >['name']
                        }
                    />
                )}
                {layout === 'left' && hasTitle() && (
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        style={[
                            styles.text,
                            {
                                paddingLeft: hasIcon() ? 0 : undefined,
                                color: textColor,
                                fontSize: textSize,
                            },
                        ]}
                    >
                        {getTitle()}
                    </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: Tokens.buttonBorderWidth,
        padding: Tokens.buttonPadding,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: Tokens.fontWeightMedium,
        fontSize: Tokens.fontSizeBody,
        flexShrink: 1,
        paddingHorizontal: Tokens.buttonPaddingHorizontal,
        paddingVertical: Tokens.buttonPaddingVertical,
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

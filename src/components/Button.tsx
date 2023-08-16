import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    StyleProp,
    ImageStyle,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import { Colors, Styles } from '../constants';

export function Button(props: {
    onPress: () => void;
    iconColor?: string;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
    imageSource?: ImageSourcePropType;
    iconName?: any;
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
    const textSize = props.textSize ?? 16;
    const iconSize = props.iconSize ?? 26;
    const layout = props.layout ?? 'left';

    const hasIcon = (): boolean => {
        return !!props.imageSource || !!props.iconName;
    };

    const hasTitle = (): boolean => {
        return !!props.title;
    };

    const getSpacing = (): StyleProp<ImageStyle> => {
        if (layout === 'left') {
            return { marginRight: hasTitle() ? 5 : undefined };
        }
        return { marginLeft: hasTitle() ? 5 : undefined };
    };

    const getTitle = (): string => {
        return (
            (props.keepFormat ? props.title : props.title?.toUpperCase()) ?? ''
        );
    };

    const onPress = (): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, props.containerStyle]}
            activeOpacity={Styles.activeOpacity}
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
                        name={props.iconName}
                    />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons
                        style={[
                            styles.icon,
                            getSpacing(),
                            { color: iconColor, fontSize: iconSize },
                        ]}
                        name={props.iconName}
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    button: {
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 5,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: '500',
        fontSize: 16,
        flexShrink: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
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

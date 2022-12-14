import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, Text } from '../components';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { FlashService, FlashItem } from '../services/FlashService';

export function Flash(props: { flashService: FlashService }): JSX.Element {
    const isDarkTheme = useDarkTheme();
    const insets = useSafeAreaInsets();

    const close = (flash: FlashItem): (() => void) => {
        return () => {
            props.flashService.close(flash);
        };
    };

    const isClosable = (flash: FlashItem): boolean => {
        return props.flashService.isClosable(flash);
    };

    const getContainerStyle = (flash: FlashItem): StyleProp<ViewStyle>[] => {
        const containerStyles: StyleProp<ViewStyle>[] = [
            styles.flashContainer,
            Styles.shadow,
            isDarkTheme
                ? styles.flashDarkContainer
                : styles.flashLightContainer,
        ];
        switch (flash.type.toLowerCase()) {
            case 'success':
                containerStyles.push(
                    isDarkTheme
                        ? styles.successDarkContainer
                        : styles.successLightContainer,
                );
                break;
            case 'info':
                containerStyles.push(
                    isDarkTheme
                        ? styles.infoDarkContainer
                        : styles.infoLightContainer,
                );
                break;
            case 'warning':
                containerStyles.push(
                    isDarkTheme
                        ? styles.warningDarkContainer
                        : styles.warningLightContainer,
                );
                break;
            case 'error':
                containerStyles.push(
                    isDarkTheme
                        ? styles.errorDarkContainer
                        : styles.errorLightContainer,
                );
                break;
        }
        return containerStyles;
    };

    return (
        <View style={[styles.container, { top: insets.top + 20 }]}>
            {props.flashService.getFlashes().map((flash, index) => (
                <TouchableOpacity
                    activeOpacity={Styles.activeOpacity}
                    key={index}
                    onPress={close(flash)}
                >
                    <View style={getContainerStyle(flash)}>
                        <Text style={styles.flashText}>{flash.message}</Text>
                        {isClosable(flash) && (
                            <IconButton
                                containerStyle={styles.flashClose}
                                iconName="close"
                                iconSize={18}
                                onPress={close(flash)}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Layout.window.width,
    },
    flashContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 3,
        borderStyle: 'solid',
        borderTopWidth: 5,
        borderTopColor: Colors.deepGreyBright,
    },
    flashLightContainer: {
        backgroundColor: Colors.lightGreyBright,
    },
    flashDarkContainer: {
        backgroundColor: Colors.black,
    },
    flashText: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 14,
    },
    flashClose: {
        position: 'absolute',
        right: -7,
        top: -7,
        zIndex: 1,
    },
    successLightContainer: {
        borderTopColor: Colors.success,
    },
    successDarkContainer: {
        borderTopColor: Colors.successBright,
    },
    infoLightContainer: {
        borderTopColor: Colors.info,
    },
    infoDarkContainer: {
        borderTopColor: Colors.infoBright,
    },
    warningLightContainer: {
        borderTopColor: Colors.warning,
    },
    warningDarkContainer: {
        borderTopColor: Colors.warningBright,
    },
    errorLightContainer: {
        borderTopColor: Colors.error,
    },
    errorDarkContainer: {
        borderTopColor: Colors.errorBright,
    },
});

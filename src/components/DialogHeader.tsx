import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Styles, Tokens } from '../constants';
import { IconButton } from './IconButton';
import { Text } from './Text';

export function DialogHeader(props: {
    title?: string;
    imageSource?: ImageSourcePropType;
    onClose?: () => void;
}) {
    return (
        <View
            style={[
                styles.container,
                props.onClose ? { paddingRight: 35 } : null,
            ]}
        >
            {!!props.imageSource && (
                <Image source={props.imageSource} style={styles.image} />
            )}
            {!!props.title && (
                <Text style={styles.titleText}>{props.title}</Text>
            )}
            {!!props.onClose && (
                <IconButton
                    iconName="close"
                    onPress={props.onClose}
                    containerStyle={styles.closeButton}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Tokens.spacingMd,
        paddingBottom: Tokens.spacingSm,
        paddingHorizontal: Tokens.dialogBodyPadding,
        minHeight: 30,
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        marginRight: Tokens.spacingMd,
    },
    titleText: {
        fontFamily: Styles.fontFamilyHeadingRegular,
        fontWeight: Tokens.fontWeightRegular,
        fontSize: Tokens.fontSizeHeading,
        textTransform: 'uppercase',
        flex: 1,
        flexWrap: 'wrap',
    },
    closeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 1,
    },
});

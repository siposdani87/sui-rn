import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Styles } from '../constants';
import { IconButton } from './IconButton';
import { Text } from './Text';

export function DialogHeader(props: {
    title?: string;
    imageSource?: ImageSourcePropType;
    onClose?: () => void;
}): JSX.Element {
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
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        minHeight: 30,
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    titleText: {
        fontFamily: Styles.fontFamilyHeadingRegular,
        fontWeight: '400',
        fontSize: 22,
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

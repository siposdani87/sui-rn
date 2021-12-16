import React, { Fragment } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Styles } from '../constants';
import IconButton from './IconButton';
import Text from './Text';
export default function DialogHeader(props) {
    return (<Fragment>
            <View style={[
            styles.container,
            props.onClose ? { paddingRight: 25 } : null,
        ]}>
                {!!props.imageSource && (<Image source={props.imageSource} style={[styles.image]}/>)}
                {!!props.title && (<Text style={styles.titleText}>{props.title}</Text>)}
            </View>
            {!!props.onClose && (<IconButton iconName="close" onPress={props.onClose} containerStyle={styles.closeButton}/>)}
        </Fragment>);
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        minHeight: 15,
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
    },
    closeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 1,
    },
});
//# sourceMappingURL=DialogHeader.js.map
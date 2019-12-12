import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors, Layout, Styles } from '../constants';

export default function Loader(props) {
    return props.screenProps.services.httpService.isInprogress() && (
        <View style={styles.baseContainer}>
            <View style={[styles.loader, { backgroundColor: props.backgroundColor }]}>
                <ActivityIndicator animating={true} color={props.color} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        position: 'absolute',
        zIndex: 1,
        top: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Layout.window.width,
    },
    loader: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 15,
        borderRadius: 50,
        ...Styles.shadow,
    },
});

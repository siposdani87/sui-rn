import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { useSafeArea } from 'react-native-safe-area-context';

export default function Loader(props) {
    const insets = useSafeArea();

    return props.screenProps.services.httpService.isInprogress() && (
        <View style={[styles.baseContainer, { top: insets.top + 15, }]}>
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

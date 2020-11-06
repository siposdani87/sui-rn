import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Loader(props: { services: any, backgroundColor: string, color: string }) {
    const insets = useSafeAreaInsets();

    if (props.services.httpService.isInprogress()) {
        return (
            <View style={[styles.container, { top: insets.top + 15 }]}>
                <View style={[styles.loader, { backgroundColor: props.backgroundColor }]}>
                    <ActivityIndicator animating={true} size='small' color={props.color} />
                </View>
            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
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

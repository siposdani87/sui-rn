import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Layout, Styles } from '../constants';

export default function Loader(props: {
    services: any;
    backgroundColor: string;
    color: string;
}) {
    const insets = useSafeAreaInsets();
    const backgroundColor = props.backgroundColor || Colors.primary;

    if (props.services.httpService.isInprogress()) {
        return (
            <View style={[styles.container, { top: insets.top + 15 }]}>
                <View style={[styles.loader, { backgroundColor }]}>
                    <ActivityIndicator
                        animating={true}
                        size="small"
                        color={props.color}
                    />
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
        padding: 10,
        margin: 15,
        borderRadius: 50,
        ...Styles.shadow,
    },
});

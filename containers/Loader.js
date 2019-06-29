import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors, Layout, Styles } from '../constants';

export default class Loader extends React.Component {

    render() {
        return this.props.screenProps.services.httpService.isInprogress() && (
            <View style={styles.baseContainer}>
                <View style={styles.loader}>
                    <ActivityIndicator animating color={Colors.accent} />
                </View>
            </View>
        );
    }
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

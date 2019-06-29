import React from 'react';
import SUI from 'sui-js';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

export default class Notification extends React.Component {
    close(index) {
        return () => {
            this.props.screenProps.factories.notificationFactory.close(index);
        }
    }

    closable(notification) {
        return this.props.screenProps.factories.notificationFactory.isClosable(notification.type, notification.opt_closeCallback) && !SUI.eq(notification.opt_duration, Infinity);
    }

    getContainerStyle(notification) {
        const containerStyles = [styles.notificationContainer];
        switch (notification.type.toLowerCase()) {
            case 'success':
                containerStyles.push(styles.successContainer);
                break;
            case 'info':
                containerStyles.push(styles.infoContainer);
                break;
            case 'warning':
                containerStyles.push(styles.warningContainer);
                break;
            case 'error':
                containerStyles.push(styles.errorContainer);
                break;
        }
        return containerStyles;
    }

    getTextStyle(notification) {
        const textStyles = [styles.notificationText];
        switch (notification.type.toLowerCase()) {
            case 'success':
                textStyles.push(styles.successText);
                break;
            case 'info':
                textStyles.push(styles.infoText);
                break;
            case 'warning':
                textStyles.push(styles.warningText);
                break;
            case 'error':
                textStyles.push(styles.errorText);
                break;
        }
        return textStyles;
    }

    render() {
        return (
            <View style={styles.baseContainer}>
                {this.props.screenProps.factories.notificationFactory.notifications.map((notification, index) => (
                    <TouchableOpacity activeOpacity={Styles.activeOpacity} key={index} onPress={this.close(index)}>
                        <View style={this.getContainerStyle(notification)}>
                            <Text style={this.getTextStyle(notification)}>{notification.message}</Text>
                            {this.closable(notification) && (
                                <TouchableOpacity style={styles.notificationClose} activeOpacity={Styles.activeOpacity} onPress={this.close(index)}>
                                    <MaterialIcons name="close" size={18} color={Colors.black} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableOpacity >
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseContainer: {
        position: 'absolute',
        zIndex: 1,
        top: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Layout.window.width,
    },
    notificationContainer: {
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: Colors.lightGreyBright,
        borderRadius: 3,
        borderStyle: 'solid',
        borderTopWidth: 5,
        ...Styles.shadow,
    },
    notificationText: {
        color: Colors.black,
    },
    notificationClose: {
        position: 'absolute',
        right: 2,
        top: 2,
    },
    successContainer: {
        borderTopColor: Colors.green,
    },
    successText: {

    },
    infoContainer: {
        borderTopColor: Colors.blue,
    },
    infoText: {

    },
    warningContainer: {
        borderTopColor: Colors.amber,
    },
    warningText: {

    },
    errorContainer: {
        borderTopColor: Colors.red,
    },
    errorText: {

    },
});

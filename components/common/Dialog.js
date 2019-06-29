import React from 'react';
import TextButton from '../common/TextButton';
import Button from '../common/Button';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class Dialog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            visible: nextProps.visible,
        };
    }

    onSubmit = () => {
        this._close();
        if (this.props.onSubmit){
            this.props.onSubmit();
        }
    }

    onCancel = () => {
        this._close();
        if (this.props.onCancel){
            this.props.onCancel();
        }
    }

    onClose = () => {
        this._close();
        if (this.props.onClose){
            this.props.onClose();
        }
    }

    _close() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <Modal animationType="fade" transparent visible={this.state.visible} onRequestClose={this.onCancel}>
                <View style={styles.dropContainer}>
                    <View style={styles.dialogContainer}>
                        {this.props.title && (
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>{this.props.title}</Text>
                                {this.props.onClose && (
                                    <TextButton iconName='close' onPress={this.onClose} style={styles.closeButton} />
                                )}
                            </View>
                        )}
                        <View style={styles.bodyContainer}>
                            {this.props.children}
                            {this.props.text && (
                                <Text style={styles.bodyText}>{this.props.text}</Text>
                            )}
                        </View>
                        <View style={styles.footerContainer}>
                            {this.props.onCancel && (
                                <TextButton title={this.props.cancelText} textColor={Colors.black} onPress={this.onCancel} style={styles.button} />
                            )}
                            {this.props.onSubmit && (
                                <Button title={this.props.submitText} onPress={this.onSubmit} style={styles.button} />
                            )}
                            {this.props.buttons && this.props.buttons.map((button, key) => (
                                <View key={key}>{button}</View>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    dropContainer: {
        ...Styles.fullscreenContainer,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    dialogContainer: {
        ...Styles.dialogContainer,
        ...Styles.shadow,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    headerContainer: {
        marginTop: -5,
        marginBottom: 20,
    },
    headerText: {
        fontFamily: Styles.fontFamilyHeading,
        fontSize: 20,
    },
    bodyContainer: {
        marginBottom: 20,
    },
    bodyText: {
        fontFamily: Styles.fontFamilyBody,
        color: Colors.black,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        marginLeft: 10,
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
});

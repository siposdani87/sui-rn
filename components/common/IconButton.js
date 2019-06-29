import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class IconButton extends React.PureComponent {
    render() {
        const backgroundColor = this.props.color || Colors.primary;
        return (
            <View style={this.props.style}>
                <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.props.onPress}>
                    <View style={[styles.buttonContainer, { backgroundColor, borderColor: this.props.borderColor || backgroundColor }]}>
                        {this.props.source && (
                            <Image style={styles.image} source={this.props.source} />
                        )}
                        {this.props.iconName && !this.props.iconType && (
                            <MaterialIcons style={[styles.icon, { color: this.props.textColor || Colors.white }]} name={this.props.iconName} />
                        )}
                        {this.props.iconName && this.props.iconType === 'Community' && (
                            <MaterialCommunityIcons style={[styles.icon, { color: this.props.textColor || Colors.white }]} name={this.props.iconName} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        minHeight: 36,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        minWidth: 36,
        margin: 5,
        ...Styles.lightShadow,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    icon: {
        fontSize: 26,
        padding: 12,
    },
});

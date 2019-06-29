import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class TextButton extends React.PureComponent {
    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.props.onPress}>
                    {this.props.source && (
                        <Image style={styles.image} source={this.props.source} />
                    )}
                    {this.props.iconName && !this.props.iconType && (
                        <MaterialIcons style={[styles.icon, { color: this.props.textColor || Colors.black }]} name={this.props.iconName} />
                    )}
                    {this.props.iconName && this.props.iconType === 'Community' && (
                        <MaterialCommunityIcons style={[styles.icon, { color: this.props.textColor || Colors.black }]} name={this.props.iconName} />
                    )}
                    {this.props.title && (
                        <Text style={[styles.text, { color: this.props.textColor || Colors.black }]}>{this.props.title.toUpperCase()}</Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 15,
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

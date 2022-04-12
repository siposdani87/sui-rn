import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Styles } from '../constants';
export function TabBar(props) {
    const { descriptors, state, navigation } = props;
    if (state.routes.length < 2) {
        return null;
    }
    const routeKey = state.routes[state.index].key;
    const tabBarOptions = descriptors[routeKey].options;
    return (<View style={[
            tabBarOptions.tabBarStyle,
            {
                flexDirection: 'row',
                paddingBottom: props.hasPaddingBottom
                    ? 0
                    : props.insets.bottom,
            },
        ]}>
            {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel
                ? options.tabBarLabel
                : options.title
                    ? options.title
                    : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                }
            };
            const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
            };
            return (<TouchableOpacity key={index} activeOpacity={Styles.activeOpacity} accessibilityRole="button" accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
                        <View style={[
                    tabBarOptions.tabBarItemStyle,
                    styles.tabContainer,
                    {
                        borderTopColor: isFocused
                            ? Colors.accent
                            : 'transparent',
                    },
                ]}>
                            <Text numberOfLines={2} style={[
                    tabBarOptions.tabBarLabelStyle,
                    styles.tabText,
                    {
                        color: isFocused
                            ? tabBarOptions.tabBarActiveTintColor
                            : tabBarOptions.tabBarInactiveTintColor,
                        fontFamily: isFocused
                            ? Styles.fontFamilyBodyMedium
                            : Styles.fontFamilyBodyRegular,
                        fontWeight: isFocused ? '500' : '400',
                    },
                ]}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>);
        })}
        </View>);
}
const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'stretch',
        borderTopWidth: 3,
    },
    tabText: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
//# sourceMappingURL=TabBar.js.map
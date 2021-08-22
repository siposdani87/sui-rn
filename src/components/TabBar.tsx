import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Styles } from '../constants';

export default function TabBar(props: BottomTabBarProps & { hasPaddingBottom?: boolean, tabBarStyle?: any, tabBarItemStyle?: any, tabBarLabelStyle?: any, tabBarActiveTintColor?: string, tabBarInactiveTintColor?: string }) {
  const insets = useSafeAreaInsets();

  const { descriptors, state, navigation } = props;

  if (state.routes.length < 2) {
    return null;
  }

  return (
    <View style={[props.tabBarStyle, { flexDirection: 'row', paddingBottom: props.hasPaddingBottom ? 0 : insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ? options.tabBarLabel : options.title ? options.title : route.name;
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

        return (
          <TouchableOpacity key={index} activeOpacity={Styles.activeOpacity} accessibilityRole='button' accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
            <View style={[props.tabBarItemStyle, styles.tabContainer, { borderTopColor: isFocused ? Colors.accent : 'transparent' }]}>
              <Text numberOfLines={2} style={[props.tabBarLabelStyle, styles.tabText, {
                color: isFocused ? props.tabBarActiveTintColor : props.tabBarInactiveTintColor,
                fontFamily: isFocused ? Styles.fontFamilyBodyMedium : Styles.fontFamilyBodyRegular,
                fontWeight: isFocused ? '500' : '400',
              }]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
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

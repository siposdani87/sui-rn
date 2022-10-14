import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, TextButton, Colors } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';

export default function ButtonsScreen() {
    return (
        <>
            <StatusBar style="light" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            onPress={() => null}
                            iconName="save"
                            keepFormat={true}
                            title="Long title with save Icon and more Text and more"
                            iconColor={Colors.amber}
                            textColor={Colors.white}
                            backgroundColor={Colors.pink}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={() => null} title="Save" />
                        <Button
                            onPress={() => null}
                            iconName="save"
                            backgroundColor={Colors.accent}
                        />
                        <Button
                            onPress={() => null}
                            imageSource={require('../assets/favicon.png')}
                        />
                        <Button
                            onPress={() => null}
                            title="Save"
                            imageSource={require('../assets/favicon.png')}
                        />
                        <Button
                            onPress={() => null}
                            iconName="arrow-left"
                            iconType="Community"
                            title="Save"
                            textColor={Colors.lightBlue}
                            iconColor={Colors.lightBlue}
                            backgroundColor={Colors.white}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            containerStyle={{ flex: 1 }}
                            onPress={() => null}
                            layout="left"
                            iconName="arrow-left"
                            iconType="Community"
                            title="Left Save"
                            textColor={Colors.lightBlue}
                            iconColor={Colors.lightBlue}
                            backgroundColor={Colors.white}
                        />
                        <Button
                            containerStyle={{ flex: 1 }}
                            onPress={() => null}
                            layout="right"
                            iconName="arrow-right"
                            iconType="Community"
                            title="Right Save"
                            textColor={Colors.lightBlue}
                            iconColor={Colors.lightBlue}
                            backgroundColor={Colors.white}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            onPress={() => null}
                            iconName="save"
                            iconSize={36}
                        />
                        <IconButton
                            onPress={() => null}
                            imageSource={require('../assets/favicon.png')}
                            borderColor={Colors.accent}
                        />
                        <IconButton
                            onPress={() => null}
                            iconName="save"
                            iconColor={Colors.primary}
                            borderColor={Colors.primary}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextButton
                            onPress={() => null}
                            title="Save"
                            textSize={24}
                            keepFormat={true}
                        />
                        <TextButton
                            onPress={() => null}
                            title="Save"
                            textColor={Colors.accent}
                        />
                        <TextButton
                            onPress={() => null}
                            title="Save"
                            textColor={Colors.primary}
                            borderColor={Colors.primary}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

import React, { Fragment, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../src/components';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants';
import { ServiceContext, Services } from '../../ServiceContext';

export default function FlashesScreen() {
    const services = useContext<Services>(ServiceContext);

    function showSuccessFlash() {
        services.flashService.addSuccess(
            'Success flash! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        );
    }

    function showInfoFlash() {
        services.flashService.addInfo('Info flash!');
    }

    function showWarningFlash() {
        services.flashService.addWarning('Warning flash!');
    }

    function showErrorFlash() {
        services.flashService.addError(
            'Error flash! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        );
    }

    function showMessageFlash() {
        services.flashService.addMessage({
            type: '',
            closable: true,
            content:
                'Message flash! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        });
    }

    let infinityFlash = null;
    function showInfinityFlash() {
        if (!infinityFlash) {
            infinityFlash = services.flashService.addWarning(
                'Infinity flash!',
                Infinity,
            );
        }
    }

    function closeInfinityFlash() {
        if (infinityFlash) {
            infinityFlash = services.flashService.remove(infinityFlash);
        }
    }

    return (
        <Fragment>
            <StatusBar style="light" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'column' }}>
                        <Button
                            onPress={showSuccessFlash}
                            title="Show success flash"
                            backgroundColor={Colors.success}
                        />
                        <Button
                            onPress={showInfoFlash}
                            title="Show info flash"
                            backgroundColor={Colors.info}
                        />
                        <Button
                            onPress={showWarningFlash}
                            title="Show warning flash"
                            backgroundColor={Colors.warning}
                        />
                        <Button
                            onPress={showErrorFlash}
                            title="Show error flash"
                            backgroundColor={Colors.error}
                        />

                        <Button
                            onPress={showMessageFlash}
                            title="Show message flash"
                            backgroundColor={Colors.deepGreyBright}
                            textColor={Colors.black}
                        />

                        <Button
                            onPress={showInfinityFlash}
                            title="Show infinity flash"
                            backgroundColor={Colors.white}
                            textColor={Colors.black}
                        />
                        <Button
                            onPress={closeInfinityFlash}
                            title="Close infinity flash"
                            backgroundColor={Colors.white}
                            textColor={Colors.black}
                        />
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

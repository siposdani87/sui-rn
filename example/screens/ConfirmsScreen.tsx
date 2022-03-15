import React, { Fragment, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Colors } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { ServiceContext, Services } from '../ServiceContext';

export default function ConfirmsScreen() {
    const services = useContext<Services | null>(ServiceContext);

    function showSuccessConfirm() {
        services?.confirmService.success(
            'Success confirm! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        );
    }

    function showInfoConfirm() {
        services?.confirmService.info('Info confirm!');
    }

    function showWarningConfirm() {
        services?.confirmService.warning('Warning confirm!');
    }

    function showErrorConfirm() {
        services?.confirmService.error(
            'Error confirm! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        );
    }

    function showChoiceConfirm() {
        services?.confirmService.choice(
            'Choice confirm! Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'OK',
                },
            ],
        );
    }

    return (
        <Fragment>
            <StatusBar style="light" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'column' }}>
                        <Button
                            onPress={showSuccessConfirm}
                            title="Show success confirm"
                            backgroundColor={Colors.success}
                        />
                        <Button
                            onPress={showInfoConfirm}
                            title="Show info confirm"
                            backgroundColor={Colors.info}
                        />
                        <Button
                            onPress={showWarningConfirm}
                            title="Show warning confirm"
                            backgroundColor={Colors.warning}
                        />
                        <Button
                            onPress={showErrorConfirm}
                            title="Show error confirm"
                            backgroundColor={Colors.error}
                        />

                        <Button
                            onPress={showChoiceConfirm}
                            title="Show choice confirm"
                            backgroundColor={Colors.deepGreyBright}
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

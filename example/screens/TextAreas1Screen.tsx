import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TextAreaField } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface TextAreasState {
    about: string | null | undefined;
    aboutDisabled: string | null | undefined;
    aboutRequired: string | null | undefined;
    aboutRequiredDisabled: string | null | undefined;
}

export default function TextAreasScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<TextAreasState>({
        about: '',
        aboutDisabled: '',
        aboutRequired: '',
        aboutRequiredDisabled: '',
    }, {
        about: 'About me it is not a long text!',
        aboutDisabled: 'About me it is not a long text!',
        aboutRequired: '',
        aboutRequiredDisabled: '',
    });

    return (
        <>
            <StatusBar />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.container}>
                    <TextAreaField
                        label="About"
                        value={data.about}
                        onValueChange={(v) => updateData('about', v)}
                    />
                    <TextAreaField
                        label="About disabled"
                        value={data.aboutDisabled}
                        onValueChange={(v) => updateData('aboutDisabled', v)}
                        disabled={true}
                    />
                    <TextAreaField
                        label="About required"
                        value={data.aboutRequired}
                        onValueChange={(v) => updateData('aboutRequired', v)}
                        numberOfLines={3}
                        required={true}
                    />
                    <TextAreaField
                        label="About required disabled"
                        value={data.aboutRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('aboutRequiredDisabled', v)
                        }
                        numberOfLines={3}
                        required={true}
                        disabled={true}
                    />
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

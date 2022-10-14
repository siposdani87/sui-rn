import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TextAreaField } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';

export default function TextAreasScreen() {
    const [data, setData] = useState({
        about: '',
        aboutDisabled: '',
        aboutRequired: '',
        aboutRequiredDisabled: '',
    });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                about: 'About me it is not a long text!',
                aboutDisabled: 'About me it is not a long text!',
                aboutRequired: '',
                aboutRequiredDisabled: '',
            });
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        onRefresh();
    }, []);

    const updateData = (key: string, value: any): void => {
        console.log('updateData', key, value);
        setData({
            ...data,
            [key]: value,
        });
    };

    return (
        <>
            <StatusBar style="light" />
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

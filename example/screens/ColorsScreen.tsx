import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ColorField, Colors } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface ColorsState {
    favouriteColor: string;
    favouriteColorDisabled: string;
    favouriteColorRequired: string;
    favouriteColorRequiredDisabled: string;
}

export default function ColorsScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<ColorsState>({
        favouriteColor: '',
        favouriteColorDisabled: '',
        favouriteColorRequired: '#673AB7',
        favouriteColorRequiredDisabled: '#673AB7',
    }, {
        favouriteColor: Colors.lightBlue,
        favouriteColorDisabled: Colors.primary,
        favouriteColorRequired: '',
        favouriteColorRequiredDisabled: '',
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
                    <ColorField
                        label="Favourite color"
                        value={data.favouriteColor}
                        onValueChange={(v) => updateData('favouriteColor', v)}
                        okText="OK"
                    />
                    <ColorField
                        label="Favourite color disabled"
                        value={data.favouriteColorDisabled}
                        onValueChange={(v) =>
                            updateData('favouriteColorDisabled', v)
                        }
                        okText="OK"
                        disabled={true}
                    />
                    <ColorField
                        label="Favourite color required"
                        value={data.favouriteColorRequired}
                        onValueChange={(v) =>
                            updateData('favouriteColorRequired', v)
                        }
                        okText="OK"
                        required={true}
                    />
                    <ColorField
                        label="Favourite color required disabled"
                        value={data.favouriteColorRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('favouriteColorRequiredDisabled', v)
                        }
                        okText="OK"
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

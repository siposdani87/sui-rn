import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { LocationField, LocationType } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface LocationsState {
    location: LocationType | null;
}

export default function LocationsScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<LocationsState>({
        location: null,
    }, {
        location: {
            address: 'Öttevény',
            latitude: 47.74,
            longitude: 17.43,
        },
    });

    const onSearch = (v: string): void => {
        console.log('onSearch', v);
    }

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
                    <LocationField
                        label="Location"
                        value={data.location}
                        onValueChange={(v) => updateData('location', v)}
                        onSearch={onSearch}
                        longitudeText="Longitude"
                        latitudeText="Latitude"
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

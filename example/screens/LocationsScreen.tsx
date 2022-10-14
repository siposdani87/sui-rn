import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { LocationField, LocationType } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';

interface LocationsState {
    location: LocationType | null;
}

export default function LocationsScreen() {
    const [data, setData] = useState<LocationsState>({
        location: null,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                location: {
                    address: 'Öttevény',
                    latitude: 47.74,
                    longitude: 17.43,
                },
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

    function onSearch(v: string) {
        console.log('onSearch', v);
    }

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

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SliderField } from '@siposdani87/sui-rn/dist/components';
import { StatusBar } from 'expo-status-bar';

export default function SlidersScreen() {
    const [data, setData] = useState({
        weight: 0,
        weightDisabled: 0,
        weightRequired: 0,
        weightRequiredDisabled: 0,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                weight: 92,
                weightDisabled: 10,
                weightRequired: 0,
                weightRequiredDisabled: 46,
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
        <Fragment>
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
                    <SliderField
                        label="Weight"
                        value={data.weight}
                        onValueChange={(v) => updateData('weight', v)}
                        minimumValue={0}
                        maximumValue={150}
                        step={1}
                    />
                    <SliderField
                        label="Weight disabled"
                        value={data.weightDisabled}
                        onValueChange={(v) => updateData('weightDisabled', v)}
                        minimumValue={0}
                        maximumValue={150}
                        step={1}
                        disabled={true}
                    />
                    <SliderField
                        label="Weight required"
                        value={data.weightRequired}
                        onValueChange={(v) => updateData('weightRequired', v)}
                        minimumValue={0}
                        maximumValue={150}
                        step={1}
                        required={true}
                    />
                    <SliderField
                        label="Weight required disabled"
                        value={data.weightRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('weightRequiredDisabled', v)
                        }
                        minimumValue={0}
                        maximumValue={150}
                        step={1}
                        required={true}
                        disabled={true}
                    />
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

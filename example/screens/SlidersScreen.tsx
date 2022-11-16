import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SliderField } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface SlidersState {
    weight: number | null | undefined;
    weightDisabled: number | null | undefined;
    weightRequired: number | null | undefined;
    weightRequiredDisabled: number | null | undefined;
}

export default function SlidersScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<SlidersState>({
        weight: 0,
        weightDisabled: 0,
        weightRequired: 0,
        weightRequiredDisabled: 0,
    }, {
        weight: 92,
        weightDisabled: 10,
        weightRequired: 0,
        weightRequiredDisabled: 46,
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

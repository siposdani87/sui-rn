import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import {
    CheckboxField,
    IconToggleField,
    Label,
    RadioButtonField,
    SwitchField,
} from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface CheckboxesState {
    isPrivate: boolean | null;
    isBanned: boolean | null;
    isDeleted: boolean | null;
    radioButton: string | null;
}

export default function CheckboxesScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<CheckboxesState>({
        isPrivate: false,
        isBanned: false,
        isDeleted: false,
        radioButton: null,
    }, {
        isPrivate: true,
        isBanned: true,
        isDeleted: true,
        radioButton: 'yes',
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
                    <Label text="Do you use radio buttons?" />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <RadioButtonField
                            label="Yes"
                            value={data.radioButton}
                            trueValue="yes"
                            onValueChange={(v) => updateData('radioButton', v)}
                        />
                        <RadioButtonField
                            label="No"
                            value={data.radioButton}
                            trueValue="no"
                            onValueChange={(v) => updateData('radioButton', v)}
                        />
                    </View>
                    <CheckboxField
                        label="Private profile"
                        value={data.isPrivate}
                        onValueChange={(v) => updateData('isPrivate', v)}
                    />

                    <SwitchField
                        label="Banned profile"
                        value={data.isBanned}
                        onValueChange={(v) => updateData('isBanned', v)}
                    />

                    <IconToggleField
                        label="Deleted profile, this action is not restorable! Do yout want to remove your social account from this application?"
                        value={data.isDeleted}
                        onValueChange={(v) => updateData('isDeleted', v)}
                        checkedIcon="check-circle"
                        uncheckedIcon="highlight-off"
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

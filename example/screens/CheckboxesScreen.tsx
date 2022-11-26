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
    checkbox: boolean | null;
    checkboxRequired: boolean | null;
    checkboxDisabled: boolean | null;
    checkboxRequiredDisabled: boolean | null;
    switch: boolean | null;
    switchRequired: boolean | null;
    switchDisabled: boolean | null;
    switchRequiredDisabled: boolean | null;
    iconToggle: boolean | null;
    radioButton: string | null;
}

export default function CheckboxesScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<CheckboxesState>({
        checkbox: null,
        checkboxRequired: null,
        checkboxDisabled: null,
        checkboxRequiredDisabled: null,
        switch: null,
        switchRequired: null,
        switchDisabled: null,
        switchRequiredDisabled: null,
        iconToggle: false,
        radioButton: null,
    }, {
        checkbox: true,
        checkboxRequired: false,
        checkboxDisabled: false,
        checkboxRequiredDisabled: false,
        switch: true,
        switchRequired: false,
        switchDisabled: false,
        switchRequiredDisabled: false,
        iconToggle: true,
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
                        label="Checkbox"
                        value={data.checkbox}
                        onValueChange={(v) => updateData('checkbox', v)}
                    />

                    <CheckboxField
                        label="Checkbox required"
                        required={true}
                        value={data.checkboxRequired}
                        onValueChange={(v) => updateData('checkboxRequired', v)}
                    />

                    <CheckboxField
                        label="Checkbox disabled"
                        disabled={true}
                        value={data.checkboxDisabled}
                        onValueChange={(v) => updateData('checkboxDisabled', v)}
                    />

                    <CheckboxField
                        label="Checkbox required disabled"
                        required={true}
                        disabled={true}
                        value={data.checkboxRequiredDisabled}
                        onValueChange={(v) => updateData('checkboxRequiredDisabled', v)}
                    />

                    <SwitchField
                        label="Switch"
                        value={data.switch}
                        onValueChange={(v) => updateData('switch', v)}
                    />

                    <SwitchField
                        label="Switch required"
                        value={data.switchRequired}
                        required={true}
                        onValueChange={(v) => updateData('switchRequired', v)}
                    />

                    <SwitchField
                        label="Switch disabled"
                        value={data.switchDisabled}
                        disabled={true}
                        onValueChange={(v) => updateData('switchDisabled', v)}
                    />

                    <SwitchField
                        label="Switch required disabled"
                        value={data.switchRequiredDisabled}
                        required={true}
                        disabled={true}
                        onValueChange={(v) => updateData('switchRequiredDisabled', v)}
                    />

                    <IconToggleField
                        label="I agree with the rules? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non scelerisque magna."
                        value={data.iconToggle}
                        onValueChange={(v) => updateData('iconToggle', v)}
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

import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import {
    EmailField,
    NumberField,
    PasswordField,
    PhoneField,
    SearchField,
    TextField,
} from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface InputsState {
    name: string | undefined;
    nameDisabled: string | undefined;
    nameRequired: string | undefined;
    nameRequiredDisabled: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone: string | undefined;
    height: number | null | undefined;
    query: string | null | undefined;
}

export default function InputsScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<InputsState>({
        name: '',
        nameDisabled: '',
        nameRequired: '',
        nameRequiredDisabled: '',
        email: '',
        password: '',
        phone: '',
        height: 0,
        query: '',
    }, {
        name: 'John Doe',
        nameDisabled: 'Jane Doe',
        nameRequired: '',
        nameRequiredDisabled: '',
        email: 'user@example.com',
        password: 'TX3-ZaZ6k-$5&t!K',
        phone: '+362012345678',
        height: 178,
        query: '',
    });

    const onPressDesc = (): void => {
        console.log('onPressDesc');
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
                    <TextField
                        label="Name"
                        value={data.name}
                        onValueChange={(v) => updateData('name', v)}
                        desc="Description of name"
                    />
                    <TextField
                        label="Name disabled"
                        value={data.nameDisabled}
                        onValueChange={(v) => updateData('nameDisabled', v)}
                        disabled={true}
                        onPressDesc={onPressDesc}
                    />
                    <TextField
                        label="Name required"
                        value={data.nameRequired}
                        onValueChange={(v) => updateData('nameRequired', v)}
                        required={true}
                    />
                    <TextField
                        label="Name required disabled"
                        value={data.nameRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('nameRequiredDisabled', v)
                        }
                        required={true}
                        disabled={true}
                    />

                    <EmailField
                        label="Email"
                        value={data.email}
                        onValueChange={(v) => updateData('email', v)}
                    />
                    <PasswordField
                        label="Password"
                        value={data.password}
                        onValueChange={(v) => updateData('password', v)}
                    />
                    <PhoneField
                        label="Phone"
                        value={data.phone}
                        onValueChange={(v) => updateData('phone', v)}
                    />
                    <NumberField
                        label="Height"
                        value={data.height}
                        onValueChange={(v) => updateData('height', v)}
                    />
                    <SearchField
                        label="Search"
                        value={data.query}
                        placeholder="Keywords..."
                        onValueChange={(v) => updateData('query', v)}
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

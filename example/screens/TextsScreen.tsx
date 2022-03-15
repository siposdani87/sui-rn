import React, { Fragment, useCallback, useEffect, useState } from 'react';
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

export default function TextsScreen() {
    const [data, setData] = useState({
        name: '',
        nameDisabled: '',
        nameRequired: '',
        nameRequiredDisabled: '',
        email: '',
        password: '',
        phone: '',
        height: 0,
        query: '',
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                name: 'Sipos Dániel',
                nameDisabled: 'Sipos Dániel',
                nameRequired: '',
                nameRequiredDisabled: '',
                email: 'siposdani87@hotmail.com',
                password: '1234',
                phone: '+36309520471',
                height: 178,
                query: '',
            });
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    function updateData(key: string, value: string) {
        console.log('updateData', key, value);
        setData({
            ...data,
            [key]: value,
        });
    }

    function onPressDesc() {
        console.log('onPressDesc');
    }

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
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

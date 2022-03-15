import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SelectField } from '@siposdani87/sui-rn';

interface SelectsState {
    bodyType: string | null | undefined;
    bodyTypeRequired: string | null | undefined;

    notifications: string[] | null | undefined;
    notificationsRequired: string[] | null | undefined;

    gender: string | null;
    genderDisabled: string | null;
    genderRequired: string | null;
    genderRequiredDisabled: string | null;

    hobbies: string[] | null;
    hobbiesDisabled: string[] | null;
    hobbiesRequired: string[] | null;
    hobbiesRequiredDisabled: string[] | null;
}

export default function SelectsScreen() {
    const [data, setData] = useState<SelectsState>({
        bodyType: null,
        bodyTypeRequired: null,

        notifications: [],
        notificationsRequired: [],

        gender: null,
        genderDisabled: null,
        genderRequired: null,
        genderRequiredDisabled: null,

        hobbies: null,
        hobbiesDisabled: [],
        hobbiesRequired: [],
        hobbiesRequiredDisabled: [],
    });
    const genders = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Other', value: 'OTHER' },
    ];
    const bodyTypes = [
        { name: 'Avarage', id: 1 },
        { name: 'Sportic', id: 2 },
    ];
    const hobbies = [
        { name: 'Hunting', value: 'HUNTING' },
        { name: 'Sport', value: 'SPORT' },
        { name: 'Gardening', value: 'GARDENING' },
        { name: 'Play games', value: 'PLAY_GAMES' },
    ];
    const notifications = [
        { name: 'Email', id: 1 },
        { name: 'SMS', id: 2 },
        { name: 'Push', id: 3 },
    ];

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                bodyType: null,
                bodyTypeRequired: undefined,

                notifications: null,
                notificationsRequired: undefined,

                gender: 'MALE',
                genderDisabled: 'MALE',
                genderRequired: null,
                genderRequiredDisabled: null,

                hobbies: ['HUNTING', 'SPORT'],
                hobbiesDisabled: ['HUNTING', 'SPORT'],
                hobbiesRequired: [],
                hobbiesRequiredDisabled: [],
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
                    <SelectField
                        label="Body type"
                        items={bodyTypes}
                        value={data.bodyType}
                        valueKey="id"
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('bodyType', v)}
                        placeholder="Please select..."
                        searchPlaceholder="Search..."
                    />
                    <SelectField
                        label="Body type required"
                        items={bodyTypes}
                        value={data.bodyTypeRequired}
                        valueKey="id"
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('bodyTypeRequired', v)}
                        placeholder="Please select..."
                        searchPlaceholder="Search..."
                        required={true}
                    />

                    <SelectField
                        multiple={true}
                        label="Notifications"
                        items={notifications}
                        value={data.notifications}
                        valueKey="id"
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('notifications', v)}
                        placeholder="All notifications"
                    />
                    <SelectField
                        multiple={true}
                        label="Notifications required"
                        items={notifications}
                        value={data.notificationsRequired}
                        valueKey="id"
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) =>
                            updateData('notificationsRequired', v)
                        }
                        required={true}
                        placeholder="All notifications"
                    />

                    <SelectField
                        label="Gender"
                        items={genders}
                        value={data.gender}
                        okText="OK"
                        onValueChange={(v) => updateData('gender', v)}
                        searchPlaceholder="Search..."
                    />
                    <SelectField
                        label="Gender disabled"
                        items={genders}
                        value={data.genderDisabled}
                        okText="OK"
                        onValueChange={(v) => updateData('genderDisabled', v)}
                        disabled={true}
                    />
                    <SelectField
                        label="Gender required"
                        items={genders}
                        value={data.genderRequired}
                        okText="OK"
                        onValueChange={(v) => updateData('genderRequired', v)}
                        required={true}
                    />
                    <SelectField
                        label="Gender required disabled"
                        items={genders}
                        value={data.genderRequiredDisabled}
                        okText="OK"
                        onValueChange={(v) =>
                            updateData('genderRequiredDisabled', v)
                        }
                        required={true}
                        disabled={true}
                    />

                    <SelectField
                        multiple={true}
                        label="Hobbies"
                        items={hobbies}
                        value={data.hobbies}
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('hobbies', v)}
                    />
                    <SelectField
                        multiple={true}
                        label="Hobbies disabled"
                        items={hobbies}
                        value={data.hobbiesDisabled}
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('hobbiesDisabled', v)}
                        disabled={true}
                    />
                    <SelectField
                        multiple={true}
                        label="Hobbies required"
                        items={hobbies}
                        value={data.hobbiesRequired}
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) => updateData('hobbiesRequired', v)}
                        required={true}
                    />
                    <SelectField
                        multiple={true}
                        label="Hobbies required disabled"
                        items={hobbies}
                        value={data.hobbiesRequiredDisabled}
                        labelKey="name"
                        okText="OK"
                        onValueChange={(v) =>
                            updateData('hobbiesRequiredDisabled', v)
                        }
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

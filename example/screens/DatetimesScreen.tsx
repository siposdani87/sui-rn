import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { DatetimeField } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';

interface DatetimesState {
    datetime: Date | string | null;
    datetimeDisabled: Date | string | null;
    datetimeRequired: Date | string | null | undefined;
    datetimeRequiredDisabled: Date | string | null;
    date: Date | string | null;
    time: Date | string | null;
    year: Date | string | null;
}

export default function DatetimesScreen() {
    const [data, setData] = useState<DatetimesState>({
        datetime: null,
        datetimeDisabled: null,
        datetimeRequired: new Date(),
        datetimeRequiredDisabled: null,
        date: null,
        time: null,
        year: null,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            const regex = /\.[0-9]{3}/g;
            setData({
                ...data,
                datetime: new Date()
                    .toISOString()
                    .replace(regex, '')
                    .replace('Z', '+00:00'),
                datetimeDisabled: new Date()
                    .toISOString(),
                datetimeRequired: undefined,
                datetimeRequiredDisabled: null,
                date: new Date().toISOString().split('T', 2)[0],
                time: new Date()
                    .toISOString()
                    .split('T', 2)[1]
                    .split('.', 2)[0],
                year: '1987', 
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
                    <DatetimeField
                        label="Datetime"
                        mode="datetime"
                        format="yyyy. MM. dd., HH:mm"
                        okText="OK"
                        value={data.datetime}
                        onValueChange={(v) => updateData('datetime', v)}
                    />
                     <DatetimeField
                        label="Datetime disabled"
                        mode="datetime"
                        format="yyyy. MM. dd., HH:mm"
                        okText="OK"
                        value={data.datetimeDisabled}
                        onValueChange={(v) => updateData('datetimeDisabled', v)}
                        disabled={true}
                    /> 
                    <DatetimeField
                        label="Datetime required"
                        mode="datetime"
                        format="yyyy. MM. dd., HH:mm"
                        okText="OK"
                        value={data.datetimeRequired}
                        onValueChange={(v) => updateData('datetimeRequired', v)}
                        required={true}
                    />
                    <DatetimeField
                        label="Datetime required disabled"
                        mode="datetime"
                        format="yyyy. MM. dd., HH:mm"
                        okText="OK"
                        value={data.datetimeRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('datetimeRequiredDisabled', v)
                        }
                        required={true}
                        disabled={true}
                    />

                    <DatetimeField
                        label="Date"
                        mode="date"
                        format="D. MMM YYYY."
                        okText="OK"
                        value={data.date}
                        onValueChange={(v) => updateData('date', v)}
                    />
                    <DatetimeField
                        label="Time"
                        mode="time"
                        format="HH:mm"
                        okText="OK"
                        value={data.time}
                        onValueChange={(v) => updateData('time', v)}
                    />
                    <DatetimeField
                        label="Year"
                        mode="year"
                        format="yyyy."
                        value={data.year}
                        okText="OK"
                        searchPlaceholder="Search..."
                        onValueChange={(v) => updateData('year', v)}
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

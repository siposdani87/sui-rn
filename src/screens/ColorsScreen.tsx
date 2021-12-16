import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ColorField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants';

interface ColorsState {
    favouriteColor: string;
    favouriteColorDisabled: string;
    favouriteColorRequired: string;
    favouriteColorRequiredDisabled: string;
}

export default function ColorsScreen() {
    const [data, setData] = useState<ColorsState>({
        favouriteColor: '',
        favouriteColorDisabled: '',
        favouriteColorRequired: '#673AB7',
        favouriteColorRequiredDisabled: '#673AB7',
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                favouriteColor: Colors.lightBlue,
                favouriteColorDisabled: Colors.primary,
                favouriteColorRequired: '',
                favouriteColorRequiredDisabled: '',
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
                    <ColorField
                        label="Favourite color"
                        value={data.favouriteColor}
                        onValueChange={(v) => updateData('favouriteColor', v)}
                        okText="OK"
                    />
                    <ColorField
                        label="Favourite color disabled"
                        value={data.favouriteColorDisabled}
                        onValueChange={(v) =>
                            updateData('favouriteColorDisabled', v)
                        }
                        okText="OK"
                        disabled={true}
                    />
                    <ColorField
                        label="Favourite color required"
                        value={data.favouriteColorRequired}
                        onValueChange={(v) =>
                            updateData('favouriteColorRequired', v)
                        }
                        okText="OK"
                        required={true}
                    />
                    <ColorField
                        label="Favourite color required disabled"
                        value={data.favouriteColorRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('favouriteColorRequiredDisabled', v)
                        }
                        okText="OK"
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

import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TextAreaField } from '@siposdani87/sui-rn/dist/components';

interface RichEditorsState {
    bio: string | null | undefined;
    bioDisabled: string | null | undefined;
    bioRequired: string | null | undefined;
    bioRequiredDisabled: string | null | undefined;
}

export default function RichEditorsScreen() {
    const [data, setData] = useState<RichEditorsState>({
        bio: undefined,
        bioDisabled: '',
        bioRequired: null,
        bioRequiredDisabled: undefined,
    });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setData({
                bio: '<p>0 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p><p>1 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
                bioDisabled:
                    '<p>Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
                bioRequired: null,
                bioRequiredDisabled: undefined,
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
                    <TextAreaField
                        label="About"
                        value={data.bio}
                        onValueChange={(v) => updateData('bio', v)}
                        richText={true}
                    />
                    <TextAreaField
                        label="About disabled"
                        value={data.bioDisabled}
                        onValueChange={(v) => updateData('bioDisabled', v)}
                        richText={true}
                        disabled={true}
                    />
                    <TextAreaField
                        label="About required"
                        value={data.bioRequired}
                        onValueChange={(v) => updateData('bioRequired', v)}
                        richText={true}
                        required={true}
                    />
                    <TextAreaField
                        label="About required disabled"
                        value={data.bioRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('bioRequiredDisabled', v)
                        }
                        richText={true}
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

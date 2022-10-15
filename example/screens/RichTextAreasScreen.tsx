import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { RichTextAreaField } from '@siposdani87/sui-rn';
import { useData } from '../utils/useData';


interface RichTextAreasState {
    bio: string | null | undefined;
    bioDisabled: string | null | undefined;
    bioRequired: string | null | undefined;
    bioRequiredDisabled: string | null | undefined;
}

export default function RichTextAreasScreen() {
    const [data, updateData, refreshing, onRefresh] = useData<RichTextAreasState>({
        bio: undefined,
        bioDisabled: '',
        bioRequired: null,
        bioRequiredDisabled: undefined,
    }, {
        bio: '<p>0 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p><p>1 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
        bioDisabled:
            '<p>Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
        bioRequired: null,
        bioRequiredDisabled: undefined,
    });

    return (
        <>
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
                    <RichTextAreaField
                        label="About"
                        value={data.bio}
                        onValueChange={(v) => updateData('bio', v)}
                    />
                    <RichTextAreaField
                        label="About disabled"
                        value={data.bioDisabled}
                        onValueChange={(v) => updateData('bioDisabled', v)}
                        disabled={true}
                    />
                    <RichTextAreaField
                        label="About required"
                        value={data.bioRequired}
                        onValueChange={(v) => updateData('bioRequired', v)}
                        required={true}
                    />
                    <RichTextAreaField
                        label="About required disabled"
                        value={data.bioRequiredDisabled}
                        onValueChange={(v) =>
                            updateData('bioRequiredDisabled', v)
                        }
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

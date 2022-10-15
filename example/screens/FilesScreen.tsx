import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { FileField, ImageSourceType } from '@siposdani87/sui-rn';
import { StatusBar } from 'expo-status-bar';
import { useData } from '../utils/useData';

interface FilesState {
    logoPicture: ImageSourceType;
    logoPictureDefault: ImageSourceType;
    profilePicture: string | null;
    document: string | null;
    documentDisabled: string | null;
}

export default function FilesScreen() {
    const defaultValue =
        'https://www.gravatar.com/avatar/111111?s=200&d=mp&f=y';
    const [data, updateData, refreshing, onRefresh] = useData<FilesState>({
        logoPicture: require('../assets/icon.png'),
        logoPictureDefault: null,
        profilePicture: null,
        document: null,
        documentDisabled: null,
    }, {
        logoPicture: {
            uri: null,
        },
        logoPictureDefault: null,
        profilePicture:
            'https://www.gravatar.com/avatar/000000?s=200&d=robohash&f=y',
        document: null,
        documentDisabled:
            'http://www.africau.edu/images/default/sample.pdf',
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
                    <FileField
                        label="Logo picture required"
                        value={data.logoPicture}
                        defaultValue={{ uri: defaultValue }}
                        mimeType="image/*"
                        onValueChange={(v) => updateData('logoPicture', v)}
                        required={true}
                    />

                    <FileField
                        label="Logo picture default required"
                        value={data.logoPictureDefault}
                        defaultValue={{ uri: defaultValue }}
                        mimeType="image/*"
                        onValueChange={(v) =>
                            updateData('logoPictureDefault', v)
                        }
                        required={true}
                    />

                    <FileField
                        label="Profile picture"
                        value={{ uri: data.profilePicture }}
                        defaultValue={{ uri: defaultValue }}
                        mimeType="image/*"
                        onValueChange={(v) => updateData('profilePicture', v)}
                    />

                    <FileField
                        label="Document"
                        value={{ uri: data.document }}
                        mimeType="application/pdf"
                        onValueChange={(v) => updateData('document', v)}
                    />

                    <FileField
                        label="Document disabled"
                        value={{ uri: data.documentDisabled }}
                        mimeType="text/html"
                        onValueChange={(v) =>
                            updateData('documentdocumentDisabled', v)
                        }
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

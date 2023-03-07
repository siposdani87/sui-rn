import { RichTextViewer } from '@siposdani87/expo-rich-text-editor';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link, Text, Colors } from '@siposdani87/sui-rn';

export default function OthersScreen() {
    const sampleHtml =
        '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal text with some characters <i>Italic word</i> another normal text <u>underline word</u> and email link <a href="mailto:siposdani87@gmail.com">mailto</a> and standar link <a href="https://google.com" target="_blank">link to website</a> and link to <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">download file</a>.</p>';

    return (
        <>
            <StatusBar />
            <ScrollView>
                <View style={styles.container}>
                    <Text>Simple themed text</Text>

                    <Link onPress={() => null} title="Open new link" />

                    <RichTextViewer
                        value={sampleHtml}
                        linkStyle={{ color: Colors.primary }}
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

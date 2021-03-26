import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link, Text, NoContent, Button } from '../../src/components';
import { StatusBar } from 'expo-status-bar';
import { RichTextViewer } from 'expo-rich-text-editor/src';
import { Colors } from '../constants';

export default function OthersScreen() {
  const sampleHtml = '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal text with some characters <i>Italic word</i> another normal text <u>underline word</u> and email link <a href="mailto:siposdani87@gmail.com">mailto</a> and standar link <a href="https://google.com" target="_blank">link to website</a> and link to <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">download file</a>.</p>';

  return (
    <Fragment>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <NoContent text='No content yet!' imageSource={{ uri: 'https://www.gravatar.com/avatar/0?s=200&d=identicon&f=y' }}>
            <Button title='Continue' onPress={null} />
          </NoContent>

          <Text>Simple themed text</Text>

          <Link onPress={() => null} title='Open new link' />

          <RichTextViewer html={sampleHtml} linkStyle={styles.linkStyle} />
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  linkStyle: {
    color: Colors.primary,
  },
});

import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link, Text, NoContent } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function OthersScreen() {
  return (
    <Fragment>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <NoContent text='No content yet!' imageSource={{ uri: 'https://www.gravatar.com/avatar/0?s=200&d=identicon&f=y' }} />

          <Text>Simple themed text</Text>

          <Link onPress={() => null} title='Open new link' />
        </View>
      </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, TextButton } from '../../src/components';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants';

export default function ButtonsScreen() {
  return (
    <Fragment>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Button onPress={() => null} iconName='save' title='long title with save icon and more text' iconColor={Colors.amber} textColor={Colors.white} backgroundColor={Colors.deepPurple} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => null} title='Save' />
            <Button onPress={() => null} iconName='save' backgroundColor={Colors.accent} />
            <Button onPress={() => null} title='Save' imageSource={require('../../assets/favicon.png')} />
            <Button onPress={() => null} iconName='save' title='Save' textColor={Colors.lightBlue} iconColor={Colors.black} backgroundColor={Colors.white} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton onPress={() => null} iconName='save' />
            <IconButton onPress={() => null} imageSource={require('../../assets/favicon.png')} borderColor={Colors.accent} />
            <IconButton onPress={() => null} iconName='save' iconColor={Colors.primary} borderColor={Colors.primary} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextButton onPress={() => null} title='Save' />
            <TextButton onPress={() => null} title='Save' textColor={Colors.accent} />
            <TextButton onPress={() => null} title='Save' textColor={Colors.primary} borderColor={Colors.primary} />
          </View>
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
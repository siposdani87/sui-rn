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
            <Button onPress={() => { }} iconName='save' title='long title with save icon and more text' iconColor={Colors.amber} textColor={Colors.white} backgroundColor={Colors.deepPurple} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => { }} title='Save' />
            <Button onPress={() => { }} iconName='save' backgroundColor={Colors.accent} />
            <Button onPress={() => { }} title='Save' imageSource={require('../../assets/favicon.png')} />
            <Button onPress={() => { }} iconName='save' title='Save' textColor={Colors.lightBlue} iconColor={Colors.black} backgroundColor={Colors.white} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton onPress={() => { }} iconName='save' />
            <IconButton onPress={() => { }} imageSource={require('../../assets/favicon.png')} borderColor={Colors.accent} />
            <IconButton onPress={() => { }} iconName='save' iconColor={Colors.primary} borderColor={Colors.primary} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextButton onPress={() => { }} title='Save' />
            <TextButton onPress={() => { }} title='Save' textColor={Colors.accent} />
            <TextButton onPress={() => { }} title='Save' textColor={Colors.primary} borderColor={Colors.primary} />
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
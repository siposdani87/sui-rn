import React, { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, Button, Text, TextButton, TextField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function DialogsScreen() {
  const [visible, setVisible] = useState(null);

  function isVisible(key: string): boolean {
    return visible === key;
  }

  function openDialog(key: string): any {
    return () => {
      setVisible(key);
    };
  }

  function closeDialog(): any {
    setVisible(null);
  }

  return (
    <Fragment>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <Dialog visible={isVisible('dialog1')} onClose={closeDialog}>
            <Text>Dialog 1 text</Text>
          </Dialog>
          <Button onPress={openDialog('dialog1')} title='dialog1' />

          <Dialog visible={isVisible('dialog2')} title='Dialog 2' onClose={closeDialog} buttons={[
            <TextButton title='cancel' onPress={closeDialog} />,
            <Button title='done' onPress={closeDialog} />
          ]}>
            <Text>Dialog 2 text</Text>
            <TextField label='Name' value='' onValueChange={() => null} desc='Description of name' />
          </Dialog>
          <Button onPress={openDialog('dialog2')} title='dialog2' />

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

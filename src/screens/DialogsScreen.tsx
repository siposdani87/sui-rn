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
            <Text>Dialog 1 text this paragraph has long long text to test multiline content and numbers: 1, 34556, 54.54</Text>
          </Dialog>
          <Button onPress={openDialog('dialog1')} title='dialog1 with text' />

          <Dialog visible={isVisible('dialog2')} title='Dialog 2' buttons={[
            <TextButton key={0} title='cancel' onPress={closeDialog} />,
            <Button key={1} title='done' onPress={closeDialog} />,
          ]}>
            <Text>Dialog 2 text</Text>
            <TextField label='Name' value='' onValueChange={() => null} desc='Description of name' />
          </Dialog>
          <Button onPress={openDialog('dialog2')} title='dialog2 with form' />

          <Dialog visible={isVisible('dialog3')} title='Dialog 3 with long title and long long!!!' onClose={closeDialog} buttons={[
            <TextButton key={0} title='cancel long title!!!' onPress={closeDialog} />,
            <Button key={1} title='done with long title!!!' onPress={closeDialog} />,
          ]}>
            <Text>Dialog 3 text</Text>
          </Dialog>
          <Button onPress={openDialog('dialog3')} title='dialog3 with long titles' />

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

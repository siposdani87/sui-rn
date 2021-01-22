import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { FileField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function FilesScreen() {
  const [data, setData] = useState({
    profilePicture: null,
    logoPicture: require('../../assets/icon.png'),
    document: null,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        profilePicture: 'https://www.gravatar.com/avatar/0?s=200&d=robohash&f=y',
        logoPicture: {
          uri: null,
        },
        document: null,
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  function updateData(key, value) {
    console.log('updateData', key, value);
    setData({
      ...data,
      [key]: value,
    });
  }

  return (
    <Fragment>
      <StatusBar style='dark' />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.container}>
          <FileField label='Logo picture' value={data.logoPicture} mimeType='image/*' onValueChange={(v) => updateData('logoPicture', v)} />

          <FileField label='Profile picture' value={{ uri: data.profilePicture }} mimeType='image/*' onValueChange={(v) => updateData('profilePicture', v)} />

          <FileField label='Document' value={{ uri: data.document }} mimeType='application/pdf' onValueChange={(v) => updateData('document', v)} />
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

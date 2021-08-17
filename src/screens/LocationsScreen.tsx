import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { LocationField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function LocationsScreen() {
  const [data, setData] = useState({
    location: null,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        location: {
          address: 'Öttevény',
          latitude: 47.74,
          longitude: 17.43,
        },
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

  function onSearch(v) {
    console.log('onSearch', v);
  }

  return (
    <Fragment>
      <StatusBar style='light' />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.container}>
          <LocationField label='Location' value={data.location} onValueChange={(v) => updateData('location', v)} onSearch={onSearch} longitudeText='Longitude' latitudeText='Latitude' />
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

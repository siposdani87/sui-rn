import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { DatetimeField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function DatetimesScreen() {
  const [data, setData] = useState({
    year: null,

    datetime: null,
    datetimeDisabled: null,
    datetimeRequired: null,
    datetimeRequiredDisabled: null,

    date: null,
    time: null,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        year: 1987,

        datetime: new Date().toISOString(),
        datetimeDisabled: new Date().toISOString(),
        datetimeRequired: null,
        datetimeRequiredDisabled: null,

        date: new Date().toISOString(),
        time: new Date().toISOString(),

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
          <DatetimeField label='Datetime' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.datetime} onValueChange={(v) => updateData('datetime', v)} />
          <DatetimeField label='Datetime disabled' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.datetimeDisabled} onValueChange={(v) => updateData('datetimeDisabled', v)} disabled={true} />
          <DatetimeField label='Datetime required' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.datetimeRequired} onValueChange={(v) => updateData('datetimeRequired', v)} required={true} />
          <DatetimeField label='Datetime required disabled' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.datetimeRequiredDisabled} onValueChange={(v) => updateData('datetimeRequiredDisabled', v)} required={true} disabled={true} />
          
          <DatetimeField label='Date' mode='date' format='YYYY. MM. DD.' okText='OK' value={data.date} onValueChange={(v) => updateData('date', v)} />
          <DatetimeField label='Time' mode='time' format='HH:mm' okText='OK' value={data.time} onValueChange={(v) => updateData('time', v)} />
          
          <DatetimeField label='Year' mode='year' format='YYYY.' value={data.year} okText='OK' onValueChange={(v) => updateData('year', v)} />
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
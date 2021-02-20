import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SelectField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function SelectsScreen() {
  const [data, setData] = useState({
    bodyType: null,

    gender: null,
    genderDisabled: null,
    genderRequired: null,
    genderRequiredDisabled: null,

    hobbies: [],
    hobbiesDisabled: [],
    hobbiesRequired: [],
    hobbiesRequiredDisabled: [],
  });
  const genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];
  const bodyTypes = [
    { name: 'Avarage', id: 1 },
    { name: 'Sportic', id: 2 },
  ];
  const hobbies = [
    { name: 'Hunting', value: 'HUNTING' },
    { name: 'Sport', value: 'SPORT' },
    { name: 'Gardening', value: 'GARDENING' },
    { name: 'Play games', value: 'PLAY_GAMES' },
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        bodyType: null,

        gender: 'MALE',
        genderDisabled: 'MALE',
        genderRequired: null,
        genderRequiredDisabled: null,

        hobbies: ['HUNTING', 'SPORT'],
        hobbiesDisabled: ['HUNTING', 'SPORT'],
        hobbiesRequired: [],
        hobbiesRequiredDisabled: [],
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
          <SelectField label='Body type' items={bodyTypes} value={data.bodyType} valueKey='id' labelKey='name' okText='OK' onValueChange={(v) => updateData('bodyType', v)} placeholder='Please select...' searchPlaceholder='Search...' />

          <SelectField label='Gender' items={genders} value={data.gender} okText='OK' onValueChange={(v) => updateData('gender', v)} searchPlaceholder='Search...' />
          <SelectField label='Gender disabled' items={genders} value={data.genderDisabled} okText='OK' onValueChange={(v) => updateData('genderDisabled', v)} disabled={true} />
          <SelectField label='Gender required' items={genders} value={data.genderRequired} okText='OK' onValueChange={(v) => updateData('genderRequired', v)} required={true} />
          <SelectField label='Gender required disabled' items={genders} value={data.genderRequiredDisabled} okText='OK' onValueChange={(v) => updateData('genderRequiredDisabled', v)} required={true} disabled={true} />

          <SelectField multiple={true} label='Hobbies' items={hobbies} value={data.hobbies} labelKey='name' okText='OK' onValueChange={(v) => updateData('hobbies', v)} />
          <SelectField multiple={true} label='Hobbies disabled' items={hobbies} value={data.hobbiesDisabled} labelKey='name' okText='OK' onValueChange={(v) => updateData('hobbiesDisabled', v)} disabled={true} />
          <SelectField multiple={true} label='Hobbies required' items={hobbies} value={data.hobbiesRequired} labelKey='name' okText='OK' onValueChange={(v) => updateData('hobbiesRequired', v)} required={true} />
          <SelectField multiple={true} label='Hobbies required disabled' items={hobbies} value={data.hobbiesRequiredDisabled} labelKey='name' okText='OK' onValueChange={(v) => updateData('hobbiesRequiredDisabled', v)} required={true} disabled={true} />
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

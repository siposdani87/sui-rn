import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { CheckboxField, IconToggleField, Label, RadioButtonField, SwitchField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function CheckboxesScreen() {
  const [data, setData] = useState({
    isPrivate: false,
    isBanned: false,
    isDeleted: false,
    radioButtons: null,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        isPrivate: true,
        isBanned: true,
        isDeleted: true,
        radioButtons: 'yes',
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
          <Label text='Do you use radio buttons?' />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RadioButtonField label='Yes' value={data.radioButtons} trueValue='yes' onValueChange={(v) => updateData('radioButtons', v)} />
          <RadioButtonField label='No' value={data.radioButtons} trueValue='no' onValueChange={(v) => updateData('radioButtons', v)} />
          </View>
          <CheckboxField label='Private profile' value={data.isPrivate} onValueChange={(v) => updateData('isPrivate', v)} />

          <SwitchField label='Banned profile' value={data.isBanned} onValueChange={(v) => updateData('isBanned', v)} />

          <IconToggleField label='Deleted profile' value={data.isDeleted} onValueChange={(v) => updateData('isDeleted', v)} checkedIcon='check-circle' uncheckedIcon='highlight-off' />
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
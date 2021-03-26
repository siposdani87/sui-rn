import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TextAreaField } from '../../src/components';
import { StatusBar } from 'expo-status-bar';

export default function RichEditorsScreen() {
  const [data, setData] = useState({
    bio: '',
    bioDisabled: '',
    bioRequired: '',
    bioRequiredDisabled: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        bio: '<p>0 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p><p>1 Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
        bioDisabled: '<p>Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
        bioRequired: '',
        bioRequiredDisabled: '',
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
          <TextAreaField label='About' value={data.bio} onValueChange={(v) => updateData('bio', v)} richText={true} />
          <TextAreaField label='About disabled' value={data.bioDisabled} onValueChange={(v) => updateData('bioDisabled', v)} richText={true} disabled={true} />
          <TextAreaField label='About required' value={data.bioRequired} onValueChange={(v) => updateData('bioRequired', v)} richText={true} required={true} />
          <TextAreaField label='About required disabled' value={data.bioRequiredDisabled} onValueChange={(v) => updateData('bioRequiredDisabled', v)} richText={true} required={true} disabled={true} />
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

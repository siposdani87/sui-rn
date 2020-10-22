import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, CheckboxField, ColorField, DatetimeField, EmailField, FileField, IconButton, IconToggleField, Link, LocationField, NoContent, NumberField, PasswordField, PhoneField, SelectField, SliderField, SwitchField, TextAreaField, TextButton, TextField } from './src/components';
import { Colors } from './src/constants';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { setThemeStyles, setThemeColors } from './src/constants';

setThemeStyles('Inter_700Bold', 'Inter_500Medium', 'Inter_400Regular');
setThemeColors(Colors.greenBright, Colors.green, Colors.greenDark, Colors.white, Colors.amberBright, Colors.amber, Colors.amberDark, Colors.white);

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  const [data, setData] = useState({
    profilePicture: { 
      uri: null 
    }, // profilePicture: require('./assets/icon.png'),
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: null,
    height: 0,
    weight: 0,
    birthYear: null,
    currentTime: null,
    location: null,
    about: '',
    bio: '',
    isPrivate: false,
    isBanned: false,
    isDeleted: false,
    favouriteColor: '#673AB7'
  });
  const genders = [
    { name: 'Male', id: 'MALE' },
    { name: 'Female', id: 'FEMALE' },
    { name: 'Other', id: 'OTHER' },
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        profilePicture: {
          uri: 'https://www.gravatar.com/avatar/0?s=200&d=robohash&f=y'
        },
        name: 'Sipos Dániel',
        email: 'siposdani87@hotmail.com',
        password: '',
        phone: '+36 20 952 0471',
        gender: 'MALE',
        height: 178,
        weight: 92,
        birthYear: 1987,
        currentTime: new Date().toISOString(),
        location: {
          address: 'Öttevény',
          latitude: 47.74,
          longitude: 17.43,
        },
        about: 'About me it is not a long text!',
        bio: '<p>Az egy <b>gyors</b> szövege nem <i>számolok</i> ilyennel.</p><p>Második <u>bekezdés</u>, sokkal több információ kér ki ide!</p>',
        isPrivate: true,
        isBanned: true,
        isDeleted: true,
        favouriteColor: '#673AB7',
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

  function onSearch(v){
    console.log('onSerach', v);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.baseContainer}>
          <StatusBar style='dark' />
          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View style={styles.container}>
              <Link onPress={() => { }} title='Open new link' />

              <NoContent text='No content yet!' imageSource={{ uri: 'https://www.gravatar.com/avatar/0?s=200&d=identicon&f=y' }} />

              <FileField label='Profile picture' value={data.profilePicture} mimeType='image/*' error={null} onValueChange={(v) => updateData('profilePicture', v)} />
              
              <TextField label='Name' value={data.name} error={null} onValueChange={(v) => updateData('name', v)} />

              <EmailField label='Email' value={data.email} error={null} onValueChange={(v) => updateData('email', v)} />

              <PasswordField label='Password' value={data.password} error={null} onValueChange={(v) => updateData('password', v)} required={true} />

              <PhoneField label='Phone' value={data.phone} error={null} onValueChange={(v) => updateData('phone', v)} />

              <SelectField label='Gender' items={genders} value={data.gender} valueKey='id' labelKey='name' error={null} onValueChange={(v) => updateData('genders', v)} required={true} />

              <TextAreaField label='About' value={data.about} error={null} onValueChange={(v) => updateData('about', v)} />

              <TextAreaField label='Bio' value={data.bio} error={null} onValueChange={(v) => updateData('bio', v)} richText={true} />

              <NumberField label='Height' value={data.height} error={null} onValueChange={(v) => updateData('height', v)} />

              <SliderField label='Weight' value={data.weight} error={null} onValueChange={(v) => updateData('weight', v)} minimumValue={0} maximumValue={150} step={1} />

              <LocationField label='Location' value={data.location} error={null} onValueChange={(v) => updateData('location', v)} onSearch={onSearch} longitudeText='Longitude' latitudeText='Latitude' />

              <DatetimeField label='Birth year' mode='year' value={data.birthYear} okText='OK' error={null} onValueChange={(v) => updateData('year', v)} />

              <DatetimeField label='Current datetime' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.currentTime} error={null} onValueChange={(v) => updateData('currentTime', v)} />

              <CheckboxField label='Private profile' value={data.isPrivate} error={null} onValueChange={(v) => updateData('isPrivate', v)} />

              <SwitchField label='Banned profile' value={data.isBanned} error={null} onValueChange={(v) => updateData('isBanned', v)} />

              <IconToggleField label='Deleted profile' value={data.isDeleted} error={null} onValueChange={(v) => updateData('isDeleted', v)} checkedIcon='check-circle' uncheckedIcon='highlight-off' />

              <ColorField label='Favourite color' value={data.favouriteColor} error={null} onValueChange={(v) => updateData('favouriteColor', v)} />
              
              <Button onPress={() => { }} title='Save' />
              <IconButton onPress={() => { }} iconName='save' />
              <TextButton onPress={() => { }} title='Save' />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.white,
  },
  container: {
    padding: 20,
  },
});

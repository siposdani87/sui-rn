import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, CheckboxField, ColorField, DatetimeField, EmailField, FileField, IconButton, IconToggleField, Label, Link, LocationField, NoContent, NumberField, PasswordField, PhoneField, RadioButtonField, SearchField, SelectField, SliderField, SwitchField, TextAreaField, TextButton, TextField } from './src/components';
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
    profilePicture: null,
    logoPicture: require('./assets/icon.png'),
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: null,
    bodyType: null,
    hobbies: [],
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
    favouriteColor: '#673AB7',
    query: '',
    haveFreeTime: null,
  });
  const genders = [
    { name: 'Male', id: 'MALE' },
    { name: 'Female', id: 'FEMALE' },
    { name: 'Other', id: 'OTHER' },
  ];
  const bodyTypes = [
    { name: 'Avarage', id: 'AVARAGE' },
    { name: 'Sportic', id: 'SPORTLIC' },
  ];
  const hobbies = [
    { name: 'Hunting', id: 'HUNTING' },
    { name: 'Sport', id: 'SPORT' },
    { name: 'Gardening', id: 'GARDENING' },
    { name: 'Play games', id: 'PLAY_GAMES' },
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        profilePicture: 'https://www.gravatar.com/avatar/0?s=200&d=robohash&f=y',
        logoPicture: {
          uri: null
        },
        name: 'Sipos Dániel',
        email: 'siposdani87@hotmail.com',
        password: '',
        phone: '+36 20 952 0471',
        gender: 'MALE',
        bodyType: null,
        hobbies: [],
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
        favouriteColor: Colors.lightBlue,
        query: '',
        haveFreeTime: 'yes',
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

              {/*   <FileField label='Logo picture' value={data.logoPicture} mimeType='image/*' onValueChange={(v) => updateData('logoPicture', v)} />
 */}
              <FileField label='Profile picture' value={{ uri: data.profilePicture }} mimeType='image/*' onValueChange={(v) => updateData('profilePicture', v)} />

              <TextField label='Name' value={data.name} onValueChange={(v) => updateData('name', v)} />

              <EmailField label='Email' value={data.email} onValueChange={(v) => updateData('email', v)} />

              <PasswordField label='Password' value={data.password} onValueChange={(v) => updateData('password', v)} required={true} />

              <PhoneField label='Phone' value={data.phone} onValueChange={(v) => updateData('phone', v)} />

              <SelectField label='Gender' items={genders} value={data.gender} valueKey='id' labelKey='name' okText='OK' onValueChange={(v) => updateData('gender', v)} required={true} />

              <SelectField label='Body type' items={bodyTypes} value={data.bodyType} valueKey='id' labelKey='name' okText='OK' onValueChange={(v) => updateData('bodyType', v)} placeholder='Please select...' />

              <SelectField multiple={true} label='Hobbies' items={hobbies} value={data.hobbies} valueKey='id' labelKey='name' okText='OK' onValueChange={(v) => updateData('hobbies', v)} required={true} placeholder='Please select...' />

              <TextAreaField label='About' value={data.about} onValueChange={(v) => updateData('about', v)} />

              <TextAreaField label='Bio' value={data.bio} onValueChange={(v) => updateData('bio', v)} richText={true} />

              <NumberField label='Height' value={data.height} onValueChange={(v) => updateData('height', v)} />

              <SliderField label='Weight' value={data.weight} onValueChange={(v) => updateData('weight', v)} minimumValue={0} maximumValue={150} step={1} />

              <LocationField label='Location' value={data.location} onValueChange={(v) => updateData('location', v)} onSearch={onSearch} longitudeText='Longitude' latitudeText='Latitude' />

              <DatetimeField label='Birth year' mode='year' format='YYYY.' value={data.birthYear} okText='OK' onValueChange={(v) => updateData('year', v)} />

              <DatetimeField label='Current datetime' mode='datetime' format='YYYY. MM. DD., HH:mm' okText='OK' value={data.currentTime} onValueChange={(v) => updateData('currentTime', v)} />

              <Label text='Do you have free time?' />
              <RadioButtonField label='Yes' value={data.haveFreeTime} trueValue='yes' onValueChange={(v) => updateData('haveFreeTime', v)} />
              <RadioButtonField label='No' value={data.haveFreeTime} trueValue='no' onValueChange={(v) => updateData('haveFreeTime', v)} />

              <CheckboxField label='Private profile' value={data.isPrivate} onValueChange={(v) => updateData('isPrivate', v)} />

              <SwitchField label='Banned profile' value={data.isBanned} onValueChange={(v) => updateData('isBanned', v)} />

              <IconToggleField label='Deleted profile' value={data.isDeleted} onValueChange={(v) => updateData('isDeleted', v)} checkedIcon='check-circle' uncheckedIcon='highlight-off' />

              <ColorField label='Favourite color' value={data.favouriteColor} onValueChange={(v) => updateData('favouriteColor', v)} okText='OK' />

              <SearchField label='Search' value={data.query} placeholder='keywords...' onValueChange={(v) => updateData('query', v)} />

              <View>
                <Button onPress={() => { }} iconName='save' title='long title with save icon and more text' iconColor={Colors.amber} textColor={Colors.white} backgroundColor={Colors.deepPurple} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button onPress={() => { }} title='Save' />
                <Button onPress={() => { }} iconName='save' />
                <Button onPress={() => { }} title='Save' imageSource={require('./assets/favicon.png')} />
                <Button onPress={() => { }} iconName='save' title='Save' />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <IconButton onPress={() => { }} iconName='save' />
                <IconButton onPress={() => { }} imageSource={require('./assets/favicon.png')} borderColor={Colors.primary} />
                <IconButton onPress={() => { }} iconName='save' iconColor={Colors.primary} borderColor={Colors.primary} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextButton onPress={() => { }} title='Save' />
                <TextButton onPress={() => { }} title='Save' textColor={Colors.accent} />
                <TextButton onPress={() => { }} title='Save' textColor={Colors.primary} borderColor={Colors.primary} />
              </View>
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

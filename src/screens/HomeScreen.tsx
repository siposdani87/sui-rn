import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import { TextButton } from '../components';

export default function HomeScreen({ navigation }) {
    return (
        <Fragment>
            <StatusBar style='dark' />
            <ScrollView>
                <View>
                    <TextButton title='Buttons' onPress={() => navigation.navigate('Buttons')} />
                    <TextButton title='Checkboxes' onPress={() => navigation.navigate('Checkboxes')} />
                    <TextButton title='Colors' onPress={() => navigation.navigate('Colors')} />
                    <TextButton title='Datetimes' onPress={() => navigation.navigate('Datetimes')} />
                    <TextButton title='Files' onPress={() => navigation.navigate('Files')} />
                    <TextButton title='Locations' onPress={() => navigation.navigate('Locations')} />
                    <TextButton title='Others' onPress={() => navigation.navigate('Others')} />
                    <TextButton title='RichEditors' onPress={() => navigation.navigate('RichEditors')} />
                    <TextButton title='Selects' onPress={() => navigation.navigate('Selects')} />
                    <TextButton title='Sliders' onPress={() => navigation.navigate('Sliders')} />
                    <TextButton title='Textareas' onPress={() => navigation.navigate('Textareas')} />
                    <TextButton title='Texts' onPress={() => navigation.navigate('Texts')} />
                    <TextButton title='Dialogs' onPress={() => navigation.navigate('Dialogs')} />
                    <TextButton title='Flashes' onPress={() => navigation.navigate('Flashes')} />
                </View>
            </ScrollView>
        </Fragment>
    );
}

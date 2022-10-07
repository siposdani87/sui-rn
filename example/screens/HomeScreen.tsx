import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import { TextButton } from '@siposdani87/sui-rn';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../Router';

type ScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<ScreenNavigationProp>();
    return (
        <Fragment>
            <StatusBar style="light" />
            <ScrollView>
                <View>
                    <TextButton
                        title="Buttons"
                        onPress={() => navigation.navigate('Buttons')}
                    />
                    <TextButton
                        title="Checkboxes"
                        onPress={() => navigation.navigate('Checkboxes')}
                    />
                    <TextButton
                        title="Colors"
                        onPress={() => navigation.navigate('Colors')}
                    />
                    <TextButton
                        title="Datetimes"
                        onPress={() => navigation.navigate('Datetimes')}
                    />
                    <TextButton
                        title="Files"
                        onPress={() => navigation.navigate('Files')}
                    />
                    <TextButton
                        title="Locations"
                        onPress={() => navigation.navigate('Locations')}
                    />
                    <TextButton
                        title="Others"
                        onPress={() => navigation.navigate('Others')}
                    />
                    <TextButton
                        title="RichEditors"
                        onPress={() => navigation.navigate('RichEditors')}
                    />
                    <TextButton
                        title="Selects"
                        onPress={() => navigation.navigate('Selects')}
                    />
                    <TextButton
                        title="Sliders"
                        onPress={() => navigation.navigate('Sliders')}
                    />
                    <TextButton
                        title="Textareas"
                        onPress={() => navigation.navigate('Textareas')}
                    />
                    <TextButton
                        title="Texts"
                        onPress={() => navigation.navigate('Texts')}
                    />
                    <TextButton
                        title="Dialogs"
                        onPress={() => navigation.navigate('Dialogs')}
                    />
                    <TextButton
                        title="Flashes"
                        onPress={() => navigation.navigate('Flashes')}
                    />
                    <TextButton
                        title="Confirms"
                        onPress={() => navigation.navigate('Confirms')}
                    />
                    <TextButton
                        title="FlatList"
                        onPress={() => navigation.navigate('FlatList')}
                    />
                    <TextButton
                        title="Tabs"
                        onPress={() => navigation.navigate('Tabs')}
                    />
                </View>
            </ScrollView>
        </Fragment>
    );
}

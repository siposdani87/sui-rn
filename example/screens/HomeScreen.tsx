import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { TextButton } from '@siposdani87/sui-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../utils/Router';

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    return (
        <>
            <StatusBar />
            <ScrollView>
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
                    title="RichTextAreas"
                    onPress={() => navigation.navigate('RichTextAreas')}
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
                    title="TextAreas"
                    onPress={() => navigation.navigate('TextAreas')}
                />
                <TextButton
                    title="Inputs"
                    onPress={() => navigation.navigate('Inputs')}
                />
                <TextButton
                    title="Dialogs"
                    onPress={() => navigation.navigate('Dialogs')}
                />
            </ScrollView>
        </>
    );
}

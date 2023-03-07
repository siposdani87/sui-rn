import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtonsScreen from '../screens/ButtonsScreen';
import OthersScreen from '../screens/OthersScreen';
import HomeScreen from '../screens/HomeScreen';
import TextAreasScreen from '../screens/TextAreasScreen';
import CheckboxesScreen from '../screens/CheckboxesScreen';
import DateTimesScreen from '../screens/DateTimesScreen';
import FilesScreen from '../screens/FilesScreen';
import SelectsScreen from '../screens/SelectsScreen';
import InputsScreen from '../screens/InputsScreen';
import LocationsScreen from '../screens/LocationsScreen';
import ColorsScreen from '../screens/ColorsScreen';
import SlidersScreen from '../screens/SlidersScreen';
import RichTextAreasScreen from '../screens/RichTextAreasScreen';
import DialogsScreen from '../screens/DialogsScreen';

const Stack = createNativeStackNavigator();

export type StackParamList = {
    Buttons: undefined;
    Checkboxes: undefined;
    Colors: undefined;
    Datetimes: undefined;
    Files: undefined;
    Home: undefined;
    Locations: undefined;
    Others: undefined;
    RichTextAreas: undefined;
    Selects: undefined;
    Sliders: undefined;
    TextAreas: undefined;
    Inputs: undefined;
    Dialogs: undefined;
};

export default function Router() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Buttons" component={ButtonsScreen} />
            <Stack.Screen name="Checkboxes" component={CheckboxesScreen} />
            <Stack.Screen name="Colors" component={ColorsScreen} />
            <Stack.Screen name="Datetimes" component={DateTimesScreen} />
            <Stack.Screen name="Files" component={FilesScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Locations" component={LocationsScreen} />
            <Stack.Screen name="Others" component={OthersScreen} />
            <Stack.Screen name="RichTextAreas" component={RichTextAreasScreen} />
            <Stack.Screen name="Selects" component={SelectsScreen} />
            <Stack.Screen name="Sliders" component={SlidersScreen} />
            <Stack.Screen name="TextAreas" component={TextAreasScreen} />
            <Stack.Screen name="Inputs" component={InputsScreen} />
            <Stack.Screen name="Dialogs" component={DialogsScreen} />
        </Stack.Navigator>
    );
}

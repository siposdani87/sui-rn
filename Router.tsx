import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonsScreen from './src/screens/ButtonsScreen';
import OthersScreen from './src/screens/OthersScreen';
import HomeScreen from './src/screens/HomeScreen';
import TextareasScreen from './src/screens/TextareasScreen';
import CheckboxesScreen from './src/screens/CheckboxesScreen';
import DatetimesScreen from './src/screens/DatetimesScreen';
import FilesScreen from './src/screens/FilesScreen';
import SelectsScreen from './src/screens/SelectsScreen';
import TextsScreen from './src/screens/TextsScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import ColorsScreen from './src/screens/ColorsScreen';
import SlidersScreen from './src/screens/SlidersScreen';
import RichEditorsScreen from './src/screens/RichEditorsScreen';
import DialogsScreen from './src/screens/DialogsScreen';
import FlashesScreen from './src/screens/FlashesScreen';
import ConfirmsScreen from './src/screens/ConfirmsScreen';

const Stack = createStackNavigator();

export default function Router() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Buttons' component = { ButtonsScreen } />
            <Stack.Screen name='Checkboxes' component = { CheckboxesScreen } />
            <Stack.Screen name='Colors' component = { ColorsScreen } />
            <Stack.Screen name='Datetimes' component = { DatetimesScreen } />
            <Stack.Screen name='Files' component = { FilesScreen } />
            <Stack.Screen name='Home' component = { HomeScreen } />
            <Stack.Screen name='Locations' component = { LocationsScreen } />
            <Stack.Screen name='Others' component = { OthersScreen } />
            <Stack.Screen name='RichEditors' component = { RichEditorsScreen } />
            <Stack.Screen name='Selects' component = { SelectsScreen } />
            <Stack.Screen name='Sliders' component = { SlidersScreen } />
            <Stack.Screen name='Textareas' component = { TextareasScreen } />
            <Stack.Screen name='Texts' component = { TextsScreen } />
            <Stack.Screen name='Dialogs' component = { DialogsScreen } />
            <Stack.Screen name='Flashes' component = { FlashesScreen } />
            <Stack.Screen name='Confirms' component = { ConfirmsScreen } />
        </Stack.Navigator>
    );
}

import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }){
    return (
        <View>
            <Button title='Buttons' onPress={() => navigation.navigate('Buttons')} />
            <Button title='Checkboxes' onPress={() => navigation.navigate('Checkboxes')} />
            <Button title='Colors' onPress={() => navigation.navigate('Colors')} />
            <Button title='Datetimes' onPress={() => navigation.navigate('Datetimes')} />
            <Button title='Files' onPress={() => navigation.navigate('Files')} />
            <Button title='Locations' onPress={() => navigation.navigate('Locations')} />
            <Button title='Others' onPress={() => navigation.navigate('Others')} />
            <Button title='RichEditors' onPress={() => navigation.navigate('RichEditors')} />
            <Button title='Selects' onPress={() => navigation.navigate('Selects')} />
            <Button title='Sliders' onPress={() => navigation.navigate('Sliders')} />
            <Button title='Textareas' onPress={() => navigation.navigate('Textareas')} />
            <Button title='Texts' onPress={() => navigation.navigate('Texts')} />
            <Button title='Dialogs' onPress={() => navigation.navigate('Dialogs')} />
        </View>
    );
}

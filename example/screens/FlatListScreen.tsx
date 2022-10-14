import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, Styles } from '@siposdani87/sui-rn';

type Item = {
    id: string;
    name: string;
}

export default function FlatListScreen() {
    const [items, setItems] = useState<Item[]>([]);
    const refreshing = false;

    const keyExtractor = (item: Item) => {
        return item.id;
    };

    const renderItem = ({ item }: { item: Item }) => (
        <View style={[styles.card, Styles.shadow]}>
            <Text>{item.name}</Text>
        </View>
    );

    const onEndReached = () => {

    };

    const onRefresh = () => {

    };

    useEffect(() => {
        const newItems: Item[] = [];
        for (let i = 0; i < 30; i++) {
            newItems.push({
                id: i.toString(),
                name: `Item-${i}`,
            });
        }

        setItems(newItems);
    }, []);

    return (
        <FlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            refreshText='Loading...'
            noContentText='No content yet!'
            noContentImageSource={require('../assets/icon.png')}
        ></FlatList>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 45,
        paddingHorizontal: 25,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    }
});

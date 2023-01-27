import React from 'react';
import { NoContent } from './NoContent';
import { ImageSourcePropType, View, StyleSheet, Text } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

const config = {
    progressViewOffset: -1000,
    onEndReachedThreshold: 0.5,
};

export function FlatList<T>(props: {
    data: T[];
    keyExtractor?: (_item: T, _index: number) => string;
    renderItem: ListRenderItem<T>;
    numColumns?: number;
    refreshing: boolean;
    onRefresh: () => void;
    onEndReached: () => void;
    refreshText: string;
    noContentText: string;
    noContentImageSource: ImageSourcePropType;
}) {
    const onRefresh = (): void => {
        if (!props.refreshing) {
            props.onRefresh();
        }
    };

    const onEndReached = (): void => {
        if (!props.refreshing) {
            props.onEndReached();
        }
    };

    return (
        <View style={styles.base}>
            <FlashList
                data={props.data}
                keyExtractor={props.keyExtractor}
                renderItem={props.renderItem}
                numColumns={props.numColumns}
                horizontal={false}
                progressViewOffset={config.progressViewOffset}
                onEndReachedThreshold={config.onEndReachedThreshold}
                ListEmptyComponent={
                    <NoContent
                        imageSource={props.noContentImageSource}
                        text={props.noContentText}
                    />
                }
                refreshing={props.refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                estimatedItemSize={200}
                refreshControl={<Text>{props.refreshText}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
});

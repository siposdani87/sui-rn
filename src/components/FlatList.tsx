import React, { useState } from 'react';
import NoContent from './NoContent';
import { FlatList as RNFlatList, ImageSourcePropType, ListRenderItem, Platform, RefreshControl, View } from 'react-native';

const config = {
    progressViewOffset: -1000,
    onEndReachedThreshold: 0.5,
};

export default function FlatList(props: { data: any[], keyExtractor?: (_item: any, _index: number) => string, renderItem: ListRenderItem<any>, refreshing: boolean, onRefresh: () => void, onEndReached: () => void, refreshText: string, noContentText: string, noContentImageSource: ImageSourcePropType }) {
    const [flatListReady, setFlatListReady] = useState(false);

    function onRefresh() {
        // console.log('onRefresh->refreshing', props.refreshing);
        if (!props.refreshing) {
            // console.log('onRefresh', state.flatListReady);
            setFlatListReady(false);
            props.onRefresh();
        }
    }

    function onEndReached() {
        // console.log('onEndReached->refreshing', props.refreshing);
        if (!props.refreshing) {
            // console.log('onEndReached', state.flatListReady);
            if (flatListReady) {
                setFlatListReady(false);
                props.onEndReached();
            }
        }
    }

    function onScrollEndDrag() {
        // console.log('onScrollEndDrag');
        setFlatListReady(true);
    }

    function getListEmptyComponent() {
        return (
            <NoContent imageSource={props.noContentImageSource} text={props.noContentText} />
        );
    }

    function getRefreshControl() {
        return (
            <RefreshControl refreshing={false} onRefresh={onRefresh} title={props.refreshText} tintColor='transparent' />
        );
    }

    return (
        <View style={{ marginTop: -10 }}>
            <RNFlatList data={props.data} keyExtractor={props.keyExtractor} renderItem={props.renderItem} numColumns={1} ListHeaderComponentStyle={{ height: 0, margin: 0, padding: 0 }} removeClippedSubviews={true} maxToRenderPerBatch={2} style={{ marginTop: 10 }} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={getListEmptyComponent()} refreshing={props.refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onScrollEndDrag={onScrollEndDrag} refreshControl={Platform.OS === 'ios' ? getRefreshControl(): null} />
        </View>
    );
}

import React, { useState } from 'react';
import NoContent from '../common/NoContent';
import { FlatList as ReactNativeFlatList, Platform, ImageSourcePropType, ListRenderItem } from 'react-native';

const config = {
    progressViewOffset: -1000,
    ...Platform.select({
        android: {
            onEndReachedThreshold: 0.5,
        },
        ios: {
            onEndReachedThreshold: 0,
        },
    }),
};

export default function FlatList(props: { data: any[], keyExtractor?: (item: any, index: number) => string, renderItem: ListRenderItem<any>, refreshing: boolean, onRefresh: () => void, onEndReached: () => void, noContentText: string, noContentImageSource: ImageSourcePropType }) {
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

    return (
        <ReactNativeFlatList {...props} removeClippedSubviews={true} maxToRenderPerBatch={2} style={{ marginTop: 10 }} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={getListEmptyComponent()} refreshing={props.refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onScrollEndDrag={onScrollEndDrag} />
    );
}

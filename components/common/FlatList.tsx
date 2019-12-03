import React, { useState } from 'react';
import NoContent from '../common/NoContent';
import { FlatList as ReactNativeFlatList, Platform } from 'react-native';

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

export default function FlatList(props) {
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

    return (
        <ReactNativeFlatList {...props} removeClippedSubviews={true} maxToRenderPerBatch={2} style={{ marginTop: 10 }} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={<NoContent source={props.noContentSource} text={props.noContentText} />} refreshing={props.refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onScrollEndDrag={onScrollEndDrag} />
    );
}

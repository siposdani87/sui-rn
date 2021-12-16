import React, { useState } from 'react';
import NoContent from './NoContent';
import { FlatList as RNFlatList, Platform, RefreshControl, View, } from 'react-native';
const config = {
    progressViewOffset: -1000,
    onEndReachedThreshold: 0.5,
};
export default function FlatList(props) {
    const [flatListReady, setFlatListReady] = useState(false);
    const onRefresh = () => {
        // console.log('onRefresh->refreshing', props.refreshing);
        if (!props.refreshing) {
            // console.log('onRefresh', state.flatListReady);
            setFlatListReady(false);
            props.onRefresh();
        }
    };
    const onEndReached = () => {
        // console.log('onEndReached->refreshing', props.refreshing);
        if (!props.refreshing) {
            // console.log('onEndReached', state.flatListReady);
            if (flatListReady) {
                setFlatListReady(false);
                props.onEndReached();
            }
        }
    };
    const onScrollEndDrag = () => {
        // console.log('onScrollEndDrag');
        setFlatListReady(true);
    };
    const getListEmptyComponent = () => {
        return (<NoContent imageSource={props.noContentImageSource} text={props.noContentText} containerStyle={{ marginTop: 10 }}/>);
    };
    const getRefreshControl = () => {
        return (<RefreshControl refreshing={false} onRefresh={onRefresh} title={props.refreshText} tintColor="transparent"/>);
    };
    return (<View style={{ marginTop: -10 }}>
            <RNFlatList data={props.data} keyExtractor={props.keyExtractor} renderItem={props.renderItem} numColumns={props.numColumns} columnWrapperStyle={props.columnWrapperStyle} horizontal={false} ListHeaderComponentStyle={{ height: 0, margin: 0, padding: 0 }} removeClippedSubviews={true} style={{ marginTop: 10 }} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={getListEmptyComponent()} refreshing={props.refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onScrollEndDrag={onScrollEndDrag} refreshControl={Platform.OS === 'ios' ? getRefreshControl() : undefined}/>
        </View>);
}
//# sourceMappingURL=FlatList.js.map
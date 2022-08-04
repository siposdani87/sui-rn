import React, { useState } from 'react';
import { NoContent } from './NoContent';
import { Platform, RefreshControl, View, StyleSheet, } from 'react-native';
import { FlashList } from '@shopify/flash-list';
const config = {
    progressViewOffset: -1000,
    onEndReachedThreshold: 0.5,
};
export function FlatList(props) {
    const [flatListReady, setFlatListReady] = useState(false);
    const onRefresh = () => {
        if (!props.refreshing) {
            setFlatListReady(false);
            props.onRefresh();
        }
    };
    const onEndReached = () => {
        if (!props.refreshing) {
            if (flatListReady) {
                setFlatListReady(false);
                props.onEndReached();
            }
        }
    };
    const onScrollEndDrag = () => {
        setFlatListReady(true);
    };
    const getListEmptyComponent = () => {
        return (<NoContent imageSource={props.noContentImageSource} text={props.noContentText} containerStyle={styles.container}/>);
    };
    const getRefreshControl = () => {
        return (<RefreshControl refreshing={false} onRefresh={onRefresh} title={props.refreshText} tintColor="transparent"/>);
    };
    return (<View style={styles.base}>
            <FlashList data={props.data} keyExtractor={props.keyExtractor} renderItem={props.renderItem} numColumns={props.numColumns} 
    // columnWrapperStyle={props.columnWrapperStyle}
    horizontal={false} ListHeaderComponentStyle={styles.listHeaderComponent} removeClippedSubviews={true} style={styles.container} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={getListEmptyComponent()} refreshing={props.refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onScrollEndDrag={onScrollEndDrag} refreshControl={Platform.OS === 'ios' ? getRefreshControl() : undefined} estimatedItemSize={200}/>
        </View>);
}
const styles = StyleSheet.create({
    base: {
        marginTop: -10,
    },
    container: {
        marginTop: 10,
    },
    listHeaderComponent: {
        height: 0,
        margin: 0,
        padding: 0,
    },
});
//# sourceMappingURL=FlatList.js.map
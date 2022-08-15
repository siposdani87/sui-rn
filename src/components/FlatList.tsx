import React, { useState } from 'react';
import { NoContent } from './NoContent';
import {
    ImageSourcePropType,
    Platform,
    RefreshControl,
    View,
    StyleSheet,
    FlatList as RNFlatList,
    ListRenderItem,
} from 'react-native';
// import { FlashList, ListRenderItem } from '@shopify/flash-list';

const config = {
    progressViewOffset: -1000,
    onEndReachedThreshold: 0.5,
};

export function FlatList(props: {
    data: any[];
    keyExtractor?: (_item: any, _index: number) => string;
    renderItem: ListRenderItem<any>;
    numColumns?: number;
    columnWrapperStyle?: any;
    refreshing: boolean;
    onRefresh: () => void;
    onEndReached: () => void;
    refreshText: string;
    noContentText: string;
    noContentImageSource: ImageSourcePropType;
}): JSX.Element {
    const [flatListReady, setFlatListReady] = useState<boolean>(false);

    const onRefresh = (): void => {
        if (!props.refreshing) {
            setFlatListReady(false);
            props.onRefresh();
        }
    };

    const onEndReached = (): void => {
        if (!props.refreshing) {
            if (flatListReady) {
                setFlatListReady(false);
                props.onEndReached();
            }
        }
    };

    const onScrollEndDrag = (): void => {
        setFlatListReady(true);
    };

    const getListEmptyComponent = (): JSX.Element => {
        return (
            <NoContent
                imageSource={props.noContentImageSource}
                text={props.noContentText}
                containerStyle={styles.container}
            />
        );
    };

    const getRefreshControl = (): JSX.Element => {
        return (
            <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                title={props.refreshText}
                tintColor="transparent"
            />
        );
    };

    return (
        <View style={styles.base}>
            <RNFlatList
                data={props.data}
                keyExtractor={props.keyExtractor}
                renderItem={props.renderItem}
                numColumns={props.numColumns}
                columnWrapperStyle={props.columnWrapperStyle}
                horizontal={false}
                ListHeaderComponentStyle={styles.listHeaderComponent}
                removeClippedSubviews={true}
                style={styles.container}
                progressViewOffset={config.progressViewOffset}
                onEndReachedThreshold={config.onEndReachedThreshold}
                ListEmptyComponent={getListEmptyComponent()}
                refreshing={props.refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onScrollEndDrag={onScrollEndDrag}
                refreshControl={
                    Platform.OS === 'ios' ? getRefreshControl() : undefined
                }
                // estimatedItemSize={200}
            />
        </View>
    );
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

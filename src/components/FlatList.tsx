import React from 'react';
import { NoContent } from './NoContent';
import {
    ImageSourcePropType,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
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
    columnWrapperStyle?: StyleProp<ViewStyle>;
    refreshing: boolean;
    onRefresh: () => void;
    onEndReached: () => void;
    refreshText: string;
    noContentText: string;
    noContentImageSource: ImageSourcePropType;
}) {
    // const [flatListReady, setFlatListReady] = useState<boolean>(false);

    const onRefresh = (): void => {
        if (!props.refreshing) {
            // setFlatListReady(false);
            props.onRefresh();
        }
    };

    const onEndReached = (): void => {
        if (!props.refreshing) {
            // if (flatListReady) {
            // setFlatListReady(false);
            props.onEndReached();
            // }
        }
    };

    // const onScrollEndDrag = (): void => {
    // setFlatListReady(true);
    // };

    /* const getRefreshControl = (): ReactNode => {
        return (
            <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                title={props.refreshText}
                tintColor="transparent"
            />
        );
    }; */

    return (
        <View style={styles.base}>
            <FlashList
                data={props.data}
                keyExtractor={props.keyExtractor}
                renderItem={props.renderItem}
                numColumns={props.numColumns}
                // columnWrapperStyle={props.columnWrapperStyle}
                horizontal={false}
                // ListHeaderComponentStyle={styles.listHeaderComponent}
                // removeClippedSubviews={true}
                // style={styles.container}
                progressViewOffset={config.progressViewOffset}
                onEndReachedThreshold={config.onEndReachedThreshold}
                ListEmptyComponent={
                    <NoContent
                        imageSource={props.noContentImageSource}
                        text={props.noContentText}
                        // containerStyle={styles.container}
                    />
                }
                refreshing={props.refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                // onScrollEndDrag={onScrollEndDrag}
                /* refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        title={props.refreshText}
                        tintColor="transparent"
                    />
                } */
                estimatedItemSize={200}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    /* container: {
        marginTop: 10,
    }, */
    /* listHeaderComponent: {
        height: 0,
        margin: 0,
        padding: 0,
    }, */
});

/// <reference types="react" />
import { ImageSourcePropType } from 'react-native';
import { ListRenderItem } from '@shopify/flash-list';
export declare function FlatList<T>(props: {
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
}): JSX.Element;

/// <reference types="react" />
import { ImageSourcePropType } from 'react-native';
import { ListRenderItem } from '@shopify/flash-list';
export declare function FlatList(props: {
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
}): JSX.Element;

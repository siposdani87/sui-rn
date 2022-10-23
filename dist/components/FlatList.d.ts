/// <reference types="react" />
import { ImageSourcePropType, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
export declare function FlatList(props: {
    data: any[];
    keyExtractor?: (_item: any, _index: number) => string;
    renderItem: ListRenderItem<any>;
    numColumns?: number;
    columnWrapperStyle?: StyleProp<ViewStyle>;
    refreshing: boolean;
    onRefresh: () => void;
    onEndReached: () => void;
    refreshText: string;
    noContentText: string;
    noContentImageSource: ImageSourcePropType;
}): JSX.Element;

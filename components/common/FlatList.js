import React from 'react';
import { Platform } from 'react-native';
import NoContent from '../common/NoContent';
import { FlatList as ReactNativeFlatList } from 'react-native';

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

export default class FlatList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flatListReady: true,
        }
    }

    onRefresh = () => {
        // console.log('onRefresh->refreshing', this.props.refreshing);
        if (!this.props.refreshing) {
            // console.log('onRefresh', this.state.flatListReady);
            this.setState({
                flatListReady: false,
            }, () => {
                this.props.onRefresh();
            });
        }
    }

    onEndReached = () => {
        // console.log('onEndReached->refreshing', this.props.refreshing);
        if (!this.props.refreshing) {
            // console.log('onEndReached', this.state.flatListReady);
            if (this.state.flatListReady) {
                this.setState({
                    flatListReady: false,
                }, () => {
                    this.props.onEndReached();
                });
            }
        }
    }

    onScrollEndDrag = () => {
        // console.log('onScrollEndDrag');
        this.setState({
            flatListReady: true,
        });
    }

    render() {
        return (
            <ReactNativeFlatList {...this.props} removeClippedSubviews ref={ref => this.listRef = ref} maxToRenderPerBatch={2} style={{ marginTop: 10 }} progressViewOffset={config.progressViewOffset} onEndReachedThreshold={config.onEndReachedThreshold} ListEmptyComponent={NoContent} refreshing={this.props.refreshing} onRefresh={this.onRefresh} onEndReached={this.onEndReached} onScrollEndDrag={this.onScrollEndDrag} />
        );
    }
}

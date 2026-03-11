import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Dialog } from '../../components/Dialog';

jest.mock('@expo/vector-icons/MaterialIcons', () => {
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: (props: Record<string, unknown>) => (
            <View testID="material-icon" {...props} />
        ),
    };
});

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: (props: Record<string, unknown>) => (
            <View testID="material-community-icon" {...props} />
        ),
    };
});

describe('Dialog', () => {
    it('renders when visible', () => {
        const { toJSON } = render(
            <Dialog visible={true} title="Test Dialog">
                <Text>Dialog content</Text>
            </Dialog>,
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it("doesn't render content when not visible", () => {
        const { toJSON } = render(
            <Dialog visible={false} title="Test Dialog">
                <Text>Dialog content</Text>
            </Dialog>,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

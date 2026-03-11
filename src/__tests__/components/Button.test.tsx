import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../../components/Button';

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

describe('Button', () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
        mockOnPress.mockClear();
    });

    it('renders with title', () => {
        const { toJSON } = render(
            <Button title="Submit" onPress={mockOnPress} />,
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders with icon', () => {
        const { toJSON } = render(
            <Button iconName="add" onPress={mockOnPress} />,
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders disabled state', () => {
        const { toJSON } = render(
            <Button title="Submit" onPress={mockOnPress} disabled={true} />,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

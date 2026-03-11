import React from 'react';
import { render } from '@testing-library/react-native';
import { TextField } from '../../components/TextField';

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

describe('TextField', () => {
    const mockOnValueChange = jest.fn();

    beforeEach(() => {
        mockOnValueChange.mockClear();
    });

    it('renders with label', () => {
        const { toJSON } = render(
            <TextField
                label="Username"
                value=""
                onValueChange={mockOnValueChange}
            />,
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders with error', () => {
        const { toJSON } = render(
            <TextField
                label="Email"
                value=""
                onValueChange={mockOnValueChange}
                error={['Invalid email address']}
            />,
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders with placeholder', () => {
        const { toJSON } = render(
            <TextField
                label="Name"
                value=""
                onValueChange={mockOnValueChange}
                placeholder="Enter your name"
            />,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

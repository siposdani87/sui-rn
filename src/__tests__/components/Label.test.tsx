import React from 'react';
import { render } from '@testing-library/react-native';
import { Label } from '../../components/Label';

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

describe('Label', () => {
    it('renders with text', () => {
        const { toJSON } = render(<Label text="username" />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders required indicator', () => {
        const { toJSON } = render(<Label text="email" required={true} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders with description', () => {
        const { toJSON } = render(
            <Label text="password" desc="Must be at least 8 characters" />,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

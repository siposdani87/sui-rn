import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorField } from '../../components/ErrorField';

describe('ErrorField', () => {
    it('renders null when no error', () => {
        const { toJSON } = render(<ErrorField error={false} />);
        expect(toJSON()).toBeNull();
    });

    it('renders error messages', () => {
        const { toJSON } = render(
            <ErrorField error={['Field is required', 'Must be valid']} />,
        );
        expect(toJSON()).toMatchSnapshot();
    });
});

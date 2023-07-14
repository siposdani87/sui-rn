import React from 'react';
export type ErrorValueType = string[] | boolean | null;
export declare function ErrorField(props: {
    error?: ErrorValueType;
    disabled?: boolean;
}): React.JSX.Element | null;

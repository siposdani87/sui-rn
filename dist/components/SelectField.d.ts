import React from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export declare function SelectField<T, K>(props: BaseFieldProps & {
    items: T[];
    okText: string;
    onSearch?: (value: string) => void;
    placeholder?: string;
    labelKey?: keyof T;
    valueKey?: keyof T;
    searchPlaceholder?: string;
} & ({
    multiple: true;
    value: K[] | null | undefined;
    onValueChange: (value: K[] | null | undefined) => void;
} | {
    multiple?: false;
    value: K | null | undefined;
    onValueChange: (value: K | null | undefined) => void;
})): React.JSX.Element;
//# sourceMappingURL=SelectField.d.ts.map
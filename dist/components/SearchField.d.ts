import React, { ReactNode } from 'react';
import { TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';
export type SearchFieldValueType = TextFieldValueType;
export declare function SearchField(props: BaseFieldProps & {
    value: SearchFieldValueType;
    onValueChange: (value: SearchFieldValueType) => void;
    placeholder?: string;
    actionButtons?: ReactNode[];
}): React.JSX.Element;
//# sourceMappingURL=SearchField.d.ts.map
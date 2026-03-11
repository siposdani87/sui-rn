import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import { TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';
export type EmailFieldValueType = TextFieldValueType;
export declare function EmailField(props: BaseFieldProps & {
    value: EmailFieldValueType;
    onValueChange: (value: EmailFieldValueType) => void;
    actionButtons?: ReactNode[];
} & TextInputProps): React.JSX.Element;
//# sourceMappingURL=EmailField.d.ts.map
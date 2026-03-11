import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import { TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';
export type PasswordFieldValueType = TextFieldValueType;
export declare function PasswordField(props: BaseFieldProps & {
    value: PasswordFieldValueType;
    onValueChange: (value: PasswordFieldValueType) => void;
    actionButtons?: ReactNode[];
} & TextInputProps): React.JSX.Element;
//# sourceMappingURL=PasswordField.d.ts.map
import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import { TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';
export type PhoneFieldValueType = TextFieldValueType;
export declare function PhoneField(props: BaseFieldProps & {
    value: PhoneFieldValueType;
    onValueChange: (value: PhoneFieldValueType) => void;
    actionButtons?: ReactNode[];
} & TextInputProps): React.JSX.Element;
//# sourceMappingURL=PhoneField.d.ts.map
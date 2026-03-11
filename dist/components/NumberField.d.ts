import React, { ReactNode } from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export type NumberFieldValueType = number | null | undefined;
export declare function NumberField(props: BaseFieldProps & {
    value: NumberFieldValueType;
    onValueChange: (value: NumberFieldValueType) => void;
    actionButtons?: ReactNode[];
}): React.JSX.Element;
//# sourceMappingURL=NumberField.d.ts.map
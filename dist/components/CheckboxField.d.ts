import React, { ReactNode } from 'react';
import { IconToggleFieldValueType } from './IconToggleField';
import { BaseFieldProps } from './BaseFieldProps';
export type CheckboxFieldValueType = IconToggleFieldValueType;
export declare function CheckboxField(props: BaseFieldProps & {
    value: CheckboxFieldValueType;
    trueValue?: CheckboxFieldValueType;
    falseValue?: CheckboxFieldValueType;
    onValueChange: (value: CheckboxFieldValueType) => void;
    children?: ReactNode;
}): React.JSX.Element;
//# sourceMappingURL=CheckboxField.d.ts.map
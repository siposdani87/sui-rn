import React, { ReactNode } from 'react';
import { IconToggleFieldValueType } from './IconToggleField';
import { BaseFieldProps } from './BaseFieldProps';
export type RadioButtonFieldField = IconToggleFieldValueType;
export declare function RadioButtonField(props: BaseFieldProps & {
    value: RadioButtonFieldField;
    trueValue?: RadioButtonFieldField;
    falseValue?: RadioButtonFieldField;
    onValueChange: (value: RadioButtonFieldField) => void;
    children?: ReactNode;
}): React.JSX.Element;
//# sourceMappingURL=RadioButtonField.d.ts.map
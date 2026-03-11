import React, { ReactNode } from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export type IconToggleFieldValueType = boolean | string | number | null | undefined;
export declare function IconToggleField(props: BaseFieldProps & {
    value: IconToggleFieldValueType;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: IconToggleFieldValueType;
    falseValue?: IconToggleFieldValueType;
    onValueChange: (value: IconToggleFieldValueType) => void;
    disableUncheck?: boolean;
    children?: ReactNode;
}): React.JSX.Element;
//# sourceMappingURL=IconToggleField.d.ts.map
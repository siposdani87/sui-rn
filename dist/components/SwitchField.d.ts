import React from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export type SwitchFieldValueType = boolean | string | number | null | undefined;
export declare function SwitchField(props: BaseFieldProps & {
    value: SwitchFieldValueType;
    onValueChange: (value: SwitchFieldValueType) => void;
    trueValue?: SwitchFieldValueType;
    falseValue?: SwitchFieldValueType;
}): React.JSX.Element;
//# sourceMappingURL=SwitchField.d.ts.map
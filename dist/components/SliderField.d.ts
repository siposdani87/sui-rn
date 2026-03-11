import React from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export type SliderFieldValueType = number | undefined | null;
export declare function SliderField(props: BaseFieldProps & {
    value: SliderFieldValueType;
    onValueChange: (value: SliderFieldValueType) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
}): React.JSX.Element;
//# sourceMappingURL=SliderField.d.ts.map
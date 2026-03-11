import React, { ReactNode } from 'react';
import { BaseFieldProps } from './BaseFieldProps';
export type TagFieldValueType = string[];
export declare function TagField(props: BaseFieldProps & {
    values: TagFieldValueType;
    onValuesChange: (value: TagFieldValueType) => void;
    onPress?: (_index: number) => void;
    readonly?: boolean;
    placeholder?: string;
    actionButtons?: ReactNode[];
}): React.JSX.Element;
//# sourceMappingURL=TagField.d.ts.map
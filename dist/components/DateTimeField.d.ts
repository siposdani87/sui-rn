import React from 'react';
import { BaseFieldProps } from './BaseFieldProps';
interface Mode {
    format?: string;
    calendarType: string;
    clockType: string;
}
interface Modes {
    'datetime-local': Mode;
    datetime: Mode;
    date: Mode;
    time: Mode;
    month: Mode;
    week: Mode;
    year: Mode;
}
export type DateTimeFieldValueType = Date | string | number | null | undefined;
export declare function DateTimeField(props: BaseFieldProps & {
    mode: keyof Modes;
    value: DateTimeFieldValueType;
    onValueChange: (value: string | null) => void;
    okText: string;
    format: string;
    searchPlaceholder?: string;
}): React.JSX.Element;
export {};
//# sourceMappingURL=DateTimeField.d.ts.map
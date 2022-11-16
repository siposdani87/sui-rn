/// <reference types="react" />
export type ErrorValueType = string[] | boolean | null;
export declare function ErrorField(props: {
    error?: ErrorValueType;
    disabled?: boolean;
}): JSX.Element | null;

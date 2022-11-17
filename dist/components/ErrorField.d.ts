/// <reference types="react" />
export declare type ErrorValueType = string[] | boolean | null;
export declare function ErrorField(props: {
    error?: ErrorValueType;
    disabled?: boolean;
}): JSX.Element | null;

import { Dispatch } from 'react';
export declare class Base {
    static reducer: (state: {} | undefined, action: any) => any;
    protected dispatch: Dispatch<any>;
    constructor(dispatch: Dispatch<any>);
}

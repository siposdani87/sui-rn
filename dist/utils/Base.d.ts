import { Dispatch } from 'react';
export default class Base {
    static reducer: (state: {} | undefined, action: any) => any;
    protected dispatch: Dispatch<any>;
    constructor(dispatch: Dispatch<any>);
}

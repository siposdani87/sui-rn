import { Dispatch } from 'react';

export class Base {
    public static reducer = (state = {}, action: any) => {
        if (action.type) {
            return {
                ...state,
                ...action,
            };
        }
        return state;
    };

    protected dispatch: Dispatch<any>;

    constructor(dispatch: Dispatch<any>) {
        this.dispatch = dispatch;
    }
}

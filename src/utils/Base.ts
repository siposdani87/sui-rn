import { Dispatch } from 'react';

export default class Base {
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

    /* get objects() {
        const methods = {};
        for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const method = this[name];
            if (['constructor'].indexOf(name) === -1 && name[0] !== '_') {
                methods[name] = method;
            }
        }
        return Object.assign(this, methods);
    } */
}

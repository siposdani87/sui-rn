import { Base } from '../utils';

export default class BaseService extends Base {
    protected factories: { [key: string]: any; };

    constructor(dispatch, factories) {
        super(dispatch);
        this.factories = factories;
    }
}

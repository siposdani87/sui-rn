import { Base } from '../utils';

export default class BaseService extends Base {
    constructor(dispatch, factories) {
        super(dispatch);
        this.factories = factories;
    }
}

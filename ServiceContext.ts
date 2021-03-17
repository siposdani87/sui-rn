import React from 'react';
import { ConfirmService, FlashService, HttpService } from './src/services';
import { Base } from './src/utils';

export const ServiceContext = React.createContext(null);

export class Services extends Base {
    public httpService: HttpService;
    public flashService: FlashService;
    public confirmService: ConfirmService;

    constructor(dispatch) {
        super(dispatch);
        this.httpService = new HttpService(dispatch, () => {
            return null;
        }, 'http://localhost:4000', 'hu-HU', null); //.objects;
        this.flashService = new FlashService(dispatch); //.objects;
        this.confirmService = new ConfirmService(dispatch); //.objects;
    }
}

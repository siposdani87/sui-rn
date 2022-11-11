import { createContext, Dispatch } from 'react';
import { ConfirmService, FlashService, HttpService, Base } from '@siposdani87/sui-rn';

export const ServiceContext = createContext<Services|null>(null);

export class Services extends Base {
    public httpService: HttpService;
    public flashService: FlashService;
    public confirmService: ConfirmService;

    constructor(dispatch: Dispatch<any>) {
        super(dispatch);
        this.httpService = new HttpService(
            dispatch,
            () => {
                return Promise.resolve('token');
            },
            'http://localhost:4000',
            'hu-HU',
            '',
        );
        this.flashService = new FlashService(dispatch);
        this.confirmService = new ConfirmService(dispatch);
    }
}

import { createContext, Dispatch } from 'react';
import { ConfirmService, FlashService, HttpService } from '@siposdani87/sui-rn/dist/services';
import { Base } from '@siposdani87/sui-rn/dist/utils';

export const ServiceContext = createContext<Services|null>(null);

export class Services extends Base {
    public httpService: HttpService;
    public flashService: FlashService;
    public confirmService: ConfirmService;

    constructor(dispatch: Dispatch<any>) {
        super(dispatch);
        this.httpService = new HttpService(
            dispatch,
            async () => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            },
            'http://localhost:4000',
            'hu-HU',
            '',
        );
        this.flashService = new FlashService(dispatch);
        this.confirmService = new ConfirmService(dispatch);
    }
}

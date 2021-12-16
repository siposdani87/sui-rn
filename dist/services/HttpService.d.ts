import { Dispatch } from 'react';
import { Base } from '../utils';
import { Data, Params, Headers } from '../utils/Fetch';
export default class HttpService extends Base {
    private getTokenAsync;
    private inprogress;
    private language;
    private secret;
    private fetch;
    constructor(dispatch: Dispatch<any>, getTokenAsync: () => Promise<any>, backendUrl: string, language: string, secret: string);
    getUrl(url: string, opt_params?: Params): string;
    isInprogress(): boolean;
    get(url: string, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    post(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    put(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    patch(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    delete(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    private _getHeaders;
    private _handleResponse;
    private _statusHandler;
    private _setInprogress;
}

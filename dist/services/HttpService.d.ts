import { Dispatch } from 'react';
import { Objekt } from '@siposdani87/sui-js';
import { Base } from '../utils';
import { Data, Params, Headers } from '../utils/Fetch';
export interface DataResponse extends Objekt {
}
export declare class HttpService extends Base {
    private getTokenAsync;
    private progressCounter;
    private language;
    private secret;
    private fetch;
    constructor(dispatch: Dispatch<any>, getTokenAsync: () => Promise<string | null>, backendUrl: string, language: string, secret: string);
    getUrl(url: string, opt_params?: Params): string;
    isInprogress(): boolean;
    get(url: string, opt_params?: Params, opt_headers?: Headers): Promise<DataResponse>;
    post(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<DataResponse>;
    put(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<DataResponse>;
    patch(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<DataResponse>;
    delete(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<DataResponse>;
    private _getHeaders;
    private _handleResponse;
    private _statusHandler;
    private _setInprogress;
}

import { Dispatch } from 'react';
import { Objekt } from '@siposdani87/sui-js';
import {
    HTTP_401,
    HTTP_403,
    HTTP_REQUEST,
    HTTP_RESPONSE,
} from '../constants/ActionTypes';
import { Base, Fetch } from '../utils';
import { Data, Params, Headers, HttpResponse } from '../utils/Fetch';

export interface DataResponse extends Objekt {}

export class HttpService extends Base {
    private getTokenAsync: () => Promise<string | null>;
    private progressCounter: number;
    private language: string;
    private secret: string;
    private fetch: Fetch;

    constructor(
        dispatch: Dispatch<any>,
        getTokenAsync: () => Promise<string | null>,
        backendUrl: string,
        language: string,
        secret: string,
    ) {
        super(dispatch);
        this.getTokenAsync = getTokenAsync;
        this.progressCounter = 0;
        this.language = language;
        this.secret = secret;
        this.fetch = new Fetch(backendUrl);
    }

    public getUrl(url: string, opt_params?: Params): string {
        return this.fetch.getUrl(url, opt_params);
    }

    public isInprogress(): boolean {
        return this.progressCounter > 0;
    }

    public async get(
        url: string,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<DataResponse> {
        return this._handleResponse(
            this.fetch.get(
                url,
                opt_params,
                await this._getHeaders(opt_headers),
            ),
        );
    }

    public async post(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<DataResponse> {
        return this._handleResponse(
            this.fetch.post(
                url,
                opt_data,
                opt_params,
                await this._getHeaders(opt_headers),
            ),
        );
    }

    public async put(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<DataResponse> {
        return this._handleResponse(
            this.fetch.put(
                url,
                opt_data,
                opt_params,
                await this._getHeaders(opt_headers),
            ),
        );
    }

    public async patch(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<DataResponse> {
        return this._handleResponse(
            this.fetch.patch(
                url,
                opt_data,
                opt_params,
                await this._getHeaders(opt_headers),
            ),
        );
    }

    public async delete(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<DataResponse> {
        return this._handleResponse(
            this.fetch.delete(
                url,
                opt_data,
                opt_params,
                await this._getHeaders(opt_headers),
            ),
        );
    }

    private async _getHeaders(opt_headers?: Headers): Promise<Headers> {
        const token = await this.getTokenAsync();
        const authorizationHeader = token
            ? { Authorization: `Bearer ${token}` }
            : null;

        return {
            ...authorizationHeader,
            'Accept-Language': this.language,
            'X-Client': this.secret,
            ...opt_headers,
        };
    }

    private _handleResponse(
        fetchPromise: Promise<HttpResponse>,
    ): Promise<DataResponse> {
        this._setInprogress(HTTP_REQUEST, true);
        return new Promise((resolve, reject) => {
            fetchPromise
                .then(
                    ({ data, status }) => {
                        this._statusHandler(status, false);
                        resolve(data);
                    },
                    ({ data, status }) => {
                        this._statusHandler(status, false);
                        reject(data);
                    },
                )
                .catch(() => {
                    this._statusHandler(500, false);
                    reject(new Objekt());
                });
        });
    }

    private _statusHandler(status: number, inProgress: boolean): void {
        let type;
        switch (status) {
            case 401:
                type = HTTP_401;
                break;
            case 403:
                type = HTTP_403;
                break;
            default:
                type = HTTP_RESPONSE;
                break;
        }
        this._setInprogress(type, inProgress);
    }

    private _setInprogress(type: string, inProgress: boolean): void {
        if (inProgress) {
            this.progressCounter++;
        } else {
            this.progressCounter--;
        }
        this.dispatch({
            type,
        });
    }
}

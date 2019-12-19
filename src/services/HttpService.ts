import BaseService from './BaseService';
import { HTTP_REQUEST, HTTP_RESPONSE, HTTP_401 } from '../constants/ActionTypes';
import { Fetch } from '../utils';

export default class HttpService extends BaseService {
    protected factories: { [key: string]: any; };
    protected dispatch: (state: object) => void;
    private inprogress: number;
    private language: string;
    private secret: string;
    private fetch: Fetch;

    constructor(dispatch, factories, backend, language, secret) {
        super(dispatch, factories);
        this.inprogress = 0;
        this.language = language;
        this.secret = secret;
        this.fetch = new Fetch(backend);
    }

    public getUrl(url, opt_params){
        return this.fetch.getUrl(url, opt_params);
    }


    public isInprogress() {
        return this.inprogress > 0;
    }

    public async get(url: string, opt_params?: {}, opt_headers?: {}) {
        return this._handleResponse(this.fetch.get(url, opt_params, await this._getHeaders(opt_headers)));
    }

    public async post(url: string, opt_data?: {}, opt_params?: {}, opt_headers?: {}) {
        return this._handleResponse(this.fetch.post(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }

    public async put(url: string, opt_data?: {}, opt_params?: {}, opt_headers?: {}) {
        return this._handleResponse(this.fetch.put(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }

    public async patch(url: string, opt_data?: {}, opt_params?: {}, opt_headers?: {}) {
        return this._handleResponse(this.fetch.patch(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }

    public async delete(url: string, opt_data?: {}, opt_params?: {}, opt_headers?: {}) {
        return this._handleResponse(this.fetch.delete(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }

    private async _getHeaders(opt_headers) {
        const token = await this.factories.securityFactory.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Accept-Language': this.language,
            'X-Client': this.secret,
            ...opt_headers,
        };
    }

    private _handleResponse(fetchPromise): Promise<any> {
        this._setInprogress(true);
        return new Promise((resolve, reject) => {
            fetchPromise.then(({ data }) => {
                this._setInprogress(false);
                resolve(data);
            }, ({ data, status }) => {
                this._setInprogress(false);
                this._statusHandler(status);
                reject(data);
            }).catch(() => {
                reject({});
            });
        });
    }

    private _statusHandler(status) {
        if (status === 401) {
            this.dispatch({
                type: HTTP_401,
            });
        }
    }

    private _setInprogress(value) {
        if (value) {
            this.inprogress++;
        } else {
            this.inprogress--;
        }
        this.dispatch({
            type: value ? HTTP_REQUEST : HTTP_RESPONSE,
        });
    }
}

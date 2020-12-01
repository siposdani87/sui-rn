import { HTTP_REQUEST, HTTP_RESPONSE, HTTP_401, HTTP_403 } from '../constants/ActionTypes';
import { Base, Fetch } from '../utils';

export default class HttpService extends Base {
    protected dispatch: (state: object) => void;
    private getTokenAsync: () => Promise<string>;
    private inprogress: number;
    private language: string;
    private secret: string;
    private fetch: Fetch;

    constructor(dispatch, getTokenAsync: () => Promise<string>, backend, language, secret) {
        super(dispatch);
        this.getTokenAsync = getTokenAsync;
        this.inprogress = 0;
        this.language = language;
        this.secret = secret;
        this.fetch = new Fetch(backend);
    }

    public getUrl(url, opt_params) {
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
        const token = await this.getTokenAsync();
        return {
            'Authorization': `Bearer ${token}`,
            'Accept-Language': this.language,
            'X-Client': this.secret,
            ...opt_headers,
        };
    }

    private _handleResponse(fetchPromise): Promise<any> {
        this._setInprogress(HTTP_REQUEST, true);
        return new Promise((resolve, reject) => {
            fetchPromise.then(({ data, status }) => {
                this._statusHandler(status, false);
                resolve(data);
            }, ({ data, status }) => {
                this._statusHandler(status, false);
                reject(data);
            }).catch(() => {
                reject({});
            });
        });
    }

    private _statusHandler(status, value) {
        let type = HTTP_RESPONSE;
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
        this._setInprogress(type, value);
    }

    private _setInprogress(type, value) {
        if (value) {
            this.inprogress++;
        } else {
            this.inprogress--;
        }
        this.dispatch({
            type,
        });
    }
}

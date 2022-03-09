import * as SUI from 'sui-js';
import { HTTP_401, HTTP_403, HTTP_REQUEST, HTTP_RESPONSE, } from '../constants/ActionTypes';
import { Base, Fetch } from '../utils';
export default class HttpService extends Base {
    getTokenAsync;
    inprogress;
    language;
    secret;
    fetch;
    constructor(dispatch, getTokenAsync, backendUrl, language, secret) {
        super(dispatch);
        this.getTokenAsync = getTokenAsync;
        this.inprogress = 0;
        this.language = language;
        this.secret = secret;
        this.fetch = new Fetch(backendUrl);
    }
    getUrl(url, opt_params) {
        return this.fetch.getUrl(url, opt_params);
    }
    isInprogress() {
        return this.inprogress > 0;
    }
    async get(url, opt_params, opt_headers) {
        return this._handleResponse(this.fetch.get(url, opt_params, await this._getHeaders(opt_headers)));
    }
    async post(url, opt_data, opt_params, opt_headers) {
        return this._handleResponse(this.fetch.post(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }
    async put(url, opt_data, opt_params, opt_headers) {
        return this._handleResponse(this.fetch.put(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }
    async patch(url, opt_data, opt_params, opt_headers) {
        return this._handleResponse(this.fetch.patch(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }
    async delete(url, opt_data, opt_params, opt_headers) {
        return this._handleResponse(this.fetch.delete(url, opt_data, opt_params, await this._getHeaders(opt_headers)));
    }
    async _getHeaders(opt_headers) {
        const token = await this.getTokenAsync();
        return {
            Authorization: `Bearer ${token}`,
            'Accept-Language': this.language,
            'X-Client': this.secret,
            ...opt_headers,
        };
    }
    _handleResponse(fetchPromise) {
        this._setInprogress(HTTP_REQUEST, true);
        return new Promise((resolve, reject) => {
            fetchPromise
                .then(({ data, status }) => {
                this._statusHandler(status, false);
                resolve(data);
            }, ({ data, status }) => {
                this._statusHandler(status, false);
                reject(data);
            })
                .catch(() => {
                this._statusHandler(500, false);
                reject(new SUI.Objekt());
            });
        });
    }
    _statusHandler(status, inProgress) {
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
        this._setInprogress(type, inProgress);
    }
    _setInprogress(type, inProgress) {
        if (inProgress) {
            this.inprogress++;
        }
        else {
            this.inprogress--;
        }
        this.dispatch({
            type,
        });
    }
}
//# sourceMappingURL=HttpService.js.map
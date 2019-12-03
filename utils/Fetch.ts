import SUI from 'sui-js';

export default class Fetch {
    private backendUrl: string;

    constructor(backendUrl) {
        this.backendUrl = backendUrl;
    }

    get mimeTypes() {
        return {
            json: 'application/json',
            html: 'text/html',
        };
    }

    public getUrl(url, opt_params) {
        const query = this._getQuery(opt_params);
        return this.backendUrl + url + query;
    }

    public async get(url, opt_params, opt_headers) {
        return await this._handleRequest('GET', url, null, opt_params, opt_headers);
    }

    public async post(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('POST', url, opt_data, opt_params, opt_headers);
    }

    public async put(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('PUT', url, opt_data, opt_params, opt_headers);
    }

    public async patch(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('PATCH', url, opt_data, opt_params, opt_headers);
    }

    public async delete(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('DELETE', url, opt_data, opt_params, opt_headers);
    }

    private _getHeaders(url) {
        const extension = SUI.getExtensionName(url);
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': this.mimeTypes[extension] || this.mimeTypes.json,
            // 'Accept-Encoding': 'gzip, deflate, br',
            // 'Accept': 'application/json',
        };
    }

    private _getQuery(opt_params) {
        const queries = [];
        for (const key of Object.keys(opt_params)) {
            const param = opt_params[key];
            if (param instanceof Array) {
                for (const value of param) {
                    queries.push(key + '[]=' + value);
                }
            } else {
                queries.push(key + '=' + param);
            }
        }
        return queries.length === 0 ? '' : '?' + queries.join('&');
    }

    private _getRequestBody(opt_data) {
        if (opt_data) {
            /*let formData = new FormData();
            for (let key in opt_data) {
                if (opt_data.hasOwnProperty(key)) {
                    formData.append(key, opt_data[key]);
                }
            }
            return formData;*/
            return JSON.stringify(opt_data);
        }
        return null;
    }

    private async _handleResponse(response) {
        const contentType = response.headers.get('content-type');
        /*
            arrayBuffer()
            blob()
            text()
            formData()
        */
        let result = {};
        if (contentType && contentType.includes(this.mimeTypes.json)) {
            const data = await response.json();
            const object = new SUI.Object();
            result = object.merge(data);
        }
        return new Promise((resolve, reject) => {
            // console.log('_handleResponse', contentType, response.status, result);
            if (response.status >= 200 && response.status < 300) {
                resolve({data: result, status: response.status});
            } else {
                reject({data: result, status: response.status});
            }
        });
    }

    private async _handleRequest(method, url, opt_data, opt_params, opt_headers) {
        const options = {
            method,
            headers: Object.assign(this._getHeaders(url), opt_headers),
            body: this._getRequestBody(opt_data),
            // mode: 'cors',
            // credentials: 'same-origin',
            // cache: 'no-cache',
            // referrer: 'no-referrer',
        };
        // console.log('_handleRequest', this.getUrl(url, opt_params), options);
        const response = await fetch(this.getUrl(url, opt_params), options);
        return await this._handleResponse(response);
    }
}
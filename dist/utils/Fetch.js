import SUI from 'sui-js';
export default class Fetch {
    backendUrl;
    constructor(backendUrl) {
        this.backendUrl = backendUrl;
    }
    get mimeTypes() {
        return {
            json: 'application/json',
            html: 'text/html',
        };
    }
    getUrl(url, opt_params) {
        const query = this._getQuery(opt_params);
        return this.backendUrl + url + query;
    }
    async get(url, opt_params, opt_headers) {
        return await this._handleRequest('GET', url, undefined, opt_params, opt_headers);
    }
    async post(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('POST', url, opt_data, opt_params, opt_headers);
    }
    async put(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('PUT', url, opt_data, opt_params, opt_headers);
    }
    async patch(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('PATCH', url, opt_data, opt_params, opt_headers);
    }
    async delete(url, opt_data, opt_params, opt_headers) {
        return await this._handleRequest('DELETE', url, opt_data, opt_params, opt_headers);
    }
    _getHeaders(url, opt_headers) {
        const extension = SUI.getExtensionName(url);
        const headers = this.filteredHeaders(opt_headers);
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': this.mimeTypes[extension] || this.mimeTypes.json,
            ...headers,
        };
    }
    filteredHeaders(opt_headers) {
        const deniedKeys = ['responseType'];
        return Object.keys(opt_headers ?? {})
            .filter((key) => !deniedKeys.includes(key))
            .reduce((obj, key) => {
            return {
                ...obj,
                [key]: opt_headers?.[key],
            };
        }, {});
    }
    _getQuery(opt_params) {
        const queries = [];
        if (opt_params) {
            for (const key of Object.keys(opt_params)) {
                const param = opt_params[key];
                if (param instanceof Array) {
                    for (const value of param) {
                        queries.push(key + '[]=' + value);
                    }
                }
                else {
                    queries.push(key + '=' + param);
                }
            }
        }
        return queries.length === 0 ? '' : '?' + queries.join('&');
    }
    _getRequestBody(opt_data) {
        if (opt_data) {
            return JSON.stringify(opt_data);
        }
        return null;
    }
    async _handleResponse(_request, response, responseType) {
        const data = await this._dataHandler(response, responseType);
        return new Promise((resolve, reject) => {
            if (response.status >= 200 && response.status < 300) {
                resolve({ data, ...response });
            }
            else {
                reject({ data, ...response });
            }
        });
    }
    async _dataHandler(response, responseType) {
        const contentType = response.headers.get('content-type');
        /*
            arrayBuffer()
            blob()
            text()
            formData()
        */
        let data = {};
        if (contentType?.includes('/json')) {
            const jsonData = await response.json();
            const object = new SUI.Object();
            data = object.merge(jsonData);
        }
        else if (responseType === 'blob') {
            data = {
                blob: await response.blob(),
                filename: this._getFilenameFromHeader(response),
            };
        }
        return data;
    }
    _getFilenameFromHeader(response) {
        let filename = '';
        try {
            if (response.headers.has('Content-Disposition')) {
                const contentDisposition = response.headers.get('Content-Disposition') ?? '';
                filename =
                    contentDisposition.match(/filename="(.+)"/)?.[1] ?? '';
            }
        }
        catch (_e) {
            // console.error(e);
        }
        return filename;
    }
    async _handleRequest(method, url, opt_data, opt_params, opt_headers) {
        const options = {
            method,
            headers: this._getHeaders(url, opt_headers),
            body: this._getRequestBody(opt_data),
        };
        const request = new Request(this.getUrl(url, opt_params), options);
        const response = await fetch(request);
        return await this._handleResponse(request, response, opt_headers?.responseType);
    }
}
//# sourceMappingURL=Fetch.js.map
import * as SUI from 'sui-js';

export interface Data {
    [key: string]: any;
}

export interface Params {
    [key: string]: any;
}

export interface Headers {
    [name: string]: string;
}

export interface HttpResponse extends Response {
    data: any;
}

interface MimeTypes {
    [key: string]: string;
}

export default class Fetch {
    private backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    get mimeTypes(): MimeTypes {
        return {
            json: 'application/json',
            html: 'text/html',
        };
    }

    public getUrl(url: string, opt_params?: Params): string {
        const query = this._getQuery(opt_params);
        return this.backendUrl + url + query;
    }

    public async get(
        url: string,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        return await this._handleRequest(
            'GET',
            url,
            undefined,
            opt_params,
            opt_headers,
        );
    }

    public async post(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        return await this._handleRequest(
            'POST',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    public async put(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        return await this._handleRequest(
            'PUT',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    public async patch(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        return await this._handleRequest(
            'PATCH',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    public async delete(
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        return await this._handleRequest(
            'DELETE',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    private _getHeaders(url: string, opt_headers?: Headers): HeadersInit {
        const extension = SUI.getExtensionName(url);
        const headers = this.filteredHeaders(opt_headers);
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': this.mimeTypes[extension] || this.mimeTypes.json,
            ...headers,
        };
    }

    private filteredHeaders(opt_headers?: Headers): any {
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

    private _getQuery(opt_params?: Params) {
        const queries: string[] = [];
        if (opt_params) {
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
        }
        return queries.length === 0 ? '' : '?' + queries.join('&');
    }

    private _getRequestBody(opt_data?: Data) {
        if (opt_data) {
            return JSON.stringify(opt_data);
        }
        return null;
    }

    private async _handleResponse(
        _request: Request,
        response: Response,
        responseType?: string,
    ): Promise<HttpResponse> {
        const data = await this._dataHandler(response, responseType);
        return new Promise((resolve, reject) => {
            if (response.status >= 200 && response.status < 300) {
                resolve({ data, ...response });
            } else {
                reject({ data, ...response });
            }
        });
    }

    private async _dataHandler(
        response: Response,
        responseType?: string,
    ): Promise<SUI.Objekt> {
        const contentType = response.headers.get('content-type');
        /*
            arrayBuffer()
            blob()
            text()
            formData()
        */
        let data = new SUI.Objekt();
        if (contentType?.includes('/json')) {
            const jsonData = await response.json();
            data = data.merge(jsonData);
        } else if (responseType === 'blob') {
            data.set('filename', this._getFilenameFromHeader(response));
            data.setRaw('blob', await response.blob());
        }
        return data;
    }

    private _getFilenameFromHeader(response: Response): string {
        let filename = '';

        try {
            if (response.headers.has('Content-Disposition')) {
                const contentDisposition =
                    response.headers.get('Content-Disposition') ?? '';

                filename =
                    contentDisposition.match(/filename="(.+)"/)?.[1] ?? '';
            }
        } catch (_e) {
            // console.error(e);
        }
        return filename;
    }

    private async _handleRequest(
        method: string,
        url: string,
        opt_data?: Data,
        opt_params?: Params,
        opt_headers?: Headers,
    ): Promise<HttpResponse> {
        const options: RequestInit = {
            method,
            headers: this._getHeaders(url, opt_headers),
            body: this._getRequestBody(opt_data),
        };
        const request = new Request(this.getUrl(url, opt_params), options);
        const response = await fetch(request);
        return await this._handleResponse(
            request,
            response,
            opt_headers?.responseType,
        );
    }
}

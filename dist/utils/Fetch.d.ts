export interface Data {
    [key: string]: any;
}
export interface Params {
    [key: string]: any;
}
export interface Headers {
    [name: string]: string;
}
interface MimeTypes {
    [key: string]: string;
}
export default class Fetch {
    private backendUrl;
    constructor(backendUrl: string);
    get mimeTypes(): MimeTypes;
    getUrl(url: string, opt_params?: Params): string;
    get(url: string, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    post(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    put(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    patch(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    delete(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<any>;
    private _getHeaders;
    private filteredHeaders;
    private _getQuery;
    private _getRequestBody;
    private _handleResponse;
    private _dataHandler;
    private _getFilenameFromHeader;
    private _handleRequest;
}
export {};

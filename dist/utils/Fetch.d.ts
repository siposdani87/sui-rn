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
export declare class Fetch {
    private backendUrl;
    constructor(backendUrl: string);
    get mimeTypes(): MimeTypes;
    getUrl(url: string, opt_params?: Params): string;
    get(url: string, opt_params?: Params, opt_headers?: Headers): Promise<HttpResponse>;
    post(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<HttpResponse>;
    put(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<HttpResponse>;
    patch(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<HttpResponse>;
    delete(url: string, opt_data?: Data, opt_params?: Params, opt_headers?: Headers): Promise<HttpResponse>;
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

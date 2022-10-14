import { Base } from '../utils';
import { Dispatch } from 'react';
interface Message {
    type: string;
    content: string;
    closable: boolean;
}
export interface FlashItem {
    type: string;
    message: string;
    id: string;
    duration?: number;
    closeCallback?: () => void;
}
export declare class FlashService extends Base {
    private flashes;
    private options;
    constructor(dispatch: Dispatch<any>);
    getFlashes(): FlashItem[];
    addSuccess(message: string, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): FlashItem;
    addInfo(message: string, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): FlashItem;
    addWarning(message: string, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): FlashItem;
    addError(message: string, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): FlashItem;
    addMessage(message: Message, opt_duration?: number, opt_closeCallback?: any, opt_id?: string): FlashItem | null;
    isClosable(flash: FlashItem): boolean;
    close(flash: FlashItem, opt_force?: boolean): void;
    remove(flash: FlashItem): void;
    private _add;
    private removeById;
}
export {};

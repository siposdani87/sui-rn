import { Base } from '../utils';
import { Dispatch } from 'react';
interface Message {
    type: string;
    content: string;
    closable: boolean;
}
export interface FlashType {
    type: string;
    message: string;
    id: string;
    duration?: number;
    closeCallback?: () => void;
}
export default class FlashService extends Base {
    private flashes;
    private options;
    constructor(dispatch: Dispatch<any>);
    getFlashes(): FlashType[];
    addSuccess(message: string, opt_duration?: number, opt_closeCallback?: null, opt_id?: string): FlashType;
    addInfo(message: string, opt_duration?: number, opt_closeCallback?: null, opt_id?: string): FlashType;
    addWarning(message: string, opt_duration?: number, opt_closeCallback?: null, opt_id?: string): FlashType;
    addError(message: string, opt_duration?: number, opt_closeCallback?: null, opt_id?: string): FlashType;
    addMessage(message: Message, opt_duration?: number, opt_closeCallback?: null, opt_id?: string): FlashType | null;
    isClosable(flash: FlashType): boolean;
    close(flash: FlashType, opt_force?: boolean): void;
    remove(flash: FlashType): void;
    private _add;
    private removeById;
}
export {};

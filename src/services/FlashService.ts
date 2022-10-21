import { Base } from '../utils';
import { FLASH } from '../constants/ActionTypes';
import { Dispatch } from 'react';
import {
    isObject,
    isNull,
    eq,
    noop,
    isFunction,
    generateId,
} from '@siposdani87/sui-js';

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

export class FlashService extends Base {
    private flashes: FlashItem[];
    private options: {
        closableTypes: string[];
        duration: number;
    };

    constructor(dispatch: Dispatch<any>) {
        super(dispatch);
        this.flashes = [];
        this.options = {
            closableTypes: ['error'],
            duration: 4000,
        };
    }

    public getFlashes(): FlashItem[] {
        return this.flashes;
    }

    public addSuccess(
        message: string,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem {
        return this._add(
            'success',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

    public addInfo(
        message: string,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem {
        return this._add(
            'info',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

    public addWarning(
        message: string,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem {
        return this._add(
            'warning',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

    public addError(
        message: string,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem {
        return this._add(
            'error',
            message,
            opt_duration,
            opt_closeCallback,
            opt_id,
        );
    }

    public addMessage(
        message: Message,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem | null {
        if (isObject(message) && !isNull(message)) {
            const closeCallback = message.closable ? noop : opt_closeCallback;
            return this._add(
                message.type,
                message.content,
                opt_duration,
                closeCallback,
                opt_id,
            );
        }
        return null;
    }

    public isClosable(flash: FlashItem): boolean {
        return (
            (this.options.closableTypes.indexOf(flash.type) !== -1 ||
                isFunction(flash.closeCallback)) &&
            !eq(flash.duration, Infinity)
        );
    }

    public close(flash: FlashItem, opt_force = false) {
        const index = this.flashes.findIndex((item) => item.id === flash.id);
        if (index !== -1 && (opt_force || !eq(flash.duration, Infinity))) {
            if (flash.closeCallback) {
                flash.closeCallback();
            }
            this.flashes.splice(index, 1);
            this.dispatch({
                type: FLASH,
            });
        }
    }

    public remove(flash: FlashItem): void {
        this.close(flash, true);
    }

    private _add(
        type: string,
        message: string,
        opt_duration = 0,
        opt_closeCallback: any = null,
        opt_id = '',
    ): FlashItem {
        this.removeById(opt_id);
        const flash: FlashItem = {
            type,
            message,
            id: opt_id || generateId('flash'),
            duration: opt_duration,
            closeCallback: opt_closeCallback ?? undefined,
        };
        this.flashes.push(flash);
        if (!this.isClosable(flash) && !eq(flash.duration, Infinity)) {
            setTimeout(() => {
                this.close(flash);
            }, opt_duration || this.options.duration);
        }
        this.dispatch({
            type: FLASH,
        });
        return flash;
    }

    private removeById(opt_id: string): void {
        if (opt_id) {
            const flash = this.flashes.find((item) => item.id === opt_id);
            if (flash) {
                this.remove(flash);
            }
        }
    }
}

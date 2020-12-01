import { Base } from '../utils';
import SUI from 'sui-js';
import { FLASH } from '../constants/ActionTypes';

export default class FlashService extends Base {
    private flashes: any[];
    private options: {
        closable: string[];
        duration: number;
    };

    constructor(dispatch) {
        super(dispatch);
        this.flashes = [];
        this.options = {
            closable: ['error'],
            duration: 4000,
        };
    }

    public addSuccess(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('success', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addInfo(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('info', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addWarning(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('warning', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addError(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('error', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addMessage(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        if (SUI.isObject(message) && !SUI.isNull(message)) {
            const closeCallback = message.closable ? SUI.noop : opt_closeCallback;
            return this._add(message.type, message.content, opt_duration, closeCallback, opt_id);
        }
        return null;
    }

    public isClosable(type, opt_closeCallback = null) {
        return this.options.closable.indexOf(type) !== -1 || SUI.isFunction(opt_closeCallback);
    }

    public close(flash, opt_force = false) {
        const index = this.flashes.findIndex((item) => item.id === flash.id);
        if (index !== -1 && (opt_force || !SUI.eq(flash.duration, Infinity))) {
            if (flash.closeCallback) {
                flash.closeCallback();
            }
            this.flashes.splice(index, 1);
            this.dispatch({
                type: FLASH,
            });
        }
    }

    public remove(flash) {
        this.close(flash, true);
    }

    private _add(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = ''): any {
        this.removeFlash(opt_id);
        const flash = {
            type,
            message,
            id: opt_id,
            duration: opt_duration,
            closeCallback: opt_closeCallback,
        };
        this.flashes.push(flash);
        if (!this.isClosable(type, opt_closeCallback) && !SUI.eq(opt_duration, Infinity)) {
            setTimeout(() => {
                this.close(flash);
            }, opt_duration || this.options.duration);
        }
        this.dispatch({
            type: FLASH,
        });
        return flash;
    }

    private removeFlash(opt_id = '') {
        if (opt_id) {
            const flash = this.flashes.find((item) => item.id === opt_id);
            if (flash) {
                this.close(flash, true);
            }
        }
    }
}

import { Base } from '../utils';
import { FLASH } from '../constants/ActionTypes';
import * as SUI from 'sui-js';
export default class FlashService extends Base {
    flashes;
    options;
    constructor(dispatch) {
        super(dispatch);
        this.flashes = [];
        this.options = {
            closableTypes: ['error'],
            duration: 4000,
        };
    }
    getFlashes() {
        return this.flashes;
    }
    addSuccess(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('success', message, opt_duration, opt_closeCallback, opt_id);
    }
    addInfo(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('info', message, opt_duration, opt_closeCallback, opt_id);
    }
    addWarning(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('warning', message, opt_duration, opt_closeCallback, opt_id);
    }
    addError(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        return this._add('error', message, opt_duration, opt_closeCallback, opt_id);
    }
    addMessage(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        if (SUI.isObject(message) && !SUI.isNull(message)) {
            const closeCallback = message.closable
                ? SUI.noop
                : opt_closeCallback;
            return this._add(message.type, message.content, opt_duration, closeCallback, opt_id);
        }
        return null;
    }
    isClosable(flash) {
        return ((this.options.closableTypes.indexOf(flash.type) !== -1 ||
            SUI.isFunction(flash.closeCallback)) &&
            !SUI.eq(flash.duration, Infinity));
    }
    close(flash, opt_force = false) {
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
    remove(flash) {
        this.close(flash, true);
    }
    _add(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this.removeById(opt_id);
        const flash = {
            type,
            message,
            id: opt_id || SUI.generateId('flash'),
            duration: opt_duration,
            closeCallback: opt_closeCallback ?? undefined,
        };
        this.flashes.push(flash);
        if (!this.isClosable(flash) && !SUI.eq(flash.duration, Infinity)) {
            setTimeout(() => {
                this.close(flash);
            }, opt_duration || this.options.duration);
        }
        this.dispatch({
            type: FLASH,
        });
        return flash;
    }
    removeById(opt_id) {
        if (opt_id) {
            const flash = this.flashes.find((item) => item.id === opt_id);
            if (flash) {
                this.remove(flash);
            }
        }
    }
}
//# sourceMappingURL=FlashService.js.map
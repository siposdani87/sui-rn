import BaseFactory from './BaseFactory';
import SUI from 'sui-js';
import { NOTIFICATION } from '../constants/ActionTypes';

export default class NotificationFactory extends BaseFactory {
    private notifications: any[];
    private options: {
        closable: string[];
        duration: number;
    };

    constructor(dispatch) {
        super(dispatch);
        this.notifications = [];
        this.options = {
            closable: ['error'],
            duration: 4000,
        };
    }

    public addSuccess(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this._add('success', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addInfo(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this._add('info', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addWarning(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this._add('warning', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addError(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this._add('error', message, opt_duration, opt_closeCallback, opt_id);
    }

    public addMessage(message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        if (SUI.isObject(message) && !SUI.isNull(message)) {
            const closeCallback = message.closable ? SUI.noop : opt_closeCallback;
            this._add(message.type, message.content, opt_duration, closeCallback, opt_id);
        }
    }

    public isClosable(type, opt_closeCallback = null) {
        return this.options.closable.indexOf(type) !== -1 || SUI.isFunction(opt_closeCallback);
    }

    public close(index) {
        const notification = this.notifications[index];
        if (notification && !SUI.eq(notification.opt_duration, Infinity)) {
            if (notification.opt_closeCallback) {
                notification.opt_closeCallback();
            }
            this.notifications.splice(index, 1);
            this.dispatch({
                type: NOTIFICATION,
            });
        }
    }

    private _add(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = '') {
        this.notifications.push({
            type,
            message,
            opt_id,
            opt_duration,
            opt_closeCallback,
        });
        if (!this.isClosable(type, opt_closeCallback) && !SUI.eq(opt_duration, Infinity)) {
            setTimeout(() => {
                this.close(this.notifications.length - 1);
            }, opt_duration || this.options.duration);
        }
        this.dispatch({
            type: NOTIFICATION,
        });
    }
}

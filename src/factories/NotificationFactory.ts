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

    public close(notification, opt_force = false) {
        const index = this.notifications.findIndex((item) => item.id === notification.id);
        if (index !== -1 && (opt_force || !SUI.eq(notification.duration, Infinity))) {
            if (notification.closeCallback) {
                notification.closeCallback();
            }
            this.notifications.splice(index, 1);
            this.dispatch({
                type: NOTIFICATION,
            });
        }
    }

    public remove(notification) {
        this.close(notification, true);
    }

    private _add(type, message, opt_duration = 0, opt_closeCallback = null, opt_id = ''): any {
        this.removeNotification(opt_id);
        const notification = {
            type,
            message,
            id: opt_id,
            duration: opt_duration,
            closeCallback: opt_closeCallback,
        };
        this.notifications.push(notification);
        if (!this.isClosable(type, opt_closeCallback) && !SUI.eq(opt_duration, Infinity)) {
            setTimeout(() => {
                this.close(notification);
            }, opt_duration || this.options.duration);
        }
        this.dispatch({
            type: NOTIFICATION,
        });
        return notification;
    }

    private removeNotification(opt_id = '') {
        if (opt_id) {
            const notification = this.notifications.find((item) => item.id === opt_id);
            if (notification) {
                this.close(notification, true);
            }
        }
    }
}

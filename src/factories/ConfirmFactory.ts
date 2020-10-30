import BaseFactory from './BaseFactory';
import { CONFIRM } from '../constants/ActionTypes';
import { AlertButton, AlertOptions } from 'react-native';

export default class ConfirmFactory extends BaseFactory {
    private visible: boolean;
    private title: string;
    private message: string;
    private buttons: AlertButton[];
    private options: AlertOptions;
    
    constructor(dispatch) {
        super(dispatch);
        this.visible = false;
        this.title = '';
        this.message = '';
        this.buttons = [];
        this.options = {};
    }

    public open(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) {
        this.title = title;
        this.message = message || '';
        this.buttons = buttons || [];
        this.options = options || {};
        this.visible = true;
        this.dispatch({
            type: CONFIRM,
        });
    }

    public hasMessage(): boolean {
        return !!this.message;
    }

    public getTitle(): string {
        return this.title;
    }

    public getMessage(): string {
        return this.message;
    }

    public getButtons(): AlertButton[] {
        return this.buttons;
    }

    public getOptions(): AlertOptions {
        return this.options;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public isClosable(): boolean {
        return this.options.cancelable;
    }

    public close() {
        this.visible = false;
        this.dispatch({
            type: CONFIRM,
        });
    }
}

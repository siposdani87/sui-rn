import { CONFIRM } from '../constants/ActionTypes';
import { AlertButton } from 'react-native';
import { Base } from '../utils';
import { Dispatch } from 'react';

export default class ConfirmService extends Base {
    private visible: boolean;
    private type: string;
    private title: string;
    private message: string;
    private buttons: AlertButton[];

    constructor(dispatch: Dispatch<any>) {
        super(dispatch);
        this.visible = false;
        this.type = 'info';
        this.title = '';
        this.message = '';
        this.buttons = [];
    }

    public success(message: string, buttons?: AlertButton[], title?: string) {
        this.open('success', message, buttons, title);
    }

    public info(message: string, buttons?: AlertButton[], title?: string) {
        this.open('info', message, buttons, title);
    }

    public warning(message: string, buttons?: AlertButton[], title?: string) {
        this.open('warning', message, buttons, title);
    }

    public error(message: string, buttons?: AlertButton[], title?: string) {
        this.open('error', message, buttons, title);
    }

    public choice(message: string, buttons?: AlertButton[], title?: string) {
        this.open('choice', message, buttons, title);
    }

    private open(
        type: string,
        message: string,
        buttons?: AlertButton[],
        title?: string,
    ) {
        this.type = type;
        this.title = title || '';
        this.message = message || '';
        this.buttons = buttons || [];
        this.visible = true;
        this.dispatch({
            type: CONFIRM,
        });
    }

    public getType(): string {
        return this.type;
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

    public isVisible(): boolean {
        return this.visible;
    }

    public close() {
        this.visible = false;
        this.dispatch({
            type: CONFIRM,
        });
    }
}

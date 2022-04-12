import { CONFIRM } from '../constants/ActionTypes';
import { Base } from '../utils';
export class ConfirmService extends Base {
    visible;
    type;
    title;
    message;
    buttons;
    constructor(dispatch) {
        super(dispatch);
        this.visible = false;
        this.type = 'info';
        this.title = '';
        this.message = '';
        this.buttons = [];
    }
    success(message, buttons, title) {
        this.open('success', message, buttons, title);
    }
    info(message, buttons, title) {
        this.open('info', message, buttons, title);
    }
    warning(message, buttons, title) {
        this.open('warning', message, buttons, title);
    }
    error(message, buttons, title) {
        this.open('error', message, buttons, title);
    }
    choice(message, buttons, title) {
        this.open('choice', message, buttons, title);
    }
    open(type, message, buttons, title) {
        this.type = type;
        this.title = title || '';
        this.message = message || '';
        this.buttons = buttons || [];
        this.visible = true;
        this.dispatch({
            type: CONFIRM,
        });
    }
    getType() {
        return this.type;
    }
    getTitle() {
        return this.title;
    }
    getMessage() {
        return this.message;
    }
    getButtons() {
        return this.buttons;
    }
    isVisible() {
        return this.visible;
    }
    close() {
        this.visible = false;
        this.dispatch({
            type: CONFIRM,
        });
    }
}
//# sourceMappingURL=ConfirmService.js.map
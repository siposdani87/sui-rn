import { AlertButton } from 'react-native';
import { Base } from '../utils';
import { Dispatch } from 'react';
export default class ConfirmService extends Base {
    private visible;
    private type;
    private title;
    private message;
    private buttons;
    constructor(dispatch: Dispatch<any>);
    success(message: string, buttons?: AlertButton[], title?: string): void;
    info(message: string, buttons?: AlertButton[], title?: string): void;
    warning(message: string, buttons?: AlertButton[], title?: string): void;
    error(message: string, buttons?: AlertButton[], title?: string): void;
    choice(message: string, buttons?: AlertButton[], title?: string): void;
    private open;
    getType(): string;
    getTitle(): string;
    getMessage(): string;
    getButtons(): AlertButton[];
    isVisible(): boolean;
    close(): void;
}

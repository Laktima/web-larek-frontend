import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Contacts {
    protected _container: HTMLElement;
    protected _events: IEvents;
    protected _telNum: HTMLInputElement;
    protected _email: HTMLInputElement;
    protected _payButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._telNum = this._container.querySelectorAll('.form__input')[1] as HTMLInputElement;
        this._email = this._container.querySelectorAll('.form__input')[0] as HTMLInputElement;
        this._payButton = this._container.querySelector('.button');

        this._telNum.addEventListener('input', () => {
            this._events.emit('contacts:telNumChange', { value: this._telNum.value, contacts: this});
        })

        this._email.addEventListener('input', () => {
            this._events.emit('contacts:emailChange', { value: this._email.value, contacts: this});
        })

        this._payButton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            this._events.emit('contacts:payButtonClick');
        })
    }

    setEnableButton() {
        this._payButton.disabled = false;
    }

    setDisableButton() {
        this._payButton.disabled = true;
    }

    render() {
        return this._container;
    }
}
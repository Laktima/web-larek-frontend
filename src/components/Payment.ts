import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Payment {
    protected _container: HTMLElement;
    protected _events: IEvents;
    protected _addres: HTMLInputElement;
    protected _cardButton: HTMLButtonElement;
    protected _cashButton: HTMLButtonElement;
    protected _nextButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._addres = this._container.querySelector('.form__input');
        this._nextButton = this._container.querySelector('.order__button');
        this._cardButton = this._container.querySelectorAll('.button_alt')[0] as HTMLButtonElement;
        this._cashButton = this._container.querySelectorAll('.button_alt')[1] as HTMLButtonElement;
        

        this._addres.addEventListener('input', () => {
            this._events.emit('payment:addresChange', { value: this._addres.value, payment: this});
        })

        this._cardButton.addEventListener('click', () => {
            this._events.emit('payment:paymentType-change', { value: 'card', payment: this});
            this._cardButton.classList.add('button_alt-active');
            this._cashButton.classList.remove('button_alt-active');
        });

        this._cashButton.addEventListener('click', () => {
            this._events.emit('payment:paymentType-change', { value: 'cash', payment: this});
            this._cashButton.classList.add('button_alt-active');
            this._cardButton.classList.remove('button_alt-active');
        });

        this._nextButton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            this._events.emit('payment:nextButtonClick');
        });
    }

    setEnableButton() {
        this._nextButton.disabled = false;
    }

    setDisableButton() {
        this._nextButton.disabled = true;
    }

    render() {
        return this._container;
    }
}
import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Success {
    protected _container: HTMLElement;
    protected _events: IEvents;
    protected _totalPrice: HTMLElement;
    protected _closeButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._totalPrice = this._container.querySelector('.order-success__description')
        this._closeButton = this._container.querySelector('.button');
        
        this._closeButton.addEventListener('click', () => {
            this._events.emit('success:closeButtonClick');
        });
    }

    render() {
        return this._container;
    }

    setTotalPrice(totalPrice: number) {
        this._totalPrice.textContent = 'Списано ' + totalPrice + ' синапсов'
    }
}
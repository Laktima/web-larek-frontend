import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Basket {
    protected _container: HTMLElement;
    protected _events: IEvents; 
    protected _totalPrice: HTMLElement;
    protected _basketList: HTMLElement;
    protected _orderButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._totalPrice = this._container.querySelector('.basket__price');
        this._basketList = this._container.querySelector('.basket__list');
        this._orderButton = this._container.querySelector('.button');

        this._orderButton.addEventListener('click', () => {
            this._events.emit('basket:order');
        })
    }

    render(list: HTMLElement) {
        this._basketList.replaceChildren(list);
        return this._container; 
    }

    setPrice(totalPrice: number) {
        this._totalPrice.textContent = totalPrice.toString() + ' синапсов';
    }

    get basketList(): HTMLElement {
        return this._basketList;
    }

    setDisableOrderButton(value: boolean) {
        this._orderButton.disabled = value;
    }
}
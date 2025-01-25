import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Basket {
    protected _container: HTMLElement;
    protected _events: IEvents; 
    protected _totalPrice: HTMLElement;
    protected _basketList: HTMLElement;
    protected _orderButton: HTMLButtonElement;
    protected _basketButton: HTMLButtonElement;
    protected _basketCounter: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._totalPrice = this._container.querySelector('.basket__price');
        this._basketList = this._container.querySelector('.basket__list');
        this._orderButton = this._container.querySelector('.button');
        this._basketButton = document.querySelector('.header__basket');
        this._basketCounter = document.querySelector('.header__basket-counter');

        this._orderButton.addEventListener('click', () => {
            this._events.emit('basket:order');
        })

        this._basketButton.addEventListener('click', () => {
            this._events.emit('basketButton:click');
        });
    }

    render() {
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

    setBasketList(list: HTMLElement[]) {
        this._basketList.replaceChildren(...list);
    }

    setBasketCounter(value: number) {
        this._basketCounter.textContent = value.toString();
    }
}
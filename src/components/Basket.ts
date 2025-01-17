import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";
import { IProduct } from "../types";

export class Basket {
    protected _container: HTMLElement;
    protected _events: IEvents; 
    protected _totalPrice: HTMLElement;
    protected _basketList: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._totalPrice = this._container.querySelector('.basket__price');
        this._basketList = this._container.querySelector('.basket__list');
    }

    render(list: HTMLElement) {
        this._basketList.replaceChildren(list);
        return this._container; 
    }

    setPrice(totalPrice: number) {
        this._totalPrice.textContent = totalPrice.toString();
    }

    get basketList(): HTMLElement {
        return this._basketList;
    }
}
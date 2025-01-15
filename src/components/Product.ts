import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";
import { IProduct } from "../types";

export class Product {
    protected _container: HTMLElement;
    protected _name: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLElement;
    protected _productId: string;  
    protected _events: IEvents; 
    protected _productButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._category = this._container.querySelector('.card__category');
        this._name = this._container.querySelector('.card__title');
        this._price = this._container.querySelector('.card__price');
        this._image = this._container.querySelector('.card__image');
        console.log(this._container.querySelector('.gallery__item'))
        this._productButton = this._container.querySelector('.gallery__item');
        /*this._productButton.addEventListener('click', () => {
            this._events.emit('product: select', {
                product: this
            })
        })*/
    }

    render(product: IProduct) {
        this._name.textContent = product.title;
        this._price.textContent = product.price + ' синапсов';
        this._image.setAttribute('src', product.image);
        this._category.textContent = product.category;
        return this._container; 
    }
}
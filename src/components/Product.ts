import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";
import { IProduct } from "../types";

export class Product {
    protected _container: HTMLElement;
    protected _name: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLElement;
    protected _description: HTMLElement;
    protected _productId: string;  
    protected _basketButton: HTMLButtonElement;
    protected _deleateButton: HTMLButtonElement;
    protected _events: IEvents; 

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this._events = events;
        this._container = cloneTemplate(template);
        this._category = this._container.querySelector('.card__category');
        this._name = this._container.querySelector('.card__title');
        this._price = this._container.querySelector('.card__price');
        this._image = this._container.querySelector('.card__image');
        this._description = this._container.querySelector('.card__text');
        this._basketButton = this._container.querySelector('.button');
        this._deleateButton = this._container.querySelector('.basket__item-delete');

        if (this._container && this._category && !this._description) {
        this._container.addEventListener('click', () => {
            this._events.emit('product:select', {
                productId: this._productId,
            })
        })
        }

        if (this._basketButton) {
        this._basketButton.addEventListener('click', () => {
            this._events.emit('product:addBasket', {
                productId: this._productId,
            })
        });
        }

        if (this._deleateButton) {
            this._deleateButton.addEventListener('click', () => {
                this._events.emit('product:delete', {
                    productId: this._productId,
                })
            })
        }
    }

    render(product: IProduct) {
        this._productId = product.id;
        this._name.textContent = product.title;
        this._price.textContent = product.price + ' синапсов';
        if (this._category) this._category.textContent = product.category;
        if(this._image) this._image.setAttribute('src', product.image);
        if (this._description) this._description.textContent = product.description;
        return this._container; 
    }
}
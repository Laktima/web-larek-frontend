import { IBasketData, IProduct } from "../types"
import { IEvents } from "./base/events"

export class BasketData implements IBasketData {
    protected _products: IProduct[];
    protected _events: IEvents;

    constructor(events: IEvents) {
        this._events = events;
        this._products = [];
    }

    set products(products: IProduct[]) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    add(product: IProduct): void {
      this._products.push(product); 
    } 

    remove(id: string): void {
       const filtered = this._products.filter((product) => {
            return id !== product.id
       });
       this._products = filtered;
    }

    getTotalPrice(): number {
        return this._products.reduce((acc, product) => {
            return acc + product.price;
        }, 0);
    }

    checkProductInBasket(id: string): boolean {
        const ids = this._products.map((product) => product.id);
        return ids.includes(id);
    }

    clearBasket(): void {
        this._products = [];
    }

    getList(): string[] {
        return this._products.filter((product) => product.price !== null).map((product) => product.id);
    }
}
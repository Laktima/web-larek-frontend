import { IBasketData, IProduct } from "../types"
import { IEvents } from "./base/events"

export class BasketData implements IBasketData {
    protected _products: IProduct[];
    protected _events: IEvents;
    protected _totalPrice: number;

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
      this._totalPrice += product.price;
   } 

   remove(id: string): void {
       const filtered = this._products.filter((product) => {
            return id !== product.id
       });
       this._products = filtered;
       this._totalPrice = this.getTotalPrice();
   }

   getTotalPrice(): number {
        return this._products.reduce((acc, product) => {
            return acc + product.price;
        }, 0);
   }

}
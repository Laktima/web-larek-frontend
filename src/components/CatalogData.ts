import { ICatalogData, IProduct } from "../types"
import { IEvents } from "./base/events"

export class CatalogData implements ICatalogData {
    protected _products: IProduct[];
    protected _events: IEvents;

    constructor(events: IEvents) {
        this._events = events;
    }

    set products(products: IProduct[]) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    getProduct(id: string): IProduct | null {
        let curProduct = null;
        this._products.forEach((product) => {
            if (product.id === id) {
                console.log(product.id, id)
                curProduct = product;
            }
        })
        return curProduct;
    }
}
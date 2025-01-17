import { Product } from "../components/Product";

export interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number | null; 
    image: string;
}

export interface IPayment {
    adress: string;
    telNum: string;
    email: string;
    paymentType: string;
}

export interface IBasketData {
    products: IProduct[];
    add(product: IProduct): void;
    remove(id: string): void;
}

export interface ICatalogData {
    products: IProduct[];
    getProduct(id: string): IProduct | null;
}

export interface IView {
    render(data?: object): HTMLElement;
}

/*interface IViewConstructor {
    new (container: HTMLElement, events?: IEventEmitter): IView;
}*/

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
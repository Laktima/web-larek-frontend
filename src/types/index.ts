export interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number | null; 
    image: string;
}

export interface IPayment {
    address: string;
    phone: string;
    email: string;
    payment: string;
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

export interface PaymentRequest extends IPayment {
    total: number;
    items: string[];
}

export interface PaymentResponse {
    total: number;
    id: string;
}

export type IProductResponse = {
    total: number;
    items: IProduct[];
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
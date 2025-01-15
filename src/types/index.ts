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
    items: Map<string, number>;
    add(id:string): void;
    remove(id: string): void;
    getTotalPrice(): number;
    goToPayment(): void;
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
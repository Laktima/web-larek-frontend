interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number | null; 
    image: string;
}

interface IPayment {
    adress: string;
    telNum: string;
    email: string;
    paymentType: string;
}

interface IBasketModel {
    items: Map<string, number>;
    add(id:string): void;
    remove(id: string): void;
    getTotalPrice(): number;
    goToPayment(): void;
}

interface CatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct;
}

interface IView {
    render(data?: object): HTMLElement;
}

interface IViewConstructor {
    new (container: HTMLElement, events?: IEventEmitter): IView;
}
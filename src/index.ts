import './scss/styles.scss';
import { CatalogData } from './components/CatalogData';
import { EventEmitter } from './components/base/events';
import { Product } from './components/Product';
import { IApi, IProduct } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { ProductsContainer } from './components/ProductsContainer';
import { Modal } from './components/common/Modal';
import { cloneTemplate } from './utils/utils';
import { ModalPreview, IModalPreview } from './components/ModalPreview';
import { BasketData } from './components/BasketData';
import { Basket } from './components/Basket';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalogData = new CatalogData(events);
const basketData = new BasketData(events);

const productCardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const productBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');

const gallaryContainer = new ProductsContainer(document.querySelector('.gallery'));
const basketContainer = new ProductsContainer(document.querySelector('.basket__list'));

const basketButton = document.querySelector('.header__basket');
const modalContainer = new Modal(document.querySelector('#modal-container'), events);

setTimeout(() => {
    const products = api.getCard();
    catalogData.products = products;
    events.emit('initialData:loaded');
}, 1000);

basketButton.addEventListener('click', () => {
    console.log('basket click');
    changeBasketData();
    modalContainer.open();
});

const changeBasketData = () => {
    const basket = new Basket(basketTemplate, events);
    basket.setPrice(basketData.getTotalPrice());
    const productsArray = basketData.products.map((product) => {
        const productCard = new Product(productBasketTemplate, events);
        return productCard.render(product);
    })
    const basketHTML = basketContainer.render({ catalog: productsArray});
    modalContainer.setContent(basket.render(basketHTML));
}

events.on('initialData:loaded', () => {
    const productsArray = catalogData.products.map((product) => {
        const productCard = new Product(productCardTemplate, events);
        return productCard.render(product);
    })
    gallaryContainer.render({ catalog: productsArray});
});

events.on('product:select', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    const productPreview = new Product(productPreviewTemplate, events);
    modalContainer.setContent(productPreview.render(catalogData.getProduct(productId)));
    modalContainer.open();
})

events.on('product:addBasket', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    const product = catalogData.getProduct(productId);
    basketData.add(product);
})

events.on('product:delete', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    basketData.remove(productId);
    changeBasketData();
})
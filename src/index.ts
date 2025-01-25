import './scss/styles.scss';
import { CatalogData } from './components/CatalogData';
import { EventEmitter } from './components/base/events';
import { Product } from './components/Product';
import { IApi, PaymentRequest } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { ProductsContainer } from './components/ProductsContainer';
import { Modal } from './components/common/Modal';
import { BasketData } from './components/BasketData';
import { Basket } from './components/Basket';
import { PaymentData } from './components/PaymentData';
import { Payment } from './components/Payment';
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalogData = new CatalogData(events);
const basketData = new BasketData(events);
const paymentData = new PaymentData();

const productCardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const productBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const gallaryContainer = new ProductsContainer(document.querySelector('.gallery'));

const modalContainer = new Modal(document.querySelector('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const payment = new Payment(orderTemplate, events);
const success = new Success(successTemplate, events);


api.getCards().then((res) => {
    const products = res.items;
    catalogData.products = products;
    events.emit('initialData:loaded');
}).catch((error) => console.log(error))

const changeBasketData = () => {
    basket.setPrice(basketData.getTotalPrice());
    const productsArray = basketData.products.map((product, index) => {
        const productCard = new Product(productBasketTemplate, events);
        return productCard.render(product, index+1);
    })
    basket.setBasketList(productsArray);
    modalContainer.setContent(basket.render());
    basket.setDisableOrderButton(basketData.getTotalPrice() === 0);
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
    if (basketData.checkProductInBasket(productId)) productPreview.disableAddButton();
    modalContainer.setContent(productPreview.render(catalogData.getProduct(productId)));
    modalContainer.open();
})

events.on('product:addBasket', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    const product = catalogData.getProduct(productId);
    basketData.add(product);
    basket.setBasketCounter(basketData.products.length);
})

events.on('product:delete', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    basketData.remove(productId);
    basket.setBasketCounter(basketData.products.length);
    changeBasketData();
})

events.on('basket:order', () => {
    modalContainer.setContent(payment.render());
})

events.on('payment:addresChange', (eventObject: { value: string, payment: Payment}) => {
    const { value, payment } = eventObject;
    paymentData.address = value;
    if (paymentData.paymentStepValidate()) payment.setEnableButton()
    else payment.setDisableButton();
})

events.on('payment:paymentType-change', (eventObject: { value: string, payment: Payment}) => {
    const { value, payment } = eventObject;
    paymentData.payment = value;
    if (paymentData.paymentStepValidate()) payment.setEnableButton()
    else payment.setDisableButton();
});

events.on('payment:nextButtonClick', () => {
    const contacts = new Contacts(contactsTemplate, events);
    modalContainer.setContent(contacts.render());
});

events.on('contacts:telNumChange', (eventObject: { value: string, contacts: Contacts }) => {
    const { value, contacts } = eventObject;
    paymentData.phone = value;
    if (paymentData.contactsStepValidate()) contacts.setEnableButton()
    else contacts.setDisableButton();
});

events.on('contacts:emailChange', (eventObject: { value: string, contacts: Contacts }) => {
    const { value, contacts } = eventObject;
    paymentData.email = value;
    if (paymentData.contactsStepValidate()) contacts.setEnableButton()
    else contacts.setDisableButton();
});

events.on('contacts:payButtonClick', () => {
    const requestData: PaymentRequest = {
        ...paymentData.getOrderData(), items: basketData.getList(), total: basketData.getTotalPrice()
    };
    api.buyProducts(requestData)
    .then((res) => {
        success.setTotalPrice(basketData.getTotalPrice());
        modalContainer.setContent(success.render());
        basketData.clearBasket();
        basket.setBasketCounter(basketData.products.length);
    })
    .catch((error) => console.log(error));
});

events.on('success:closeButtonClick', () => {
    modalContainer.close();
});

events.on('basketButton:click', () => {
    changeBasketData();
    basket.setBasketCounter(basketData.products.length);
    modalContainer.open();
});
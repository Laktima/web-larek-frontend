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
const basketContainer = new ProductsContainer(document.querySelector('.basket__list'));

const basketButton = document.querySelector('.header__basket');
const modalContainer = new Modal(document.querySelector('#modal-container'), events);

const basketCounter = document.querySelector('.header__basket-counter');

api.getCards().then((res) => {
    const products = res.items;
    catalogData.products = products;
    events.emit('initialData:loaded');
}).catch((error) => console.log(error))

const changeBasketData = () => {
    const basket = new Basket(basketTemplate, events);
    basket.setPrice(basketData.getTotalPrice());
    const productsArray = basketData.products.map((product, index) => {
        const productCard = new Product(productBasketTemplate, events);
        return productCard.render(product, index+1);
    })
    const basketHTML = basketContainer.render({ catalog: productsArray});
    modalContainer.setContent(basket.render(basketHTML));
    basket.setDisableOrderButton(basketData.getTotalPrice() === 0);
}

const changeBasketCounter = () => {
    basketCounter.textContent = basketData.products.length.toString();
}

const getOrderRequestData = (): PaymentRequest => {
    const ids = basketData.products.filter((product) => product.price !== null).map((product) => product.id);
    return {
        payment: paymentData._payment,
        email: paymentData._email,
        phone: paymentData._phone,
        address: paymentData._address,
        total: basketData.getTotalPrice(),
        items: ids,
    }
}

basketButton.addEventListener('click', () => {
    changeBasketData();
    modalContainer.open();
});

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
    changeBasketCounter()
})

events.on('product:delete', (eventObject: { productId: string}) => {
    const { productId } = eventObject;
    basketData.remove(productId);
    changeBasketCounter();
    changeBasketData();
})

events.on('basket:order', () => {
    const payment = new Payment(orderTemplate, events);
    modalContainer.setContent(payment.render());
})

events.on('payment:addresChange', (eventObject: { value: string, payment: Payment}) => {
    const { value, payment } = eventObject;
    paymentData._address = value;
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
    const requestData: PaymentRequest = getOrderRequestData();
    api.order(requestData)
    .then((res) => {
        const success = new Success(successTemplate, events, res.total);
        modalContainer.setContent(success.render());
        basketData.clearBasket();
        changeBasketCounter();
    })
    .catch((error) => console.log(error));
});

events.on('success:closeButtonClick', () => {
    modalContainer.close();
});
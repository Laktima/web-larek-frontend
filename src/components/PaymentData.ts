import { IPayment } from "../types"

export class PaymentData implements IPayment {
    _address: string;
    _phone: string;
    _email: string;
    _payment: string;

    constructor() {}

    set address(addres: string) {
        this._address = addres;
    }

    get address() {
        return this._address;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get phone() {
        return this._phone;
    }

    set email(email: string) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set payment(payment: string) {
        this._payment = payment;
    }

    get payment() {
        return this._payment;
    }

    paymentStepValidate() {
        return this._address && this._payment;
    }

    contactsStepValidate() {
        return this._phone && this._email;
    }
}
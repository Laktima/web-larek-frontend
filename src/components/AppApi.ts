import { IApi, PaymentRequest, IProductResponse, PaymentResponse } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCards(): Promise<IProductResponse> {
		return this._baseApi.get<IProductResponse>(`/product`).then((result: IProductResponse) => result);
	}

    order(data: PaymentRequest): Promise<PaymentResponse> {
		return this._baseApi.post<PaymentResponse>(`/order`, data, 'POST').then((result: PaymentResponse) => result);
	}
}
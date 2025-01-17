import { IApi, IProduct } from '../types';

const productList = [
 {
    id:  '1',
    title: 'kek',
    category: 'some',
    description: 'some description',
    price: 100,
    image: 'https://avatars.mds.yandex.net/i?id=679720f2a94327342bb6a0e160ce7bb8_l-8497208-images-thumbs&n=13'
},
{
    id:  '2',
    title: 'kgkg',
    category: 'were',
    description: 'some description',
    price: 500,
    image: 'https://avatars.mds.yandex.net/i?id=679720f2a94327342bb6a0e160ce7bb8_l-8497208-images-thumbs&n=13'
}

]

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	/*getCards(): Promise<IProduct[]> {
		return this._baseApi.get<IProduct[]>(`/cards`).then((cards: IProduct[]) => cards);
	}*/

    getCard(): IProduct[] {
        return productList;
    }
}
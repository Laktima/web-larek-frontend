import './scss/styles.scss';
import { CatalogData } from './components/CatalogData';
import { EventEmitter } from './components/base/events';
import { Product } from './components/Product';

const events = new EventEmitter();
const catalogData = new CatalogData(events);
const productCard = new Product(document.querySelector('#card-catalog'), events);

const lala = document.querySelector('.card_full');

catalogData.products = 
[{
    id:  '1',
    title: 'kek',
    category: 'some',
    description: 'some description',
    price: 100,
    image: '#'
},
{
    id:  '2',
    title: 'kgkg',
    category: 'were',
    description: 'some description',
    price: 500,
    image: '##'
}
];



console.log(catalogData.products);

console.log(catalogData.getProduct('2'))


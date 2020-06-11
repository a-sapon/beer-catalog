import beerServices from './beerServices';
import { createCartBeerItem } from './markupCreators';

const refs = {
  cart: document.querySelector('.cart'),
  overlay: document.getElementById('overlay-cart'),
  cartList: document.querySelector('.cart_list')
}

refs.cart.addEventListener('click', openModal);
refs.overlay.addEventListener('click', closeModal);
document.addEventListener('click', handleAddToCartClick);
refs.cartList.addEventListener('click', deleteBeerFromCart);

function openModal() {
  refs.overlay.classList.add('show-modal');
  refs.overlay.classList.remove('hide-modal');
  console.log(beerServices.addedToCartBeers)
}

function closeModal(e) {
  if (e.target === e.currentTarget || e.target.dataset.action === 'close-modal') {
    refs.overlay.classList.add('hide-modal');
    refs.overlay.classList.remove('show-modal');
    console.log(beerServices.addedToCartBeers)
  }
}

async function handleAddToCartClick(e) {
  if (e.target && e.target.name === 'addToCartInput') {
    await beerServices.addBeerToCart(e.target.id);
    refs.cartList.innerHTML = '';
    const markup = createCartBeerItem(beerServices.addedToCartBeers);
    refs.cartList.insertAdjacentHTML('beforeend', markup);
  }
}

function deleteBeerFromCart(e) {
  if (e.target.id === 'delete') {
    const id = e.target.dataset.id;
    beerServices.deleteBeerFromCart(id);
  }
}
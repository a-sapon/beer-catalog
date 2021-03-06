import beerServices from './beerServices';
import { createCartBeerItem } from './markupCreators';

const refs = {
  cart: document.querySelector('.cart'),
  overlay: document.getElementById('overlay-cart'),
  cartList: document.querySelector('.cart_list'),
};

refs.cart.addEventListener('click', openModal);
refs.overlay.addEventListener('click', closeModal);
document.addEventListener('click', handleAddToCartClick);
refs.cartList.addEventListener('click', deleteBeerFromCart);

function openModal() {
  refs.overlay.classList.add('show-modal');
  refs.overlay.classList.remove('hide-modal');
  if (beerServices.addedToCartBeers.length === 0) {
    refs.cartList.innerHTML = '';
    refs.cartList.insertAdjacentHTML(
      'beforeend',
      "<li>You haven't added any products yet.</li>",
    );
  }
}

function closeModal(e) {
  if (
    e.target === e.currentTarget ||
    e.target.dataset.action === 'close-modal'
  ) {
    refs.overlay.classList.add('hide-modal');
    refs.overlay.classList.remove('show-modal');
  }
}

async function handleAddToCartClick(e) {
  if (e.target && e.target.name === 'addToCartInput') {
    if (e.target.checked === true) {
      await beerServices.addBeerToCart(Number(e.target.id));
      updateCartList();
    } else {
      beerServices.deleteBeerFromCart(Number(e.target.id));
      updateCartList();
    }
  }
}

function updateCartList() {
  refs.cartList.innerHTML = '';
  const markup = createCartBeerItem(beerServices.addedToCartBeers);
  refs.cartList.insertAdjacentHTML('beforeend', markup);
}

function deleteBeerFromCart(e) {
  if (e.target.id === 'delete') {
    const id = Number(e.target.dataset.id);
    beerServices.deleteBeerFromCart(id);
    updateCartList();
    const deletedBeerInput = document.getElementById(id);
    deletedBeerInput.checked = false;

    if (beerServices.addedToCartBeers.length === 0) {
      refs.cartList.insertAdjacentHTML(
        'beforeend',
        "<li>You haven't added any products yet.</li>",
      );
    }
  }
}
'use strict';

import './services/register';
import './services/cart';
import beerServices from './services/beerServices';
import {
  createBeerCard,
  createPageButtonMarkup,
  createNoProductDiv,
} from './services/markupCreators';
const debounce = require('lodash.debounce');
import './styles.css';

const refs = {
  sortForm: document.querySelector('.sort-form'),
  beersList: document.getElementById('beers_list'),
  paginationContainer: document.querySelector('.pagination'),
  paginationList: document.getElementById('pagination-list'),
  noProductWrapper: document.querySelector('.no-product-wrapper'),
  searchInput: document.querySelector('.search-input')
};

window.addEventListener('DOMContentLoaded', loadStartPage);
refs.sortForm.addEventListener('change', handleSelect);
refs.sortForm.addEventListener('click', resetFilters);
refs.paginationList.addEventListener('click', displaySelectedPage);

async function loadStartPage() {
  await displayBeers();
}

async function displayBeers() {
  const beers = await beerServices.fetchBeers();
  if (beers.length !== 0) {
    const markup = createBeerCard(beers);
    insertToDom(markup);
    refs.noProductWrapper.innerHTML = '';
  } else {
    refs.noProductWrapper.innerHTML = '';
    refs.beersList.innerHTML = '';
    const noProductDiv = createNoProductDiv();
    refs.noProductWrapper.append(noProductDiv);
    refs.paginationContainer.removeEventListener('click', handleArrowClick);
  }
  setUpPagination();
}

function insertToDom(markup) {
  refs.beersList.innerHTML = '';
  refs.beersList.insertAdjacentHTML('beforeend', markup);
}

async function handleSelect(e) {
  const ibu = e.currentTarget.elements.ibu;
  const abv = e.currentTarget.elements.abv;
  const ebc = e.currentTarget.elements.ebc;

  if (ibu.value || abv.value || ebc.value) {
    beerServices.setIbuValue(ibu.value);
    beerServices.setAbvValue(abv.value);
    beerServices.setEbcValue(ebc.value);
    beerServices.resetPage();
    await displayBeers();
  }
}

async function resetFilters(e) {
  if (!e.target.id) return;
  if (e.target.id === 'abv-reset') {
    beerServices.resetAbvValue();
    refs.sortForm.elements.abv.value = '';
    await displayBeers();
  } else if (e.target.id === 'ibu-reset') {
    beerServices.resetIbuValue();
    refs.sortForm.elements.ibu.value = '';
    await displayBeers();
  } else if (e.target.id === 'ebc-reset') {
    beerServices.resetEbcValue();
    refs.sortForm.elements.ebc.value = '';
    await displayBeers();
  }
  beerServices.resetPage()
  setUpPagination();
}

function setUpPagination() {
  refs.paginationList.innerHTML = '';
  const pagesNumber = beerServices.getPagesNumber();
  if (pagesNumber === 0) return;
  for (let i = 1; i < pagesNumber + 1; i++) {
    const btn = createPageButtonMarkup(i);
    refs.paginationList.append(btn);
  }
  refs.paginationContainer.addEventListener('click', handleArrowClick);
}

async function displaySelectedPage(e) {
  if (e.target === e.currentTarget) return;
  const clickedPageNumber = Number(e.target.innerHTML);
  beerServices.setCurrentPage(clickedPageNumber);
  await displayBeers();
}

async function handleArrowClick(e) {
  if (e.target.dataset.arrow === 'left') {
    beerServices.decrementPage();
    await displayBeers();
  }
  if (e.target.dataset.arrow === 'right') {
    beerServices.incrementPage();
    await displayBeers();
  }
}

// ---------- Search ----------

(async () => await beerServices.fetchAllBeers())();

const delay = debounce(async function handleSearchInputChange(e) {
  if (e.target.value !== '') {
    const filteredBeers = beerServices.allBeers.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    const markup = createBeerCard(filteredBeers);
    insertToDom(markup);
    refs.paginationList.innerHTML = '';
    refs.paginationContainer.removeEventListener('click', handleArrowClick);
  } else await displayBeers();
}, 1000);

refs.searchInput.addEventListener('input', delay);
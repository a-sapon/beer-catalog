import beerServices from './services/services';
import './styles.css';

const refs = {
  sortForm: document.querySelector('.sort-form'),
  beersList: document.getElementById('beers_list'),
  paginationContainer: document.querySelector('.pagination'),
  paginationList: document.getElementById('pagination-list'),
  mainContainer: document.querySelector('.main-container'),
};

window.addEventListener('DOMContentLoaded', loadStartPage);
refs.sortForm.addEventListener('change', handleSelect);
refs.paginationList.addEventListener('click', displaySelectedPage);

async function loadStartPage() {
  await displayBeers();
}

async function displayBeers() {
  refs.beersList.innerHTML = '';
  const beers = await beerServices.fetchBeers();

  if (beers.length !== 0) {
    const markup = createMarkup(beers);
    refs.beersList.insertAdjacentHTML('beforeend', markup);
    const noProductDiv = document.querySelector('.no-product');
    if (noProductDiv !== null) {
      noProductDiv.remove();
    }
  } else {
    const noProductDiv = createNoProductDiv();
    refs.mainContainer.insertBefore(noProductDiv, refs.beersList);
    refs.paginationContainer.removeEventListener('click', handleArrowClick);
  }
  setUpPagination();
}

async function handleSelect(e) {
  const ibuValue = e.currentTarget.elements.ibu.value;
  const abvValue = e.currentTarget.elements.abv.value;
  const ebcValue = e.currentTarget.elements.ebc.value;
  if (ibuValue || abvValue || ebcValue) {
    beerServices.setIbuValue(ibuValue);
    beerServices.setAbvValue(abvValue);
    beerServices.setEbcValue(ebcValue);
    await displayBeers();
  }
}

function createMarkup(arr) {
  const markup = arr.reduce((acc, value) => {
    const beerIbu = convertBeerIbuToWords(value);
    const beerEbc = convertBeerEbcToWords(value);
    return (acc += `
    <li class="beer_item">
      <img src="${value.image_url}" class="beer_item-img" alt="beer img">
      <h3 class="beer_item-title">${value.name}</h3>
      <p class="beer_item-tag">#${value.tagline}</p>
      <table>
        <tr>
          <td>Alc/vol:</td>
          <td>${value.abv}%</td>
        </tr>
        <tr>
          <td>Bitterness level:</td>
          <td>${beerIbu}</td>
        </tr>
        <tr>
          <td>Beer color:</td>
          <td>${beerEbc}</td>
        </tr>
      </table>
    </li>
    `);
  }, '');
  // <a href="#" class="add-btn">Add to cart</a>
  return markup;
}

function convertBeerIbuToWords(beer) {
  let beerIbu;
  if (beer.ibu < 10 || beer.ibu === null) beerIbu = 'Pale lager';
  if (beer.ibu > 9 && beer.ibu < 30) beerIbu = 'Blond ale';
  if (beer.ibu > 29 && beer.ibu < 50) beerIbu = 'Red ale';
  if (beer.ibu > 49 && beer.ibu < 100) beerIbu = 'Porter';
  if (beer.ibu > 99) beerIbu = 'Stout'
  return beerIbu;
}

function convertBeerEbcToWords(beer) {
  let beerEbc;
  if (beer.ebc > 0 && beer.ebc < 8) beerEbc = 'Pale/blond';
  if (beer.ebc > 7 && beer.ebc < 20) beerEbc = 'Yellow/gold';
  if (beer.ebc > 19 && beer.ebc < 39) beerEbc = 'Amber/copper';
  if (beer.ebc > 38 && beer.ebc < 69) beerEbc = 'Dark coper/brown';
  if (beer.ebc > 68) beerEbc = 'Dark brown/black';
  return beerEbc
}

function setUpPagination() {
  refs.paginationList.innerHTML = '';
  const pagesNumber = beerServices.getPagesNumber();
  if (pagesNumber === 0) return;
  for (let i = 1; i < pagesNumber + 1; i++) {
    createPageButtonMarkup(i);
  }
  refs.paginationContainer.addEventListener('click', handleArrowClick);
}

function createPageButtonMarkup(page) {
  const button = document.createElement('button');
  button.classList.add('page-btn');
  button.innerText = page;
  if (Number(button.innerText) === beerServices.current_page) {
    button.classList.add('active');
  }
  refs.paginationList.append(button);
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

function createNoProductDiv() {
  const textDiv = document.createElement('div');
  textDiv.classList.add('no-product');
  textDiv.innerText =
    "Sorry, we don't have any products matching your request.";
  return textDiv;
}

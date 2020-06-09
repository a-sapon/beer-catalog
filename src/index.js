import beerServices from './services/services';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './styles.css';

const refs = {
  beersList: document.getElementById('beers_list'),
  paginationContainer: document.querySelector('.pagination'),
  paginationList: document.getElementById('pagination-list'),
};

window.addEventListener('DOMContentLoaded', loadStartPage);
refs.paginationList.addEventListener('click', displaySelectedPage);
refs.paginationContainer.addEventListener('click', handleArrowClick);

async function loadStartPage() {
  await displayBeers();
}

async function displayBeers() {
  refs.beersList.innerHTML = '';
  const beers = await beerServices.fetchBeers();
  const markup = createMarkup(beers);
  refs.beersList.insertAdjacentHTML('beforeend', markup);
  setUpPagination();
}

function createMarkup(arr) {
  const markup = arr.reduce((acc, value) => {
    return (acc += `
    <li class="beer_item">
      <img src="${value.image_url}" class="beer_item-img" alt="beer img">
      <h3 class="beer_item-title">${value.name}</h3>
      <p class="beer_item-tag">#${value.tagline}</p>

      <table>
        <tr>
          <td>light/dark/weat:</td>
          <td>${value.ebc}</td>
        </tr>
        <tr>
          <td>Bitterness level:</td>
          <td>${value.ibu}</td>
        </tr>
        <tr>
          <td>Alc/vol:</td>
          <td>${value.abv}%</td>
        </tr>
      </table>
      
    </li>
    `);
  }, '');
  // <a href="#" class="add-btn">Add to cart</a>
  return markup;
}

function setUpPagination() {
  refs.paginationList.innerHTML = '';
  const pagesNumber = beerServices.getPagesNumber();
  for (let i = 1; i < pagesNumber + 1; i++) {
    createPageButtonMarkup(i);
  }
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

// filter using abv for alco %
// filter using ibu for bitterness level
// filter using ebc for light/dark/weat

import beerServices from './beerServices';
import beerImage from '../images/beer.png';

export const createBeerCard = arr => {
  const markup = arr.reduce((acc, value) => {
    const beerIbu = convertBeerIbuToWords(value);
    const beerEbc = convertBeerEbcToWords(value);
    let beerImg;
    if (value.image_url) {
      beerImg = value.image_url;
    } else {
      beerImg = beerImage;
    }
    return (acc += `
    <li class="beer_item">
      <img src="${beerImg}" class="beer_item-img" alt="img">
      <h3 class="beer_item-title">${value.name}</h3>
      <p class="beer_item-tag">#${value.tagline}</p>
      <table>
        <tr>
          <td>Alc/vol:</td>
          <td>${value.abv}%</td>
        </tr>
        <tr>
          <td>Bitterness lvl:</td>
          <td>${beerIbu}</td>
        </tr>
        <tr>
          <td>Beer color:</td>
          <td>${beerEbc}</td>
        </tr>
      </table>
      <div class="add-to-cart-wrapper">
        <label for="${value.id}" class="add-to-cart">Add to cart
          <input type="checkbox" name="addToCartInput" id="${value.id}">
          <span class="checkmark"></span>
        </label>
      </div>
    </li>
    `);
  }, '');
  return markup;
};

function convertBeerIbuToWords(beer) {
  let beerIbu;
  if (beer.ibu < 10 || beer.ibu === null) beerIbu = 'Pale lager';
  if (beer.ibu > 9 && beer.ibu < 30) beerIbu = 'Blond ale';
  if (beer.ibu > 29 && beer.ibu < 50) beerIbu = 'Red ale';
  if (beer.ibu > 49 && beer.ibu < 100) beerIbu = 'Porter';
  if (beer.ibu > 99) beerIbu = 'Stout';
  return beerIbu;
}

function convertBeerEbcToWords(beer) {
  let beerEbc;
  if (beer.ebc > 0 && beer.ebc < 8) beerEbc = 'Pale/blond';
  if (beer.ebc > 7 && beer.ebc < 20) beerEbc = 'Yellow/gold';
  if (beer.ebc > 19 && beer.ebc < 39) beerEbc = 'Amber/copper';
  if (beer.ebc > 38 && beer.ebc < 69) beerEbc = 'Dark coper/brown';
  if (beer.ebc > 68) beerEbc = 'Dark brown/black';
  return beerEbc;
}

export const createPageButtonMarkup = page => {
  const button = document.createElement('button');
  button.classList.add('page-btn');
  button.innerText = page;
  if (Number(button.innerText) === beerServices.current_page) {
    button.classList.add('active');
  }
  return button;
};

export const createNoProductDiv = () => {
  const textDiv = document.createElement('div');
  textDiv.classList.add('no-product');
  textDiv.innerText =
    "Sorry, we don't have any products matching your request.";
  return textDiv;
};

export const createCartBeerItem = arr => {
  const markup = arr.reduce((acc, value) => {
    let beerImg;
    if (value.image_url) {
      beerImg = value.image_url;
    } else {
      beerImg = beerImage;
    }
    return (acc += `
    <li class="cart_list-item">
      <div class="item-info">
        <img src="${beerImg}" alt="img">
        <h3 class="beer_item-title">${value.name}</h3>
      </div>
      <svg id="delete" data-id="${value.id}" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path data-id="${value.id}" id="delete" d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/></svg>
    </li>
    `);
  }, '');
  return markup;
};

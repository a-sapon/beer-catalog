import beerServices from "./beerServices";

export const createMarkup = arr => {
  const markup = arr.reduce((acc, value) => {
    const beerIbu = convertBeerIbuToWords(value);
    const beerEbc = convertBeerEbcToWords(value);
    let beerImg;
    if (value.image_url !== null) {
      beerImg = value.image_url;
    } else {
      beerImg = './images/beer.png';
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

export const createPageButtonMarkup = (page) => {
  const button = document.createElement('button');
  button.classList.add('page-btn');
  button.innerText = page;
  if (Number(button.innerText) === beerServices.current_page) {
    button.classList.add('active');
  }
  return button;
}

export const createNoProductDiv = () => {
  const textDiv = document.createElement('div');
  textDiv.classList.add('no-product');
  textDiv.innerText =
    "Sorry, we don't have any products matching your request.";
  return textDiv;
}
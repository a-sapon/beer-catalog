const baseUrl = 'https://api.punkapi.com/v2/';

export default {
  current_page: 1,
  items_per_page: 6,
  total_beers_num: 325,
  abv: '',
  ibu: '',
  ebc: '',
  allBeers: [],
  addedToCartBeers: [],

  async fetchBeers() {
    const response = await fetch(
      `${baseUrl}beers?page=${this.current_page}&per_page=${this.items_per_page}${this.abv}${this.ibu}${this.ebc}`,
    );
    if (this.abv !== '' || this.ibu !== '' || this.ebc !== '') {
      const responseAll = await fetch(
        `${baseUrl}beers?${this.abv}${this.ibu}${this.ebc}&per_page=80`,
      );
      const result = await responseAll.json();
      this.total_beers_num = result.length;
    } else if (this.abv === '' && this.ibu === '' && this.ebc === '') {
      this.total_beers_num = 325;
    }
    return await response.json();
  },

  async fetchAllBeers() {
    for (let i = 1; i < 6; i++) {
      const response = await fetch(
        `${baseUrl}beers?page=${i}&per_page=80${this.abv}${this.ibu}${this.ebc}`,
      );
      const result = await response.json();
      this.allBeers = [...this.allBeers, ...result];
    }
  },

  async addBeerToCart(id) {
    const response = await fetch(`${baseUrl}beers/${id}`);
    const result = await response.json();
    this.addedToCartBeers = [...this.addedToCartBeers, ...result];
  },

  deleteBeerFromCart(id) {
    this.addedToCartBeers = this.addedToCartBeers.filter(
      beer => beer.id !== id,
    );
  },

  setCurrentPage(page) {
    this.current_page = page;
  },

  incrementPage() {
    const lastPage = this.getPagesNumber();
    if (this.current_page === lastPage) {
      this.current_page = 1;
    } else {
      this.current_page += 1;
    }
  },

  decrementPage() {
    if (this.current_page === 1) {
      const lastPage = this.getPagesNumber();
      this.current_page = lastPage;
    } else {
      this.current_page -= 1;
    }
  },

  resetPage() {
    this.current_page = 1;
  },

  getPagesNumber() {
    return Math.ceil(this.total_beers_num / this.items_per_page);
  },

  setAbvValue(value) {
    this.abv = value;
  },

  resetAbvValue() {
    this.abv = '';
  },

  setIbuValue(value) {
    this.ibu = value;
  },

  resetIbuValue() {
    this.ibu = '';
  },

  setEbcValue(value) {
    this.ebc = value;
  },

  resetEbcValue() {
    this.ebc = '';
  },
};
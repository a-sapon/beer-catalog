const baseUrl = 'https://api.punkapi.com/v2/';

export default {
  current_page: 1,
  items_per_page: 4,
  total_beers_num: 80,

  async fetchBeers() {
    const response = await fetch(
      `${baseUrl}beers?page=${this.current_page}&per_page=${this.items_per_page}`,
    );
    return await response.json();
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

  getPagesNumber() {
    return Math.ceil(this.total_beers_num / this.items_per_page);
  },
};

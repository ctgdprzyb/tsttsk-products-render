const URL = 'https://dummyjson.com/products';

// 'https://dummyjson.com/products?limit=10&skip=10&select=title,price'

export async function fetchProductList(skippedProducts = 0) {
  return fetch(URL + '?limit=10&skip=' + skippedProducts)
    .then(response => {
      if (!response.ok) {
        throw new Error('cant fetch');
      }

      console.log('returning a response')
      return response.json();
    })
}

export async function fetchProductsByName(query = '', skippedProducts = 0) {
  return fetch(URL + '/search?q=' + query + '&limit=10&skip=' + skippedProducts)
    .then(response => {
      if (!response.ok) {
        throw new Error('cant fetch');
      }

      console.log('returning search result')
      return response.json();
    })
}
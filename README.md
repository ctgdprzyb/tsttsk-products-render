# Product list/search
A paginated list of products using data from dummyJSON's ['products' API](https://dummyjson.com/docs/products). Created as a part of a recruitment task.

* [Demo link](https://ctgd.xyz/tsttsk-products-render/)

## Features

* fetches up to 10 products from the API
* displays their ID, title and price in a table
* can [search](https://dummyjson.com/docs/products#search) for products in the API
* basic pagination
* can request detailed info or send a [DELETE](https://dummyjson.com/docs/products) request per product
  * (the API doesn't allow for actual deletion - response is logged in the console)
* shows a modal when requesting additional info or failing a fetch request

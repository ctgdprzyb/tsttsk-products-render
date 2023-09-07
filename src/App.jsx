import { useEffect, useState } from 'react'
import { deleteProduct, fetchProductsByName } from '../utils/fetchData'
import { useDebounce } from '../utils/debounce';
import { ProductDetails } from './components/productDetails';
import { NoConnectionModal } from './components/noConnectionModal';

function App() {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [inputValue, setInputValue] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [inspectedProduct, setInspectedProduct] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    fetchProductsByName(filterQuery)
    .then(response => {
      setProducts(response);
      setTotalPages(Math.trunc((response.total - 1) / 10 + 1))
    })
    .catch(() => setErrorStatus(true));
  }, [filterQuery]);

  const handlePageChange = (page) => {
    setProducts();
    setCurrentPage(page);
    
    fetchProductsByName(filterQuery, (page - 1) * 10)
    .then(response => {
      setProducts(response);
    });
  }
  
  const debouncedFetch = useDebounce(() => {
    setCurrentPage(1);
    setProducts();
    setFilterQuery(inputValue);
  })

  const handleSearch = (query) => {
    setInputValue(query);
    debouncedFetch();
  }

  const handleDeletion = (id) => {
    deleteProduct(id)
      .then(response => {
        console.log(response);
        const newProdList = products.products.filter(
          prod => prod.id !== id
        );
        
        setProducts({
          ...products,
          products: newProdList
        })
      })
      .catch(() => setErrorStatus(true));
  }

  return (
    <div className='max-w-7xl mx-auto text-center p-8'>
      <h1 className='text-3xl font-bold mb-8'>Products app</h1>

    {errorStatus ? <NoConnectionModal setErrorStatus={setErrorStatus} /> : null}

      {inspectedProduct
      ? <ProductDetails
        product={inspectedProduct}
        setInspectedProduct={setInspectedProduct}
        setErrorStatus={setErrorStatus} />
      : null}

      <input
        className='mb-8 border-2 border-slate-600 rounded-md'
        type="text"
        placeholder='Filter by name...'
        value={inputValue}
        onChange={(event) => handleSearch(event.target.value)}
        name="filter"
        id="filter"
      />

      <div className='border-double border-rose-700 border-8 rounded-md'>


        {/* THE PRODUCT TABLE */}

        {!products ? <p>Loading...</p> :
        <table className='table-auto w-full mb-4 border-collapse'>
          <thead className='bg-slate-400'>
            <tr>
              <th className='border-x border-rose-600'>ID</th>
              <th className='border-x border-rose-600'>Title</th>
              <th className='border-x border-rose-600'>Price</th>
              <th className='border-x border-rose-600'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-slate-200'>
            {products.products.map((product) => {
              return (<tr key={product.id}>
                <td
                className='border-rose-600 border py-1 border-l-0'
                >
                  {product.id}
                </td>
                <td className='border-rose-600 border py-1'>{product.title}</td>
                <td className='border-rose-600 border py-1'>{product.price}</td>
                <td
                className='border-rose-600 border py-1 border-r-0 text-center'
                >
                  <select
                  className='bg-slate-300 rounded-sm'
                  name="Actions"
                  id="actions"
                  value={""}
                  readOnly>
                    <option value="">--</option>

                    <option
                    value="info"
                    onClick={() => setInspectedProduct(product.id)}
                    >Info</option>

                    <option
                    value="delete"
                    onClick={() => handleDeletion(product.id)}
                    >
                      Delete
                    </option>
                  </select>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
        }

        {/* THE PAGINATION */}

        {Array.from({length: totalPages}).map((_, index) => 
          <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className='border mx-1 w-8 rounded-xl'
          >
            {index + 1}
          </button>
        )}

        <div>current page: {currentPage}</div>
        <div>total products: {products ? products.total : 'none'}</div>
      </div>
    </div>
  )
}

export default App

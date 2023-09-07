import { useEffect, useState } from 'react'
import './App.css'
import { deleteProduct, fetchProductsByName } from '../utils/fetchData'
import { useDebounce } from '../utils/debounce';
import { ProductDetails } from './components/productDetails';

function App() {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [inputValue, setInputValue] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [inspectedProduct, setInspectedProduct] = useState(null);

  useEffect(() => {
    fetchProductsByName(filterQuery)
    .then(response => {
      setProducts(response);
      setTotalPages(Math.trunc((response.total - 1) / 10 + 1))
    })
    .catch(() => console.log('fetch fail'));
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
      .catch(() => console.log('delete fail'));
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Products app</h1>

      {inspectedProduct
      ? <ProductDetails
        product={inspectedProduct} setInspectedProduct={setInspectedProduct} />
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
        <table className='table-auto w-full mb-4'>
          <thead className='bg-slate-400'>
            <tr>
              <th className='border-x border-rose-700'>ID</th>
              <th className='border-x border-rose-700'>Title</th>
              <th className='border-x border-rose-700'>Price</th>
              <th className='border-x border-rose-700'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-slate-200'>
            {products.products.map((product) => {
              return (<tr key={product.id}>
                <td className='border-rose-600 border py-1'>{product.id}</td>
                <td className='border-rose-600 border py-1'>{product.title}</td>
                <td className='border-rose-600 border py-1'>{product.price}</td>
                <td className='border-rose-600 border py-1 text-center'>
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
        
        {/* <button
        onClick={() => handlePageChange(currentPage - 1)}
        className='border-2 mx-1'
        >
          prev page
        </button>
        <button
        onClick={() => handlePageChange(currentPage + 1)}
        className='border-2 mx-1'
        >
          next page
        </button> */}

        {/* DETAILS */}

        <div>current page: {currentPage}</div>
        <div>total products: {products ? products.total : 'none'}</div>
      </div>
    </>
  )
}

export default App

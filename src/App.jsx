import { useEffect, useState } from 'react'
import './App.css'
import { fetchWorldState } from '../api/fetchData'

function App() {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    fetchWorldState()
          .then(response => {
            console.log('initial products fetch');
            setProducts(response);
            setTotalPages(Math.trunc(response.total / 10))
          })
          .catch(() => console.log('fetch fail'));
  }, []);

  const handlePageChange = (page) => {
    setProducts();
    setCurrentPage(page);

    fetchWorldState((page - 1) * 10)
      .then(response => {
        console.log('fetching more products');
        setProducts(response);
      });
  }

  console.log(currentPage);
  console.log('total pages vs total items ' + totalPages + ' ' + products?.total)

  // const pages = [];

  // if (products) {
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(i);
  //     console.log('pages lgnth' + (pages.length + 1));
  //   }
  // }


  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Products app</h1>
      <div className='border-double border-rose-700 border-8 rounded-md'>

        {/* THE PRODUCT TABLE */}

        {!products ? <p>Loading...</p> :
        <table className='table-auto w-full mb-4'>
          <thead className='bg-slate-400'>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((product) => {
              return (<tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td className='text-center'>
                  <select name="Actions" id="actions">
                    <option value="">--</option>
                    <option value="info">Info</option>
                    <option value="delete">Delete</option>
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
          className='border mx-1 w-8'
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

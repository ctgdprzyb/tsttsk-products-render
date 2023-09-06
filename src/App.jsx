import { useEffect, useState } from 'react'
import './App.css'
import { fetchWorldState } from '../api/fetchData'

function App() {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchWorldState()
          .then(response => {
            console.log('setting worldstate');
            setProducts(response);
          })
          .catch(() => console.log('fetch fail'));
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Products app</h1>
      <div className='border-double border-rose-700 border-8 rounded-md'>
        {!products ? <p>Loading...</p> :
        <table className='table-auto w-full'>
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
      </div>
    </>
  )
}

export default App

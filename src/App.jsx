import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <h1 className='text-3xl font-bold'>Products app</h1>
    </>
  )
}

export default App

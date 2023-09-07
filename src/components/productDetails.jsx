/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { fetchProductDetails } from "../../utils/fetchData"

export function ProductDetails({ product, setInspectedProduct }) {
  const [prodDetails, setProdDetails] = useState();

  useEffect(() => {
    fetchProductDetails(product)
      .then(response => setProdDetails(response))
  }, [product])

  return (
  <div
  className="h-full w-full bg-opacity-80 absolute inset-0 bg-black flex"
  >
    <div className="
    align-middle p-3 m-auto opacity rounded-md bg-white max-h-96"
    >
      {prodDetails
      ? <>
      <div className="flex justify-between">
        <h2 className="text-2xl">{prodDetails.title}</h2>
        <button
         onClick={() => setInspectedProduct(0)}
        >
          x
        </button>
      </div>
      <p>{prodDetails.description}</p>
      <p>Price: {prodDetails.price} PLN</p>
      </>
      : <p>Loading...</p>}
    
    </div>
  </div>
  )
}


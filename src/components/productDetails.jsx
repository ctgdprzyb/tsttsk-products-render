/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { fetchProductDetails } from "../../utils/fetchData"

export function ProductDetails({
  product, setInspectedProduct, setErrorStatus
  }) {
  const [prodDetails, setProdDetails] = useState();

  useEffect(() => {
    fetchProductDetails(product)
      .then(response => setProdDetails(response))
      .catch(() => setErrorStatus(true))
  }, [product])

  return (
  <div
  className="h-full w-full bg-opacity-80 absolute inset-0 bg-black flex"
  >
    <div className="
    max-w-lg align-middle p-5 m-auto opacity rounded-md bg-white max-h-96"
    >
      {prodDetails
      ? <>
      <div className="flex justify-between">
        <h2 className="text-2xl text-left">{prodDetails.title}</h2>
        <button
        className="relative text-right -top-4 -right-2"
          onClick={() => setInspectedProduct(0)}
        >
          x
        </button>
      </div>
      <p>{prodDetails.description}</p>
      <div className="flex justify-center">
        {prodDetails.images.map(image => (
        <img key={image} src={image} className="h-12"></img>
        ))}
      </div>
      <p>Price: {prodDetails.price} PLN</p>
      </>
      : <p>Loading...</p>}
    
    </div>
  </div>
  )
}


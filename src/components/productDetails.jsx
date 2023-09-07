/* eslint-disable react/prop-types */

export function ProductDetails({ product, setInspectedProduct }) {

  return (
  <div
  className="h-full w-full opacity-50 absolute inset-0 bg-black"
  >
    <div className="container mx-auto rounded-md bg-slate-50">
    <p>
    Hello! This is {product}
    </p>
      <button onClick={() => setInspectedProduct(0)}>CLOSE</button>
    </div>
  </div>
  )
}


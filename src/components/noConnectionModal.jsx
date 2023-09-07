/* eslint-disable react/prop-types */
export function NoConnectionModal({ setErrorStatus }) {

  return (
  <div
  className="h-full w-full bg-opacity-80 absolute inset-0 bg-black flex"
  >
    <div className="
    max-w-lg align-middle p-5 m-auto opacity rounded-md bg-white max-h-96"
    >
      <p>Sorry, we&apos;re unable to reach the servers at the moment.</p>
      <button
          onClick={() => setErrorStatus(false)}
          className='border mx-1 mt-2 px-2 rounded-xl'
          >
            Close
      </button>
    </div>
  </div>
  )
}


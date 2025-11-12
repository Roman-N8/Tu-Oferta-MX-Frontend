import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex-1 items-center align-middle  app bg-gray-100 min-h-screen p-10'>
        <div className="mt-10 p-5 bg-blue-500 text-white">
        This is a Tailwind CSS styled div!
      </div>
      <div className="mt-5 p-5 bg-green-500 text-white">
        <button className="bg-white text-green-500 px-4 py-2 rounded" onClick={() => setCount((count) => count + 1)}>
          ++ count is {count}
        </button>
        <button className="bg-white text-green-500 px-4 py-2 rounded" onClick={() => setCount((count) => count - 1)}>
          -- count is {count}
        </button>
      </div>
      </div>
    </>
  )
}

export default App

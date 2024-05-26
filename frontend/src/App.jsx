import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <main>

      <Outlet />
    </main>
    
    </>
  )
}

export default App

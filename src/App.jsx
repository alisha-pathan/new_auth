import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login, Register } from './pages'
import Robo from './spinners/robo'
import { router } from './routes/Router'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      {/* <Login /> */}
      {/* <Register /> */}

      <RouterProvider router={router} />
    </>
  )
}

export default App

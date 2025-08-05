import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login, Register } from './pages'
import Robo from './spinners/robo'
import { router } from './routes/Router'
import { RouterProvider } from 'react-router-dom'
import { DarkModeProvider } from './components/DarkModeContext'

function App() {

  return (
    <DarkModeProvider>
      {/* <Login /> */}
      {/* <Register /> */}

      <RouterProvider router={router} />
    </DarkModeProvider>
  )
}

export default App



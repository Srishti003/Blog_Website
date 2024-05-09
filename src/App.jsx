import React, { useState, useEffect , useRef} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main className ='flex flex-wrap justify-center bg-gradient-to-r from-gray-500 to-gray-300'>
          <div className = "font-bold text-2xl text-white italic bg-slate-700 border rounded-xl p-4 mt-5"> All Posted Articles </div>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
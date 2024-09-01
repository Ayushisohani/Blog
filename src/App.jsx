import {useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth.js'
import {login,logout} from "./store/authSlice"
import  Footer  from './Components/Footer/Footer.jsx'
import Header from './Components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, []) 
  
  return !loading ? (
    <div className='min-h-screen max-w-full flex flex-wrap content-between bg-gradient-to-l from-blue-100 via-white to-blue-100'>
      <div className='w-full block'>
        <Header />
        <main className='bg-gradient-to-l from-blue-100 via-white to-blue-100'>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App


import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice'


function Logout() {
    const dispactch = useDispatch()
    const logOutHandler = () => {
        authservice.logout().then(() => {
            dispactch(logout())
        })
    }
  return (
   <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-lx bg-blue-950 text-xl' onClick={logOutHandler}>
    Logout</button>
  )
}

export default Logout


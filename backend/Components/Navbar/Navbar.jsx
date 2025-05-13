import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { checkAuthApi } from '../../APIs/GoogleApi';
import UseAvatar from './Avatars/UseAvatar';


function Navbar() {
  const [user, setUser] = useState(null);


  const fetchUser = async () => {
    try {
      const response = await checkAuthApi();
      if (response?.data?.success && response?.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
    const handleAuthChange = () => {
      fetchUser();
    }
    window.addEventListener('auth-success', handleAuthChange);
    return () => {
      window.removeEventListener('auth-success', handleAuthChange);
    }
  }, []);



  return (
    <div className="flex justify-between items-center p-4 bg-gray-400">
      <div className=" bg-gray-400 flex  justify-start  space-x-8 p-4 items-center">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "text-[rgba(0, 59, 118, 0.76)]  font-bold" : "text-brown font-meduim"
        }>
          Home
        </NavLink>

        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "text-[rgba(0, 59, 118, 0.76)]  font-bold" : "text-brown font-meduim"}
        >
          About
        </NavLink>

        <NavLink to="/products" className={({ isActive }) =>
          isActive ? "text-[rgba(0, 59, 118, 0.76)]  font-bold" : "text-brown font-meduim"}>
          Products
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? "text-[rgba(0, 59, 118, 0.76)]  font-bold" : "text-brown font-meduim"}>
          Contact
        </NavLink>

        {user?.role === "admin" &&
          <NavLink to="/admin" className={({ isActive }) =>
            isActive ? "text-[rgba(0, 59, 118, 0.76)]  font-bold" : "text-brown font-meduim"}>
            Admin
          </NavLink>
        }




      </div>

      {user ? (
        <UseAvatar />
      ) : (
        <a href="/signin">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer">
            Sign in
          </button>
        </a>
      )}


    </div>
  )
}

export default Navbar;





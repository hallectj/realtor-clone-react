import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMapRoute(route: string){
    return route === location.pathname;
  }



  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' className='h-5 cursor-pointer' alt='logo' onClick={() => navigate("/")}></img>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`active_link ${pathMapRoute("/") && "active_link_underbar"}`} onClick={() => navigate("/")}>Home</li>
            <li className={`active_link ${pathMapRoute("/offers") && "active_link_underbar"}`} onClick={() => navigate("/offers")}>Offers</li>
            <li className={`active_link ${pathMapRoute("/sign-in") && "active_link_underbar"}`} onClick={() => navigate("/sign-in")}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

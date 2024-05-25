import { useState, useEffect } from 'react'
import { useRoutes, BrowserRouter } from "react-router-dom";

import '@assets/sass/app.scss'
import Footer from '@components/Footer'
import Header from '@components/Header'
import Home from '@pages/Home'
import Plans from '@pages/Plans'

import LeftBlur from '@assets/img/blur-left.svg?react';
import RightBlur from '@assets/img/blur-right.svg?react';

import LeftBlurMobile from '@assets/img/blur-left-mob.svg?react';
import RightBlurMobile from '@assets/img/blur-right-mob.svg?react';
import { set } from 'react-hook-form';

const AppRoutes = () => {
  return useRoutes([
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/plans",
        element: <Plans />,
      }
  ]);
}


function App() {
  const [ isMobile, setIsMobile ] = useState(false)
  const isHome = window.location.pathname === '/';

  useEffect(() => {
    const detectScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', detectScreenSize)

    return () => {
      window.removeEventListener('resize', detectScreenSize)
    }
  }, [])

  return (
    <>
      {isHome && !isMobile 
      ? <LeftBlur className="left-blur" /> 
      : <LeftBlurMobile className="left-blur" />}
      <Header />
        <main>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </main>
      <Footer />
      {isHome && !isMobile 
      ? <RightBlur className="right-blur" /> 
      : <RightBlurMobile className="right-blur" />}
    </>
  )
}

export default App

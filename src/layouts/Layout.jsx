import { useState, useEffect } from 'react'

import LeftBlur from '@assets/img/blur-left.svg?react';
import RightBlur from '@assets/img/blur-right.svg?react';

import LeftBlurMobile from '@assets/img/blur-left-mob.svg?react';
import RightBlurMobile from '@assets/img/blur-right-mob.svg?react';

import Footer from '@components/Footer'
import Header from '@components/Header'

export default function Layout({ children, gradients = true, footer = true, header = true}) {
    const [ isMobile, setIsMobile ] = useState(false)

    useEffect(() => {
      const detectScreenSize = () => {
        if(gradients) {
          setIsMobile(window.innerWidth < 768)
        }
      }
      window.addEventListener('resize', detectScreenSize)
      detectScreenSize()
      return () => {
        window.removeEventListener('resize', detectScreenSize)
      }
    }, [])

    return (
        <>
          {gradients && (
            !isMobile 
              ? <LeftBlur className="left-blur" /> 
              : <LeftBlurMobile className="left-blur" />
          )}

          {header && <Header />}

          <main>
            {children}
          </main>

          {footer && <Footer />}

          {gradients && (
            !isMobile 
              ? <RightBlur className="right-blur" /> 
              : <RightBlurMobile className="right-blur" />
          )}
        </>
    )
}
import React from 'react'
import Header from './Header'
import Footer from './Footer'


function Layout({children}) {
  return (
    <>
    <Header/>
    
    <main style={{minHeight:"70vh"} } className='body-container py-4'>
     {children}
    </main>
 
    <Footer/>
    
    </>
  )
}

export default Layout
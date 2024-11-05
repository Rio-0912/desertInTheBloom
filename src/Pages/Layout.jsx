import React from 'react'
import Nav from '../Components/Nav'
import LandingPage from '../Components/LandingImage'
import AllProducts from '../Components/AllProducts'
import Footer from '../Components/Fotter'

const Layout = () => {
  return (
    <div className='conta'>
      <Nav />
      <LandingPage />
      <AllProducts />
      <Footer />
    </div>
  )
}

export default Layout

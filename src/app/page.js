import React from 'react'
import HeroSection from './components/HeroSection'
import ProductsPage from './components/ProductsPage'
import ProductSlider from './components/ProductSlider'
const Page = () => {
  return (
    <div>
      <div className=''>
        {/* <ProductSlider /> */}
        <HeroSection />
      </div>
      <div>
        <ProductsPage />
      </div>
    </div>
  )
}

export default Page

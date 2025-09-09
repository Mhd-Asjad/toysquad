import React from 'react'
import HeroSection from './components/HeroSection'
import ProductsPage from './components/ProductsPage'

const Page = () => {
  return (
    <div>
      <div className=''>
        <HeroSection />
      </div>
      <div>
        <ProductsPage />
      </div>
    </div>
  )
}

export default Page

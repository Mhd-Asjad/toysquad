import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Toaster } from 'sonner'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors />
            <Footer />
        </>
    )

}

export default Layout
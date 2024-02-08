import React, { PropsWithChildren } from 'react'
import Header from '../header'
import Footer from '../footer'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className=''>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
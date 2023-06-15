import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <>
      <div className="d-flex flex-column overflow-x-hidden main_container">
        <Header />
        <div className="content ">
          {children}
        </div>
        <Footer className="" />
      </div>
    </>
  )
}

export default Layout

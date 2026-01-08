import React from 'react'
import {Outlet} from 'react-router-dom'
import {Navbar,Footer} from './index'

function Layout() {
  return (
  <>
  <div className='pt-18'>
  <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </div>
    </>
  )
}

export default Layout
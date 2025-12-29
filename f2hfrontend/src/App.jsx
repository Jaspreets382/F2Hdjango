import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Workflow from './components/Workflow'
import MockUI from './components/MockUI'
import CTA from './components/CTA'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <TechStack/>
    <Workflow/>
    <MockUI/>
    <CTA></CTA>
    <Footer></Footer>
    </>
  )
}

export default App

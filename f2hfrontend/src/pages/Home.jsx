import React from 'react'
import {CTA,MockUI,TechStack,Navbar,Workflow,Footer,Hero} from '../components/index'
function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Hero></Hero>
    <TechStack></TechStack>
    <Workflow></Workflow>
    <MockUI></MockUI>
    <CTA></CTA>
    <Footer></Footer>
    </>
  )
}

export default Home
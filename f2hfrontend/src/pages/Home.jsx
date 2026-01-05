import { useRef } from 'react'
import {CTA,MockUI,TechStack,Navbar,Workflow,Footer,Hero} from '../components/index'
import { useNavigate } from 'react-router-dom'
function Home() {
  const btnSecRef=useRef(null)
  const navigate=useNavigate()
  const handleRegister=(role)=>{
    navigate(`/register?role=${role}`)
  }
  return (
    <>
    <Navbar scrollToSection={btnSecRef}></Navbar>
    <Hero></Hero>
    <TechStack></TechStack>
    <Workflow></Workflow>
    <MockUI></MockUI>
    <CTA ref={btnSecRef} handleRegister={handleRegister}></CTA>
    <Footer></Footer>
    </>
  )
}

export default Home
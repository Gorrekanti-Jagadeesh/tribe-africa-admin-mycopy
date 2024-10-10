import React from "react"
import Navbar from '../../molecules/navbar'
import HomePage from '../../molecules/homepage'
import Footer from '../../molecules/footer'

const HomeScreen: React.FC = () => {
  return (
    <div className="m-auto" style={{maxWidth: "1080px"}}>
    <Navbar/>
    <HomePage/>
    <Footer/>
    </div>
  )
};

export default HomeScreen;

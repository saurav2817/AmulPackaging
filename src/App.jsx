import React from "react"
import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import BackToTop from "./components/backToTop/backToTop"
import Index from "./pages/index"
import "./App.css"
function App() {
  

  return (
    <>
      <Header/>
      <Index/>
       <BackToTop/>
      <Footer/>
    </>
  )
}

export default App;

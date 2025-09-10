import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.css"
import { Toaster } from "react-hot-toast";
function App() {
  

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="top-center" />
    </>
  )
}

export default App;

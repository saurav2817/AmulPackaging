import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import BackToTop from "../components/backToTop/backToTop";
import ScrollToTop from "../components/ScrollToTop";
import Index from "../pages/index";
import About from "../pages/About";
import Products from "../pages/Products";
import SingleProduct from "../pages/singleProduct";
import Services from "../pages/Services";
import Contact from "../pages/Contact";


const MainLayout = () => (
    <>
      <ScrollToTop />
      <Header/>
        <Outlet/>
      <BackToTop/>
      <Footer/>
    </>
  );

const AppRoutes = () => {
    return(
        <>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index/>} />
                <Route path="home" element={<Index/>} />
                <Route path="about" element={<About/>} />
                <Route path="products" element={<Products/>} />
                <Route path="products/:id" element={<SingleProduct/>} />
                <Route path="services" element={<Services/>} />
                <Route path="contact" element={<Contact/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;
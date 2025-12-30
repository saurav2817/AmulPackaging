import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

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
import PrivacyPolicy from "../pages/privacyPolicy";
import TermCondition from "../pages/termCondition";
import IndustriesWeServe from "../pages/IndustriesWeServe";
import ActionBtn from "../components/actionbutton/actionbutton";
import ThankYou from "../pages/thank-you";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminBlogForm from "../pages/admin/AdminBlogForm";
import AdminLogin from "../pages/admin/AdminLogin";
import { isAuthenticated } from "../utils/auth";

const MainLayout = () => (
    <>
      <ScrollToTop />
      <ActionBtn />
      <Header/>
        <Outlet/>
      <BackToTop/>
      <Footer/>
    </>
  );

const RequireAuth = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
    return(
        <>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index/>} />
                <Route path="home" element={<Index/>} />
                <Route path="about" element={<About/>} />
                <Route path="products" element={<Products/>} />
                <Route path="products/:id/:name?" element={<SingleProduct/>} />
                <Route path="services" element={<Services/>} />
                <Route path="industriesweserve" element={<IndustriesWeServe/>} />
                <Route path="contact" element={<Contact/>} />
                <Route path="privacyPolicy" element={<PrivacyPolicy/>} />
                <Route path="termCondition" element={<TermCondition/>} />
                <Route path="blog" element={<BlogList/>} />
                <Route path="blog/:slug" element={<BlogDetail/>} />
                <Route path="thank-you" element={<ThankYou/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
              {/* Admin Routes (without main layout) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/blogs"
                element={
                  <RequireAuth>
                    <AdminBlogs />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/blogs/new"
                element={
                  <RequireAuth>
                    <AdminBlogForm />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/blogs/edit/:id"
                element={
                  <RequireAuth>
                    <AdminBlogForm />
                  </RequireAuth>
                }
              />
            </Routes>
        </>
    )
}

export default AppRoutes;
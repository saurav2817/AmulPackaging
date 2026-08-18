import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import BackToTop from "../components/backToTop/backToTop";
import ScrollToTop from "../components/ScrollToTop";
import ActionBtn from "../components/actionbutton/actionbutton";
import { isAuthenticated } from "../utils/auth";
import SchemaManager from "../seo/SchemaManager";

const Index = lazy(() => import("../pages/index"));
const About = lazy(() => import("../pages/About"));
const Products = lazy(() => import("../pages/Products"));
const SingleProduct = lazy(() => import("../pages/singleProduct"));
const Services = lazy(() => import("../pages/Services"));
const Contact = lazy(() => import("../pages/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/privacyPolicy"));
const TermCondition = lazy(() => import("../pages/termCondition"));
const IndustriesWeServe = lazy(() => import("../pages/IndustriesWeServe"));
const ThankYou = lazy(() => import("../pages/thank-you"));
const BlogList = lazy(() => import("../pages/BlogList"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const AdminBlogs = lazy(() => import("../pages/admin/AdminBlogs"));
const AdminBlogForm = lazy(() => import("../pages/admin/AdminBlogForm"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const NotFound = lazy(() => import("../pages/NotFound"));

const StandupZipperPouch = lazy(() => import("../pages/services/StandupZipperPouch"));
const FlatBottomPouch = lazy(() => import("../pages/services/FlatBottomPouch"));
const SpoutPouch = lazy(() => import("../pages/services/SpoutPouch"));
const VacuumPouch = lazy(() => import("../pages/services/VacuumPouch"));
const LaminatedRollStock = lazy(() => import("../pages/services/LaminatedRollStock"));
const PolyBags = lazy(() => import("../pages/services/PolyBags"));
const PillowPouch = lazy(() => import("../pages/services/PillowPouch"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
  </div>
);

const MainLayout = () => (
    <>
      <SchemaManager />
      <ScrollToTop />
      <ActionBtn />
      <Header/>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet/>
      </Suspense>
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
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index/>} />
                <Route path="home" element={<Index/>} />
                <Route path="about" element={<About/>} />
                <Route path="products" element={<Products/>} />
                <Route path="products/:slug" element={<SingleProduct/>} />
                <Route path="services" element={<Services/>} />
                <Route path="industries-we-serve" element={<IndustriesWeServe/>} />
                <Route path="industriesweserve" element={<Navigate to="/industries-we-serve" replace />} />
                <Route path="IndustriesWeServe" element={<Navigate to="/industries-we-serve" replace />} />
                <Route path="contact" element={<Contact/>} />
                <Route path="privacyPolicy" element={<PrivacyPolicy/>} />
                <Route path="termCondition" element={<TermCondition/>} />
                <Route path="blog" element={<BlogList/>} />
                <Route path="blogs" element={<Navigate to="/blog" replace />} />
                <Route path="Blog" element={<Navigate to="/blog" replace />} />
                <Route path="blog/:slug" element={<BlogDetail/>} />
                <Route path="thank-you" element={<ThankYou/>} />
                <Route path="services/stand-up-pouch-manufacturer-in-bhiwandi" element={<StandupZipperPouch />} />
                <Route path="services/flat-bottom-pouch-supplier-in-bhiwandi" element={<FlatBottomPouch />} />
                <Route path="services/spout-pouch-in-mumbai" element={<SpoutPouch />} />
                <Route path="services/vacuum-pouch-In-bhiwandi" element={<VacuumPouch />} />
                <Route path="services/laminated-roll-stock-in-mumbai" element={<LaminatedRollStock />} />
                <Route path="services/poly-bags-manufacturer-in-mumbai" element={<PolyBags />} />
                <Route path="services/pillow-pouch" element={<PillowPouch />} />

                {/* Old Product URL Redirects */}
                <Route path="products/7" element={<Navigate to="/products/shaped-pouch" replace />} />
                <Route path="products/7/shaped-pouch" element={<Navigate to="/products/shaped-pouch" replace />} />
                <Route path="products/8/about" element={<Navigate to="/products/spout-pouch" replace />} />
                <Route path="products/8/spout-pouch" element={<Navigate to="/products/spout-pouch" replace />} />
                <Route path="products/11" element={<Navigate to="/products/security-bags" replace />} />
                <Route path="products/11/security-bags" element={<Navigate to="/products/security-bags" replace />} />
                <Route path="products/10/poly-bags-" element={<Navigate to="/products/poly-bags" replace />} />
                <Route path="products/1/standup-zipper-pouch" element={<Navigate to="/products/stand-up-zipper-pouch" replace />} />
                <Route path="products/3/flat-bottom-pouch" element={<Navigate to="/products/flat-bottom-pouch" replace />} />
                <Route path="products/6/vacuum-pouch" element={<Navigate to="/products/vacuum-pouch" replace />} />
                <Route path="products/9/laminated-roll-stock" element={<Navigate to="/products/laminated-roll-stock" replace />} />

                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Routes (without main layout) */}
              <Route path="/admin" element={<Navigate to="/admin/blogs" replace />} />
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
            </Suspense>
        </>
    )
}

export default AppRoutes;
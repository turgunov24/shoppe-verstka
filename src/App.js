//hooks
import { useState } from "react";
//additional
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
//pages
import HomePage from "./pages/home-page/home-page";
import LoginPage from "./pages/login-page/login-page";
import Forgotten from "./pages/login-page/forgotten";
import ProductPage from "./pages/product-page/product-page";
import ShopPage from "./pages/shop-page/shop-page";
import ContactPage from "./pages/contact-page/contact-page";
import ProfilePage from "./pages/profile-page/profile-page";
import PrivacyPolicyPage from "./pages/privacy-policy-page/privacy-policy-page";
import ErrorPage from "./pages/error-page/error-page";
import ShoppingCartPage from "./pages/shopping-cart-page/shopping-cart-page";
import CheckoutPage from "./pages/checkout-page/checkout-page";
import CheckoutConfirmPage from "./pages/checkout-page/checkout-confirm-page";
import AboutPage from "./pages/about-page/about-page";
import BlogPage from "./pages/blog-page/blog-page";
import SelectedBlogPage from "./pages/blog-page/selected-blog";

function App() {
  return (
    <BrowserRouter>
      <div className="App w-full h-max overflow-hidden flex flex-col px-5 md:px-10">
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login/*" element={<LoginPage />} />
          <Route path="/forgotten" element={<Forgotten />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/shop-page" element={<ShopPage />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/privacy-policy-page" element={<PrivacyPolicyPage />} />
          <Route path="/shopping-cart-page" element={<ShoppingCartPage />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route
            path="/checkout-confirm-page"
            element={<CheckoutConfirmPage />}
          />
          <Route path="/selected-blog-page" element={<SelectedBlogPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

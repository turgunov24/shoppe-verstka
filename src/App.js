//additional
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
//pages
import HomePage from "./pages/home-page/home-page";
import LoginPage from "./pages/login-page/login-page";
import Forgotten from "./pages/login-page/forgotten";
import ProductPage from "./pages/product-page/product-page";
import ShopPage from "./pages/shop-page/shop-page";

function App() {
  return (
    <BrowserRouter>
      <div className="App w-full h-max overflow-hidden flex flex-col px-5 md:px-10">
        <Routes>
          {/* <Route path="/*" element={<LoginPage />} />
          <Route path="/forgotten" element={<Forgotten />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/shop-page" element={<ShopPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

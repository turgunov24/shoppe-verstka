import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Forgotten from "./pages/login-page/forgotten";
import LoginPage from "./pages/login-page/login-page";
import SignIn from "./pages/login-page/sign-in";

function App() {
  return (
    <BrowserRouter>
      <div className="App w-full h-max overflow-hidden flex flex-col px-5 md:px-10">
        <Routes>
          <Route path="/login/*" element={<LoginPage />} />
          <Route path="/forgotten" element={<Forgotten />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

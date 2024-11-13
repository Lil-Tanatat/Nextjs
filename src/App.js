// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import TokenSale from "./pages/TokenSale";
import Withdraw from "./components/Withdraw";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/tokensale" element={<TokenSale />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

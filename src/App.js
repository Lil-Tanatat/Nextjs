import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import TokenSale from "./pages/TokenSale";
import ICO from "./pages/ICO";
import Contactus from "./pages/Contactus";
import Blog from "./pages/Blog";
import "./i18n";
import ComingSoon from "./pages/Comingsoon";
import WithdrawPage from "./components/Withdraw";
import RoadMap from "./pages/Roadmap";
import TokenInfo from "./pages/TokenInfo";
import FAQ from "./pages/FAQ";
import WhitePaper from "./pages/Whitepaper";
import WithdrawICOPage from "./components/WithdrawICO";
import YourAccount from "./pages/Youraccount";
import Airdrop from "./pages/Airdrop";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/tokensale" element={<TokenSale />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/ico" element={<ICO />} />
        <Route path="/ico/:wallet" element={<ICO />} />
        <Route path="referral" element={<YourAccount />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/whitepaper" element={<WhitePaper />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/tokeninfo" element={<TokenInfo />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/withdraw-ico" element={<WithdrawICOPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

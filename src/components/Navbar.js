import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/Logo Giver.png";
// import { GlobeAltIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);

  const pages = [
    { name: t("home"), path: "/" },
    { name: t("whitepaper"), path: "/whitepaper" },
    { name: t("roadmaps"), path: "/roadmap" },
    { name: t("tokenInfo"), path: "/tokeninfo" },
    { name: t("faq"), path: "/faq" },
  ];

  const aboutDropdown = [
    { name: t("aboutUs"), path: "/aboutus" },
    { name: t("contactUs"), path: "/contactus" },
    { name: t("blog"), path: "/Blog" },
  ];
  const campaignDropdown = [
    { name: t("campaign.refferal"), path: "/your-account" },
    { name: t("campaign.airdrop"), path: "/airdrop" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white p-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-[62px] px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-1 md:space-x-2">
            <img src={Logo} alt="Logo Giver" className="w-[45px] h-[45px]" />
            <div className="text-[clamp(20px, 3vw, 32px)] font-semibold text-[#517008]">
              Giver
            </div>
          </div>
        </Link>

        {/* Menu Icon and Language Dropdown for Mobile */}
        <div className="flex items-center space-x-2 md:hidden">
          <div className="relative">
            {/* <GlobeAltIcon className="absolute left-2 top-2 w-5 h-5 text-gray-700" /> */}
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className=" text-[12px] bg-white border border-gray-300 p-1 rounded-md"
              defaultValue={i18n.language}
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
              <option value="jp">JP</option>
              <option value="cn">CN</option>
              <option value="vn">VN</option>
              <option value="ml">MY</option>
            </select>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <ul
          className={`md:flex md:space-x-3 lg:space-x-6 absolute md:relative bg-white md:bg-transparent w-full md:w-auto top-[62px] left-0 md:top-0 z-10 md:z-auto transition-all duration-300 ease-in ${
            isMenuOpen ? "block" : "hidden md:flex"
          } flex flex-col md:flex-row`}
        >
          {pages.map((page, index) => (
            <li
              key={index}
              className="border-b md:border-none py-2 md:py-0 md:px-1 lg:px-2"
            >
              <Link
                to={page.path}
                onClick={() => {
                  setActivePage(page.path);
                  setIsMenuOpen(false);
                }}
                className={`block md:inline cursor-pointer text-[clamp(10px, 3vw, 16px)] hover:text-green-600 ${
                  activePage === page.path
                    ? "text-green-800 border-b-2 border-[#517008]"
                    : ""
                }`}
              >
                {page.name}
              </Link>
            </li>
          ))}

          {/* About Dropdown */}
          <li
            className="relative border-b md:border-none py-2 md:py-0 md:px-1 lg:px-2 "
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            <button className="block md:inline cursor-pointer text-[clamp(12px, 1.2vw, 16px)] hover:text-green-600">
              {t("about")}{" "}
              <span className="ml-1">{isAboutDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isAboutDropdownOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-lg border rounded-md w-40 z-50">
                {aboutDropdown.map((item, idx) => (
                  <li key={idx} className="border-b last:border-0">
                    <Link
                      to={item.path}
                      onClick={() => {
                        setActivePage(item.path);
                        setIsMenuOpen(false);
                        setIsAboutDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-[clamp(12px, 1.2vw, 16px)] hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className="relative border-b md:border-none py-2 md:py-0 md:px-1 lg:px-2 "
            onMouseEnter={() => setIsCampaignDropdownOpen(true)}
            onMouseLeave={() => setIsCampaignDropdownOpen(false)}
          >
            <button className="block md:inline cursor-pointer text-[clamp(12px, 1.2vw, 16px)] hover:text-green-600">
              {t("campaign.title")}
              <span className="ml-1">{isCampaignDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isCampaignDropdownOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-lg border rounded-md w-40 z-50">
                {campaignDropdown.map((item, idx) => (
                  <li key={idx} className="border-b last:border-0">
                    <Link
                      to={item.path}
                      onClick={() => {
                        setActivePage(item.path);
                        setIsMenuOpen(false);
                        setIsCampaignDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-[clamp(12px, 1.2vw, 16px)] hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Token Sale Button for Mobile */}
          <li className="md:hidden border-b md:border-none py-2 md:py-0 md:px-1 lg:px-2">
            <Link to="/tokensale">
              <button className="w-full bg-[#92B344] text-white px-4 py-2 rounded-full text-[clamp(12px, 1.2vw, 16px)]">
                {t("presale")}
              </button>
            </Link>
            <Link to="/ico">
              <button className="w-full bg-[#92B344] text-white px-4 py-2 rounded-full text-[clamp(12px, 1.2vw, 16px)] mt-2">
                {t("ICO")}
              </button>
            </Link>
          </li>
        </ul>

        {/* Token Sale Button and Language Dropdown for Desktop */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-2">
          <Link to="/tokensale">
            <button className="min-w-[80px] w-[clamp(80px, 20%, 120px)] bg-[#92B344] text-white px-4 py-1 rounded-full text-[clamp(12px, 2vw, 16px)]">
              {t("presale")}
            </button>
          </Link>
          <Link to="/ico">
            <button className="min-w-[80px] w-[clamp(80px, 20%, 120px)] bg-[#92B344] text-white px-4 py-1 rounded-full text-[clamp(12px, 2vw, 16px)]">
              {t("ICO")}
            </button>
          </Link>

          <div className="relative">
            {/* <GlobeAltIcon className="absolute left-2 top-2 w-5 h-5 text-gray-700" /> */}
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-[12px] bg-white border border-gray-300 p-1 rounded-md"
              defaultValue={i18n.language}
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
              <option value="jp">JP</option>
              <option value="cn">CN</option>
              <option value="vn">VN</option>
              <option value="ml">MY</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

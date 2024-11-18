import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/Logo Giver.png";

function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { name: t("Home"), path: "/" },
    { name: t("Service"), path: "/coming-soon" },
    { name: t("Pages"), path: "/coming-soon" },
    { name: t("Presale"), path: "/tokensale" },
    { name: t("Blog"), path: "/coming-soon" },
    { name: t("AboutUs"), path: "/aboutus" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white p-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-[62px] px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <img src={Logo} alt="Logo Giver" className="w-[45px] h-[45px]" />
          <div className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-[#517008]">
            Giver
          </div>
        </div>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
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
            isMenuOpen ? "block" : "hidden md:block"
          }`}
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
                className={`block md:inline cursor-pointer text-[13px] md:text-[14px] lg:text-[15px] hover:text-green-600 ${
                  activePage === page.path
                    ? "text-green-800 border-b-2 border-[#517008]"
                    : ""
                }`}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Token Sale Button and Language Dropdown */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-10">
          <Link to="/tokensale">
            <button className="w-[100px] lg:w-[120px] h-[36px] lg:h-[42px] bg-[#92B344] text-white px-4 py-1 rounded-full text-[12px] lg:text-[14px]">
              {t("TokenSale")}
            </button>
          </Link>

          {/* Language Dropdown */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="text-[12px] lg:text-[14px] bg-white border border-gray-300 p-2 rounded-md"
            defaultValue={i18n.language}
          >
            <option value="en">🇬🇧 EN</option>
            <option value="th">🇹🇭 TH</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo Giver.png";

function Navbar() {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/service" },
    { name: "Pages", path: "/pages" },
    { name: "Presale", path: "/presale" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <nav className="bg-white p-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-[62px] px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo Giver" className="w-[51px] h-[51px]" />
          <div className="text-[40px] font-semibold text-[#517008]">Giver</div>
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
          className={`md:flex md:space-x-8 absolute md:relative bg-white md:bg-transparent w-full md:w-auto top-[62px] left-0 md:top-0 z-10 md:z-auto transition-all duration-300 ease-in ${
            isMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          {pages.map((page) => (
            <li
              key={page.name}
              className="border-b md:border-none py-2 md:py-0 md:px-4"
            >
              <Link
                to={page.path}
                onClick={() => {
                  setActivePage(page.path);
                  setIsMenuOpen(false);
                }}
                className={`block md:inline cursor-pointer hover:text-green-600 ${
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

        {/* Token Sale Button */}
        <div className="hidden md:flex items-center space-x-16">
          <Link to="/tokensale">
            <button className="w-[127px] h-[44px] bg-[#92B344] text-white px-4 py-2 rounded-full">
              Token Sale
            </button>
          </Link>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>EN</span>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Logo from "../assets/images/Logo Giver.png";
import Facebook from "../assets/images/FB.png";
import Mail from "../assets/images/Mail.png";
import Instagram from "../assets/images/IG.png";
import X from "../assets/images/X.png";

const Footer = () => {
  return (
    <footer className="text-gray-700 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-12">
        <div className="flex flex-row items-start mb-6 md:mb-0 space-x-2 space-y-3">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <p className="text-2xl md:text-3xl text-[#517008] font-semibold">
            Go Greener With Giver
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-6 md:mb-0 space-y-4 md:space-y-0">
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Service
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Pages
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Presale
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg font-medium text-[#1E1E1E]">
                  Token Sale
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="hidden md:block border-l-2 border-black h-32 mx-4" />

        <div className="flex flex-col items-start">
          <div className="flex space-x-3 mb-4">
            <a href="#">
              <img
                src={Facebook}
                alt="Facebook"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img src={Mail} alt="Mail" className="w-5 h-5" />
            </a>
            <a href="#">
              <img
                src={Instagram}
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img src={X} alt="X" className="w-5 h-5" />
            </a>
          </div>
          <address className="not-italic text-lg">
            <p>Email: giver.token@gmail.com</p>
            <p>Facebook: Giver Token</p>
            <p>IG: Giver_Token</p>
            <p>X.com: Giver_Token</p>
          </address>
        </div>
      </div>

      <div className="bg-[#92B344] text-white text-center py-4 mt-6">
        <p className="text-sm">&copy; Copyright All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

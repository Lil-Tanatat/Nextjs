import React from "react";
import Download from "../assets/images/Download.png";
import Document from "../assets/images/Document.png";
import Background from "../assets/images/BG_Download.png";

function DownloadSection() {
  return (
    <section
      className="relative bg-cover bg-center py-16 px-8"
      style={{
        backgroundImage: `url(${Background}), linear-gradient(to bottom, #92B344 30%, #053B25 70%)`,
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        {/* Left Section */}
        <div className="text-center lg:text-right mb-8 lg:mb-0 flex-1 flex justify-center lg:justify-end">
          <div className="relative p-6 inline-block">
            <img
              src={Download}
              alt="Download Icon"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[198px] h-[198px] mt-14 z-0"
            />

            <img
              src={Document}
              alt="Document Icon"
              className="relative w-[234px] h-[176px] mx-auto z-10 mb-28"
            />
            {/* <button className="mt-24 px-8 py-2 text-white font-semibold rounded-full border border-white hover:bg-blue-600">
              Download white paper
            </button> */}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-[400px] bg-gray-300 mx-8 hidden lg:block"></div>

        {/* Right Section */}
        <div className="p-6 flex-1">
          <h3 className="text-[32px] font-bold mb-4 text-center lg:text-left">
            More Documents
          </h3>
          <ul className="text-left space-y-4">
            <li className="flex flex-col items-left">
              <span className="font-medium">1. White Paper EN Version</span>
              <button className="ml-4 mt-6 px-4 py-2 text-[16px] font-bold rounded-full border border-black hover:bg-gray-200 w-[233px] h-[44px]">
                Download whitepaper
              </button>
            </li>
            <li className="flex flex-col items-left">
              <span className="font-medium">2. White Paper TH Version</span>
              <button className="ml-4 mt-6 px-4 py-2 text-[16px] font-bold rounded-full border border-black hover:bg-gray-200 w-[233px] h-[44px]">
                Download whitepaper
              </button>
            </li>
            <li className="flex flex-col items-left">
              <span className="font-medium">
                3. How Our Platform work EN Version
              </span>
              <button className="ml-4 mt-6 px-4 py-2 text-[16px] font-bold rounded-full border border-black hover:bg-gray-200 w-[233px] h-[44px]">
                Download whitepaper
              </button>
            </li>
            <li className="flex flex-col items-left">
              <span className="font-medium">
                4. How Our Platform work TH Version
              </span>
              <button className="ml-4 mt-6 px-4 py-2 text-[16px] font-bold rounded-full border border-black hover:bg-gray-200 w-[233px] h-[44px]">
                Download whitepaper
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DownloadSection;

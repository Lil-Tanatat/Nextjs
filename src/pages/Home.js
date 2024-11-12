// src/pages/Home.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import StepsSection from "../components/StepsSection";
import TokenomicsSection from "../components/TokenomicsSection";
import RoadmapSection from "../components/RoadmapSection";
import DownloadSection from "../components/DownloadSection";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired duration
  }, []);

  return (
    <div>
      <div data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up">
        <BenefitsSection />
      </div>
      <div data-aos="fade-up">
        <StepsSection />
      </div>
      <div data-aos="fade-up">
        <TokenomicsSection />
      </div>
      <div data-aos="fade-up">
        <RoadmapSection />
      </div>
      <div data-aos="fade-up">
        <DownloadSection />
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import RoadMap from "../assets/images/Roadmap.png";

function RoadmapSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-6">Roadmap</h2>
        <div className="flex justify-center">
          <img
            src={RoadMap}
            alt="Roadmap"
            className="w-full max-w-[1360px] h-auto"
          />
        </div>
        <p className="mt-10 font-semibold text-[#053B25] text-[24px] md:text-[32px]">
          *Privilege for Pre-sale Customer
        </p>
      </div>
    </section>
  );
}

export default RoadmapSection;

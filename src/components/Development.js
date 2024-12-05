import React from "react";
import { useTranslation } from "react-i18next";

const Development = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.developmentTeam.title")}
          </h2>
          <p className="text-[18px] sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.developmentTeam.description")}
          </p>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.advisorsAndPartners.title")}
          </h2>
          <p className="text-[18px] sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.advisorsAndPartners.description")}
          </p>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.marketingStrategy.title")}
          </h2>
          <p className="text-[18px] sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.marketingStrategy.description")}
          </p>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.securityAndRiskManagement.title")}
          </h2>
          <p className="text-[18px] sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.securityAndRiskManagement.description")}
          </p>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.legalAndCompliance.title")}
          </h2>
          <p className="text-[18px] sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.legalAndCompliance.description")}
          </p>
        </div>
      </section>
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-6">
            {t("developmentPage.sustainableGrowth.title")}
          </h2>
          <p className="text-base sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.sustainableGrowth.description1")}
          </p>
          <p className="text-base sm:text-lg font-normal mt-4 indent-16">
            {t("developmentPage.sustainableGrowth.description2")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Development;

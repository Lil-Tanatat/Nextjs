import React from "react";
import { useTranslation } from "react-i18next";

const ProjectOverview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-4">
          {t("whitepaperPage.title")}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-2">
          <strong>{t("whitepaperPage.projectName")}</strong>
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl mb-2">
          <strong>{t("whitepaperPage.tokenName")}</strong>
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl mb-2">
          <strong>{t("whitepaperPage.platform")}</strong>
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl font-normal mt-4">
          {t("whitepaperPage.description")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("whitepaperPage.description1")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("whitepaperPage.description2")}
        </p>
      </div>
    </section>
  );
};

export default ProjectOverview;

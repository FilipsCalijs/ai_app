// src/pages/EnglishPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";

import TopBanner from "../components/TopBanner/TopBanner";
import FrontHero from "../components/FrontHero/FrontHero";
import Review from "../components/Review/Review";
import SliderCompare from "../components/SliderCompare/SliderCompare";
import HowWork from "../components/HowWork/HowWork";
import SecuritySafe from "../components/SecuritySafe/SecuritySafe";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

export default function EnglishPage() {
  const { t } = useTranslation();

  return (
    <>
      <TopBanner />
      <FrontHero
        title={t("frontHero.title")}
        description={t("frontHero.description")}
        cta={t("frontHero.cta")}
      />
      <Review />
      <SliderCompare />
      <HowWork />
      <SecuritySafe />
      <FAQ />
      <Footer />
    </>
  );
}

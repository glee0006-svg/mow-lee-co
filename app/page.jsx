"use client";

import { useApp } from "@/lib/store";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhyUs from "@/components/WhyUs";
import FeaturedGrid from "@/components/FeaturedGrid";
import Story from "@/components/Story";
import FeaturedIn from "@/components/FeaturedIn";
import Shop from "@/components/Shop";
import Craft from "@/components/Craft";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SectionDivider from "@/components/SectionDivider";

export default function Page() {
  const { lang } = useApp();

  const navTo = (id) => {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="app" id="top">
      <TopBar navTo={navTo} />
      <Hero navTo={navTo} />
      <Ticker lang={lang} />
      <WhyUs />
      <SectionDivider />
      <FeaturedGrid navTo={navTo} />
      <Story />
      <FeaturedIn />
      <SectionDivider variant="on-cream" />
      <Shop />
      <Craft />
      <SectionDivider />
      <Visit />
      <Footer />
      <CartDrawer />
    </div>
  );
}

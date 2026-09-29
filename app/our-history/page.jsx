"use client";

import { useApp } from "@/lib/store";
import TopBar from "@/components/TopBar";
import Story from "@/components/Story";
import Craft from "@/components/Craft";
import Footer from "@/components/Footer";

export default function OurHistoryPage() {
  const { lang } = useApp();

  const navTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);

    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        70;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app" id="top">
      <TopBar navTo={navTo} />
<Story />
<Craft />
<Footer />
    </div>
  );
}

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrusstedBy";
import Product from "@/components/sections/product";
import DataQuality from "@/components/sections/DataQuality";
import ComparisonSection from "@/components/sections/ComparisonSection"; // Import the new component
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/FAQ";
import GofindyBrandBanner from "@/components/sections/GoFindyBanner";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Product />
        <DataQuality />
        <ComparisonSection /> {/* Add the new component here */}
        <Pricing />
        <FAQ />
        <GofindyBrandBanner />
      </main>
      <Footer />
    </div>
  );
}

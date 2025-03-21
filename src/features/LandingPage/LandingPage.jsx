import Header from '@features/LandingPage/Header';
import Footer from '@features/LandingPage/Footer';

import FAQ from '@features/LandingPage/FAQ';
import HeroSection from '@features/LandingPage/HeroSection';
import EmailSection from '@features/LandingPage/EmailSection';

import FeaturesSection from '@features/LandingPage/FeaturesSection';
import BenefitsSection from '@features/LandingPage/BenefitsSection';

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <EmailSection />
      <FAQ />
      <Footer />
    </>
  );
}

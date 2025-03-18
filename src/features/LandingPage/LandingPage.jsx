import Header from '@features/LandingPage/Header';
import Footer from '@features/LandingPage/Footer';
import FAQ from '@features/LandingPage/FAQ';
import EmailSection from '@features/LandingPage/EmailSection';

export default function LandingPage() {
  return (
    <>
      <Header />
      <EmailSection />
      <FAQ />
      <Footer />
    </>
  );
}

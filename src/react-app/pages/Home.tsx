import { lazy, Suspense, useState, useEffect } from 'react';
import Header from '@/react-app/components/Header';
import HeroSection from '@/react-app/components/HeroSection';

// Lazy load all sections for optimal bundle splitting
const AboutSection = lazy(() => import('@/react-app/components/AboutSection'));
const TechnologiesSection = lazy(() => import('@/react-app/components/TechnologiesSection'));
const ServicesSection = lazy(() => import('@/react-app/components/ServicesSection'));
const CasesSection = lazy(() => import('@/react-app/components/CasesSection'));
const AIComparisonSection = lazy(() => import('@/react-app/components/AIComparisonSection'));
const HowItWorksSection = lazy(() => import('@/react-app/components/HowItWorksSection'));
const TeamSection = lazy(() => import('@/react-app/components/TeamSection'));
const ContactSection = lazy(() => import('@/react-app/components/ContactSection'));
const Footer = lazy(() => import('@/react-app/components/Footer'));

export default function Home() {
  const [loadAbout, setLoadAbout] = useState(false);
  const [loadLazySections, setLoadLazySections] = useState(false);

  useEffect(() => {
    // Load About section quickly (100ms) - near-immediate but not blocking
    const aboutTimer = setTimeout(() => {
      setLoadAbout(true);
    }, 100);

    // Load non-critical sections after 2 seconds
    const sectionsTimer = setTimeout(() => {
      setLoadLazySections(true);
    }, 2000);

    return () => {
      clearTimeout(aboutTimer);
      clearTimeout(sectionsTimer);
    };
  }, []);
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-cyan-500 focus:text-black focus:font-semibold focus:rounded-lg focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <main id="main" tabIndex={-1}>
        <HeroSection />
        
        {loadAbout && (
          <Suspense fallback={<div className="min-h-screen" />}>
            <AboutSection />
          </Suspense>
        )}
        
        {loadLazySections && (
          <>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <TechnologiesSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <ServicesSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <HowItWorksSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <CasesSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <TeamSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <AIComparisonSection />
            </Suspense>
            
            <Suspense fallback={<div className="min-h-screen" />}>
              <ContactSection />
            </Suspense>
            
            <Suspense fallback={<div className="auto" />}>
              <Footer />
            </Suspense>
          </>
        )}
      </main>
    </div>
  );
}

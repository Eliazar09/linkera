'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

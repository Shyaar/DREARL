'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Workflow from '@/app/components/Workflow';
import Features from '@/app/components/Features';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
import ConnectWalletModal from '@/app/components/modals/ConnectWalletModal';
import RoleSelectionModal from '@/app/components/modals/RoleSelectionModal';
import RegistrationModal from '@/app/components/modals/RegistrationModal';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrollY={scrollY} 
        scrollToSection={scrollToSection} 
      />
      <Hero />
      <About />
      <Workflow />
      <Features />
      <Contact />
      <Footer scrollToSection={scrollToSection} />

      <ConnectWalletModal />
      <RoleSelectionModal />
      <RegistrationModal />
    </div>
  );
}

export default LandingPage;
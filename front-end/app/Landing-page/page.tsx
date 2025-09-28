'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Workflow from '@/components/Workflow';
import Features from '@/components/Features';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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
    </div>
  );
}

export default LandingPage;
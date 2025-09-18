// src/pages/LinguaChallengePage.jsx
import React, { useState } from 'react';
import { Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';
import MobileDrawer from '../components/MobileDrawe';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/Howitisworks';
import Testimonials from '../components/Test';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const LinguaChallengePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = ['How It Works', 'Pricing', 'Success Stories', 'FAQ'];

  return (
    <>
      <Navbar navItems={navItems} onDrawerOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} navItems={navItems} />
      <Toolbar /> {/* Spacer for fixed navbar */}
      <HeroSection />
      <HowItWorksSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default LinguaChallengePage;

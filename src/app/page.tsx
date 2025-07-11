import React from 'react';
// Components
import HeroSection from './(home)/hero-section';
import Categories from './(home)/categories';
import CounterSection from './(home)/count-stat';
import NewsletterSection from './(home)/newsletter';

export default function page() {
  return (
    <>
      <HeroSection />
      <CounterSection />
      <Categories />
      <NewsletterSection />
    </>
  );
}

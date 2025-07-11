import React from 'react';
// Components
import HeroSection from './(home)/hero-section';
import Categories from './(home)/categories-section';
import CounterSection from './(home)/count-stat';
import NewsletterSection from './(home)/newsletter-section';

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

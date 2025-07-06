import React from 'react';
// Components
import HeroSection from './(home)/HeroSection';
import Categories from './(home)/Categories';
import CounterSection from './(home)/CountStat';
import NewsletterSection from './(home)/Newsletter';

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

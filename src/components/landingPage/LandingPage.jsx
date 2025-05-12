import React from 'react';
import dynamic from 'next/dynamic';

import Categories from './categories/Categories';
import HeroSection from './heroSection/HeroSection';
import BookingFaq from './bookingFaq/BookingFaq';
import styles from './landingPage.module.css';
// import { isMobileOrTablet } from '@/lib/deviceType';

const AwardSection = dynamic(() => import('./awardSection/AwardSection'));
const OfferSection = dynamic(() => import('./offerSection/OfferSection'));
// const MobileNavSearch = dynamic(
//   () => import('./mobileNavSearch/MobileNavSearch')
// );
// const MobileCategoriesSection = dynamic(
//   () => import('./mobileCategoriesSection/MobileCategoriesSection')
// );
// const MobileLandingFilters = dynamic(
//   () => import('./landingFilters/LandingFilters')
// );
// const MobileHeroSection = dynamic(
//   () => import('./mobileHeroSection/MobileHeroSection')
// );
const LandingPage = async () => {
  return (
    <>
      <div className="container landing-container">
        <div className="wrapper" style={{ overflow: 'unset' }}>
          <div className={styles.mobileBanner}>
            {/* <MobileNavSearch /> */}
            {/* <MobileLandingFilters /> */}
            {/* {isMobileOrTablet() && <MobileHeroSection />} */}
          </div>
          <div className={styles.banner}>
            <HeroSection />
          </div>
          <br />
          <div className={styles.categoriesSection}>
            <Categories />
          </div>
          {/* {isMobileOrTablet() && (
            <div className={styles.mobileCaregories}>
              <MobileCategoriesSection />
            </div>
          )} */}
          <OfferSection />
        </div>
        <div className={styles.awardSection}>
          <AwardSection />
        </div>
        <div className={styles.suggestionSection}>
          <BookingFaq />
        </div>
      </div>
    </>
  );
};

export default LandingPage;

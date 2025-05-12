'use client';

import React, { useEffect, useState } from 'react';
import styles from './mainLayout.module.css';
import TopNavbar from './navbar/TopNavbar';
import Footer from './footer/Footer';
import BottomFooter from './footer/BottomFooter';
import BreadCrumbs from '../common/breadCrumbs/BreadCrumbs';
import { useParams, usePathname } from 'next/navigation';
// import BookingFooter from '../bookingPage/footer/Footer';
// import { setAuthState } from '@/store/features/auth/authSlice';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import DynamicBreadCrumbs from '../common/breadCrumbs/DynamicBreadCrumbs';
import Script from 'next/script';
import TagManager from 'react-gtm-module';
// import { getSession } from '@/lib/auth';
import Navbar from './navbar/Navbar';
// import ErrorBoundary from '../ErrorBoundary';

const MainLayout = ({ children }) => {
  // const [isRendered, setIsRendered] = useState(false);
  const paths = usePathname();
  // const [prevPathname, setPrevPathname] = useState(paths);
  const params = useParams();
  // const dispatch = useAppDispatch();
  const isRootPath = paths === '/';
  const isBookingPage = paths === '/booking';
  const isHotelInnerPage = paths.includes('/hotel');
  // const { token } = useAppSelector(state => state.auth);
  const [session, setSession] = useState(null);
  // const auth = useAppSelector(state => state.auth);

  // useEffect(() => {
  //   const GetSession = async () => {
  //     const s = await getSession();
  //     if (s) {
  //       setSession(s);
  //     } else {
  //       setSession(null);
  //     }
  //     return s;
  //   };

  //   GetSession();
  // }, [auth]);

  // useEffect(() => {
  //   setIsRendered(true);
  // }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_FE_URL === 'https://adotravel.nl'
    ) {
      TagManager.initialize({ gtmId: 'GTM-KJ3VN2TJ' });
    }
  }, []);

  // useEffect(() => {
  //   const bookingPayload = localStorage.getItem("bookingPayload");
  //   if (bookingPayload === null) {
  //     sessionStorage.setItem("allowedAccess", "false");
  //     router.push('/');
  //   }
  // }, [router]);

  // useEffect(() => {
  //   if (session?.data?.token && !token) {
  //     dispatch(setAuthState(session.data.token));
  //   }
  //   if (token && !session?.data?.token) {
  //     dispatch(setAuthState(null));
  //   }
  // }, [session, dispatch, token]);

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   try {
  //     const bookingPayload = sessionStorage.getItem('bookingPayload');
  //     const item = sessionStorage.getItem('redirectedFromBooking');

  //     if (bookingPayload === null) {
  //       localStorage.setItem('allowedAccess', 'false');
  //     } else {
  //       if (item === null) {
  //         if (
  //           paths !== '/booking' &&
  //           (paths !== prevPathname || item === null)
  //         ) {
  //           setPrevPathname(paths);
  //           sessionStorage.setItem('allowedAccess', 'false');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Storage access error:', error);
  //   }
  // }, [paths, prevPathname]);

  // if (!isRendered) {
  //   return null;
  // }

  return (
    <div>
      <div
        className={`container ${styles.navContainer} ${
          isHotelInnerPage ? styles.nonSticky : ''
        }`}
      >
        <TopNavbar />

        <Script
          id='futy-widget'
          strategy='afterInteractive'
          src='https://v1.widget.futy.io/js/futy-widget-modern.js'
        />

        <Navbar session={session} isBookingPage={isBookingPage} />
        {!isRootPath && paths !== 'destination' && (
          <>
            <div className={`wrapper ${params.slug && 'hotel-page'}`}>
              {!isBookingPage && !params?.country && !params?.landing && (
                <BreadCrumbs />
              )}
              {(params?.country || params?.landing) && <DynamicBreadCrumbs />}
            </div>
          </>
        )}
      </div>
      {children}
      <div className={styles.footerContainer}>
        {isBookingPage ? (
          <>
            {/* <BookingFooter /> */}
            <BottomFooter />
          </>
        ) : (
          <>
            <Footer />
            <BottomFooter />
          </>
        )}
      </div>
    </div>
  );
};

export default MainLayout;

'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { message, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

import { ScoreIcon } from '@/components/common/icons/ScoreIcon';
import { useHotelStore } from '@/hooks/useZustandStore';

import styles from './hotelNavbar.module.css';
import { links } from './links';
import { LightningIcon } from '@/components/common/icons/LightningIcon';
// import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
// import { fetchBookingStepOneData } from '@/store/features/bookingStepOne/bookingStepOneSlice';
// import { usePrice } from '@/store/features/priceTable/PriceContext';
import {
  usePackageFilterStore,
  useStepOnePassngersStore,
  useStepOneStore
} from '@/hooks/useZustandStore';
const TimerCountdown = dynamic(() => import('@/components/common/TimerCountdown'), {
  ssr: true,
  loading: () => <div></div>,
});
const PriceSection = dynamic(() => import('./PriceSection'), {
  ssr: true,
  loading: () => <div></div>,
});
// import { resetApplyCoupon } from '@/store/features/ApplyCoupon/applyCouponSlice';
import { calculateTimeLeft } from '@/lib/dateFormat';
const HotelNavbar = ({ scrollToSection, hotel: hotelData }) => {
  console.log('hotelData', hotelData);
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const { resetPackageFilter } = usePackageFilterStore();
  // const { error: hotelSelectionError } = useAppSelector(
  //   state => state.hotelOnlySearch
  // );
  const hotelSelectionError = false
  // const { hotelOnlyData } = useAppSelector(state => state.hotelOnlySearch);
  const hotelOnlyData = {}
  const time = new Date();
  time.setSeconds(time.getSeconds() + 100);
  const hotelStore = useHotelStore();
  const hotel = hotelData ?? hotelStore.hotel;
  const [isExpired, setIsExpired] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  // const { glanceData } = useAppSelector(state => state.glanceSlice);
  const glanceData = {}
  // const { totalPrice } = usePrice();
  const totalPrice = 0
  const { resetFormData } = useStepOnePassngersStore();
  const { resetFormDataOne } = useStepOneStore();
  const [isFutureDate, setIsFutureDate] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const expirationDate = new Date(hotel?.timeLeft);

    if (expirationDate <= currentDate) {
      setIsFutureDate(false);
    }
  }, [hotel?.timeLeft]);

  const timeLeft = calculateTimeLeft(hotel?.timeLeft);
  const handleBookingStepOne = () => {
    // dispatch(resetApplyCoupon());
    resetFormData();
    resetFormDataOne();
    const payload = JSON.parse(localStorage.getItem('bookingPayload'));
    const booking = document.querySelector('#booking-btn');
    if (booking) return booking.click();
    const flightsKey = [
      glanceData?.selectedFlight?.inBoundFlight.flightKey,
      glanceData?.selectedFlight?.outBoundFlight.flightKey
    ];

    localStorage.removeItem('currentStep');
    localStorage.removeItem('thirdStepData');
    localStorage.removeItem('SecondStepData');
    localStorage.removeItem('airportParkingToggle');
    localStorage.removeItem('setSelectedCard');
    localStorage.removeItem('selectedReturnBaggage');
    localStorage.removeItem('selectedBaggage');
    localStorage.removeItem('payloadSecond');
    localStorage.removeItem('formValue');
    localStorage.removeItem('passengersData');
    localStorage.removeItem('couponState');
    localStorage.removeItem('secretCode');
    [
      'selectedCard',
      'checkboxStateInsurance',
      'setNoTransfer',
      'selectedIndexes',
      'selectedCancellationIndexes',
      'selectedInsurances',
      'selectedCancellationInsurances',
      'updatedInsurances',
      'setInsurances',
      'selectedParkingValue',
      'extraamounts',
      'finaldiscount',
      'pp',
      'preferencesWithI',
      'Comments',
      'codePromotion'
    ].forEach(key => localStorage.removeItem(key));

    if (payload) {
      if (payload.HotelBookingInfo) {
        payload.HotelBookingInfo.OutBoundFlightKey = flightsKey[1];
        payload.HotelBookingInfo.InBoundFlightKey = flightsKey[0];
      }
      // dispatch(fetchBookingStepOneData(payload))
      //   .then(() => {
      //     resetPackageFilter(null);
      //     const currentUrl = window.location.href;
      //     localStorage.setItem('previousUrl', currentUrl);
      //     sessionStorage.setItem('allowedAccess', 'true');
      //     router.push('/booking');
      //   })
      //   .catch(() => {
      //     router.push('/');
      //   });
    } else {
      message.error('Hotel data is no load');
    }
  };
  // const stepOne = useAppSelector(state => state.bookingStepOne);
  const stepOne = {}
  // const {
  //   loading: loadCount,
  //   reSelectionData,
  //   error: hotelReSelectionError
  // } = useAppSelector(state => state.reSelectionSearch);
  const loadCount = 0
  const reSelectionData = {}
  const hotelReSelectionError = false
  // const { loading: hotelSelectionLoading } = useAppSelector(
  //   state => state.hotelOnlySearch
  // );
  const hotelSelectionLoading = false
  const hotelReSelectionLoading = loadCount > 0;
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
      setIsVisible(window.scrollY > 0);
    };

    const handleIntersection = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    });

    links.forEach(link => {
      const section = document.getElementById(link.id);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      links.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);
  const isHotelonly = JSON.parse(localStorage.getItem('bookingPayload'));
  let rooms = hotelOnlyData?.data?.[0]?.rooms;
  const isRoomSelectionDisabled = rooms?.some(
    room => (room.roomTypeList === null || room.roomTypeList?.length === 0)
  );

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.navbarContainer} ${isSticky ? styles.sticky : ''} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div
        className={`${isSticky ? '' : 'container'} ${
          styles.hotelNavbarLayout
        } `}
      >
        <div
          className={styles.hotelName}
          // title={fullText.length > 12 ? fullText : ''}
        >
          {hotel?.name}
        </div>
        <div className={styles.hotelInfo}>
          <div className={styles.hotelInfoDetails}>
            <div className={styles.hotelRating}>
              <Rate
                disabled
                allowHalf={hotel?.starRating % 1 !== 0}
                defaultValue={hotel?.starRating}
                className={styles.rating}
                // character={<IoIosStar size={14} className={styles.rating} />}
              />
              <div className={styles.hotelRatingText}>
                {hotel?.conceptName?.toUpperCase()}
              </div>
            </div>
            <div className={styles.travelAdvisorIcon}>
              {hotel?.tripAdvisorRating ? (
                <>
                  <ScoreIcon size={14} className={styles.scoreIcon} />
                  <div className={styles.accomodationText}>
                    {hotel.tripAdvisorRating.replace(',', '.')}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.linksContainer}>
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.link}
                className={`${styles.link} ${
                  activeSection === link.id ? styles.active : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {!!totalPrice &&
          !hotelReSelectionLoading &&
          !hotelSelectionLoading ? (
            <div className={styles.timeNave}>
              <LightningIcon className={styles.lightning} />
              {!isExpired && hotel?.timeLeft && isFutureDate && (
                <div>
                  <TimerCountdown
                    isHotelNavbar={true}
                    hours={timeLeft?.totalHours}
                    days={timeLeft?.days}
                    minutes={timeLeft?.minutes}
                    seconds={timeLeft?.seconds}
                    setIsExpired={setIsExpired}
                    hotelName={hotel?.name}
                    discount={hotel?.discount}
                  />
                </div>
              )}
              <PriceSection
                hotelReSelectionLoading={
                  hotelReSelectionLoading || hotelSelectionLoading
                }
                hotel={hotel}
                totalPrice={totalPrice}
              />
              <button
                id="bookingBtn"
                disabled={
                  stepOne?.loading ||
                  (!!reSelectionData?.warnings?.length &&
                    isHotelonly &&
                    !isHotelonly?.IsHotelOnly) ||
                  hotelSelectionError ||
                  hotelReSelectionLoading ||
                  hotelReSelectionError ||
                  isRoomSelectionDisabled
                }
                onClick={handleBookingStepOne}
                className={styles.hotelViewPrices}
              >
                {stepOne?.loading ? (
                  <Spin
                    size={12}
                    indicator={
                      <LoadingOutlined style={{ color: 'white' }} spin />
                    }
                  />
                ) : (
                  'Boek nu'
                )}
              </button>
            </div>
          ) : (
            <LoadingOutlined spin style={{ margin: 10 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelNavbar;

'use client';
import { Button, Rate, Spin } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import { useAppSelector } from '@/store/reduxHooks';
import styles from './bottomStickyBanner.module.css';
import BedIcons from '../../../../public/images/summaryICon/bed.svg';
import fligtReturn from '../../../../public/images/bottomCrard/flight.png';
import time from '../../../../public/images/bottomCrard/timer.png';
import arrow from '../../../../public/Arrow.png';
import fligtDeparture from '../../../../public/images/bottomCrard/Vector.png';
import { PiForkKnifeFill } from 'react-icons/pi';
import { BsCalendarEvent } from 'react-icons/bs';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import dayjs from 'dayjs';
import { usePrice } from '@/store/features/priceTable/PriceContext';
import { useEffect, useState } from 'react';
import { usePackageFilterStore } from '@/hooks/useZustandStore';
import { LoadingOutlined } from '@ant-design/icons';
const BottomsStickyBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // State to control visibility
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const {
    hotel,
    loading: hotelLoading,
    mainLoading
  } = useAppSelector(state => state.hotel);
  const {
    reSelectionData,
    loading: loadCount,
    error: hotelReSelectionError
  } = useAppSelector(state => state.reSelectionSearch);
  const {
    hotelOnlyData,
    loading: hotelSelectionLoading,
    error: hotelSelectionError
  } = useAppSelector(state => state.hotelOnlySearch);
  const hotelOnlyPayload = useAppSelector(state => state.hotelOnlyPayloadSlice);
  const { CheckInDate, CheckOutDate } = hotelOnlyPayload;
  const { totalPrice } = usePrice();
  const { packageFilter, setPackageFilter } = usePackageFilterStore();
  const hotelReSelectionLoading = loadCount > 0;
  const roomSelection =
    reSelectionData &&
    reSelectionData?.priceDetails?.roomList &&
    reSelectionData?.priceDetails?.roomList.map(item => item.info);
  const DepFlightDetails =
    reSelectionData && reSelectionData?.priceDetails?.tripInfo?.flightInfo[0];
  const ArriveFlightDetails =
    reSelectionData && reSelectionData?.priceDetails?.tripInfo?.flightInfo[1];

  const handleBooking = () => {
    const booking = document.querySelector('#booking-btn');
    if (booking) return booking.click();
  };
  const selectedRoomTypeHotelRaw = localStorage.getItem(
    'selectedRoomTypeHotelOnly'
  );
  const stepOne = useAppSelector(state => state.bookingStepOne);

  let selectedRoomTypeHotel = null;
  if (selectedRoomTypeHotelRaw) {
    try {
      selectedRoomTypeHotel = JSON.parse(selectedRoomTypeHotelRaw);
    } catch (error) {
      console.error('Failed to parse selectedRoomTypeHotelOnly:', error);
    }
  }
  const duration = localStorage.getItem('dateDifference');
  const isHotelonly = JSON.parse(localStorage.getItem('bookingPayload'));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (currentScroll + windowHeight >= docHeight) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollTop]);

  const bannerStyle = {
    transform: isHidden ? 'translateY(117%)' : 'translateY(0)'
  };
  let rooms = hotelOnlyData?.data?.[0]?.rooms;
  const isRoomSelectionDisabled = rooms?.some(
    room => (room.roomTypeList === null || room.roomTypeList?.length === 0)
  );
  return (
    <>
      {isMobile ? (
        <div>
          {!!totalPrice && (
            <div className={styles.card_mobile} style={bannerStyle}>
              <div className={styles.cardcontent_mobile}>
                <h3 className={styles.cardtitle}>{hotel?.name}</h3>
                <Rate
                  allowHalf={hotel?.starRating % 1 !== 0}
                  disabled
                  value={hotel?.starRating}
                  className={styles.ratingHotelInner}
                />
              </div>
              <div className={styles.cardgreensection_mobile}>
                <div className={styles.left}>
                  <div className={styles.cardpriceText_mobile}>
                    Totale prijs
                  </div>
                  {hotelReSelectionLoading || hotelSelectionLoading ? (
                    <div className={styles.cardprice_mobile}>
                      <LoadingOutlined
                        size={20}
                        className={styles.loader}
                        spin
                      />
                    </div>
                  ) : (
                    <div className={styles.cardprice_mobile}>
                      {isHotelonly && !isHotelonly.IsHotelOnly
                        ? !isNaN(Number(reSelectionData?.totalPrice))
                          ? `€ ${reSelectionData?.totalPrice}`
                          : ''
                        : !isNaN(Number(totalPrice))
                          ? `€ ${totalPrice}`
                          : ''}
                    </div>
                  )}
                </div>
                <div className={styles.right}>
                  <div className={styles.btnClass}>
                    <Button
                      id="bookingBtn"
                      disabled={
                        (!!reSelectionData?.warnings?.length &&
                          isHotelonly &&
                          !isHotelonly?.IsHotelOnly) ||
                        isRoomSelectionDisabled ||
                        hotelSelectionLoading ||
                        hotelReSelectionLoading ||
                        stepOne?.loading
                      }
                      onClick={handleBooking}
                    >
                      Boek nu
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {!!totalPrice &&
            !hotelReSelectionLoading &&
            !hotelSelectionError &&
            !hotelReSelectionLoading &&
            !hotelReSelectionError && (
              <div className={styles.card} style={bannerStyle}>
                <div className={styles.cardcontent}>
                  <div className={styles.mainHeader}>
                    <div className={styles.headText}>
                      <h3 className={styles.cardtitle}>{hotel?.name}</h3>
                      <Rate
                        allowHalf={hotel?.starRating % 1 !== 0}
                        disabled
                        value={hotel?.starRating}
                        className={styles.ratingHotelInner}
                      />
                    </div>
                    <div className={styles.headInfoItems}>
                      {isHotelonly && !isHotelonly?.IsHotelOnly ? (
                        <p style={{ marginLeft: '1px' }}>
                          <BsCalendarEvent size={20} />
                          {packageFilter?.selectedDate &&
                            dayjs(packageFilter?.selectedDate)
                              .locale('nl')
                              .format('DD/MM/YYYY (dd)')}
                        </p>
                      ) : (
                        <p style={{ marginLeft: '1px' }}>
                          <BsCalendarEvent size={20} />
                          {CheckInDate &&
                            dayjs(CheckInDate)
                              .locale('nl')
                              .format('DD/MM/YYYY (dd)')}
                          {''}
                          <b>-</b>
                          {''}
                          {CheckOutDate &&
                            dayjs(CheckOutDate)
                              .locale('nl')
                              .format('DD/MM/YYYY (dd)')}
                        </p>
                      )}
                      <p>
                        {isHotelonly && !isHotelonly?.IsHotelOnly ? (
                          <>
                            <Image src={time} alt="timer" />
                            {
                              reSelectionData?.hotelSelectedResponse
                                ?.durationSelected
                            }{' '}
                            dagen (
                            {reSelectionData?.hotelSelectedResponse
                              ?.durationSelected - 1}{' '}
                            nachten)
                          </>
                        ) : (
                          <>
                            <Image src={time} alt="timer" />
                            {duration} dagen ({duration - 1} nachten)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className={styles.cardinfo}>
                    <div className={styles.cardInfoItems}>
                      <span>
                        {isHotelonly && !isHotelonly?.IsHotelOnly ? (
                          <>
                            <Image src={BedIcons} alt="BedIcons" width={25} />
                            <div className={styles.cardInfoItemNameMain}>
                              {roomSelection &&
                                roomSelection.map((item, index) => (
                                  <div
                                    key={index}
                                    className={styles.cardInfoItemName}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                        gap: '5px'
                                      }}
                                    >
                                      <div className={styles.bullet}></div>{' '}
                                      {`${item.roomName}`}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          <>
                            {''}
                            <Image src={BedIcons} alt="BedIcons" width={25} />
                            <div className={styles.cardInfoItemNameMain}>
                              {selectedRoomTypeHotel &&
                                selectedRoomTypeHotel?.selectedRoomTypes !=
                                  null &&
                                selectedRoomTypeHotel?.selectedRoomTypes?.map(
                                  (item, index) => {
                                    return item !== null ? (
                                      <div
                                        key={index}
                                        className={styles.cardInfoItemName}
                                      >
                                        {`${item?.roomName || 'Niet beschikbaar.'}`}
                                      </div>
                                    ) : (
                                      <div
                                        className={styles.cardInfoItemName}
                                        style={{ color: 'red' }}
                                      >
                                        Niet beschikbaar.
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </>
                        )}
                      </span>
                    </div>
                  </p>
                  <div className={styles.flightDiv}>
                    {isHotelonly && !isHotelonly?.IsHotelOnly && (
                      <p>
                        <Image src={fligtDeparture} alt="fligtDeparture" />{' '}
                        {DepFlightDetails?.departureAirportName} -{' '}
                        {DepFlightDetails?.arriveAirportName}{' '}
                        {dayjs(DepFlightDetails?.departureDate).format(
                          'DD/MM/YYYY'
                        )}{' '}
                        {dayjs(DepFlightDetails?.departureDate).format('HH:mm')}{' '}
                        {DepFlightDetails?.airlineName}
                      </p>
                    )}
                    {isHotelonly && !isHotelonly?.IsHotelOnly && (
                      <p>
                        <Image src={fligtReturn} alt="fligtReturn" />
                        {ArriveFlightDetails?.departureAirportName} -{' '}
                        {ArriveFlightDetails?.arriveAirportName}{' '}
                        {dayjs(ArriveFlightDetails?.departureDate).format(
                          'DD/MM/YYYY'
                        )}{' '}
                        {dayjs(ArriveFlightDetails?.departureDate).format(
                          'HH:mm'
                        )}{' '}
                        {ArriveFlightDetails?.airlineName}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.cardgreensection}>
                  <div className={styles.cardpriceText}>
                    <p>Totale prijs</p>
                    {/* <div onClick={handleBooking}>
                    <Image src={arrow} alt='timer' />
                  </div> */}
                  </div>
                  {hotelReSelectionLoading || hotelSelectionLoading ? (
                    <div className={styles.cardprice}>
                      <LoadingOutlined
                        size={20}
                        className={styles.loader}
                        spin
                      />
                    </div>
                  ) : (
                    <div className={styles.cardprice}>
                      {isHotelonly && !isHotelonly.IsHotelOnly
                        ? !isNaN(Number(reSelectionData?.totalPrice))
                          ? `€ ${reSelectionData?.totalPrice}`
                          : ''
                        : !isNaN(Number(totalPrice))
                          ? `€ ${totalPrice}`
                          : ''}
                    </div>
                  )}
                  <div className={styles.btnClass}>
                    <Button
                      id="bookingBtn"
                      disabled={
                        (!!reSelectionData?.warnings?.length &&
                          isHotelonly &&
                          !isHotelonly?.IsHotelOnly) ||
                        hotelReSelectionError ||
                        isRoomSelectionDisabled ||
                        hotelSelectionLoading ||
                        hotelReSelectionLoading ||
                        stepOne?.loading
                      }
                      onClick={handleBooking}
                    >
                      Boek nu
                    </Button>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default BottomsStickyBanner;

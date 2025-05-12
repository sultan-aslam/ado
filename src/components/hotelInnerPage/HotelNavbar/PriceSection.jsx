import { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import styles from './hotelNavbar.module.css';
// import { useAppSelector } from '@/store/reduxHooks';

const PriceSection = ({ hotel, totalPrice, hotelReSelectionLoading }) => {
  // const { reSelectionData } = useAppSelector(state => state.reSelectionSearch);
  // const retrievedData = JSON.parse(sessionStorage.getItem('payload'));
  const [isFutureDate, setIsFutureDate] = useState(true);
  // const {
  //   hotelOnlyData,
  //   loading: hotelSelectionLoading,
  //   error: hotelSelectionError
  // } = useAppSelector(state => state.hotelOnlySearch);
  const reSelectionData = {}
  const hotelOnlyData = {}
  const hotelSelectionLoading = false
  // const totalCount =
  //   Number(reSelectionData?.roomLists?.[0]?.selections?.adultCount) +
  //   Number(reSelectionData?.roomLists?.[0]?.selections?.childCount) +
  //   Number(reSelectionData?.roomLists?.[0]?.selections?.infantCount);
  const totalCount = reSelectionData?.roomLists?.reduce((total, room) => {
    // Sum the adult, child, and infant counts for each room
    return (
      total +
      Number(room?.selections?.adultCount || 0) +
      Number(room?.selections?.childCount || 0) +
      Number(room?.selections?.infantCount || 0)
    );
  }, 0);

  const totalCounthotelOnly =
    hotelOnlyData?.data && hotelOnlyData?.data[0]?.rooms;
  const firstItems =
    totalCounthotelOnly &&
    totalCounthotelOnly?.map(arr => ({
      infantCount: arr?.roomTypeList?.[0]?.infantCount,
      childCount: arr?.roomTypeList?.[0]?.childCount,
      adultCount: arr?.roomTypeList?.[0]?.adultCount
    }));
  const totalCounthotelOnlyNo = firstItems?.reduce((total, room) => {
    // Sum the adult, child, and infant counts for each room
    return (
      total +
      Number(room?.adultCount || 0) +
      Number(room?.childCount || 0) +
      Number(room?.infantCount || 0)
    );
  }, 0);

  const dateDeparture = dayjs(
    reSelectionData?.hotelSelectedResponse?.travelDateSelected
  ).format('DD-MM-YYYY');

  useEffect(() => {
    const currentDate = new Date();
    const expirationDate = new Date(hotel?.timeLeft);

    if (expirationDate <= currentDate) {
      setIsFutureDate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !totalCount ||
    !totalPrice ||
    hotelReSelectionLoading ||
    hotelSelectionLoading
  )
    return null;
  const booking = JSON.parse(localStorage.getItem('bookingPayload'));
  return (
    <div className={styles.flexCol}>
      <div className={styles.info1}>
        {dateDeparture ? dateDeparture : ''} /{' '}
        {!booking?.IsHotelOnly ? totalCount : totalCounthotelOnlyNo} pers.
      </div>
      <div className={styles.priceDiv}>
        <div className={styles.info2}>Per persoon v.a.</div>
        <div className={styles.price}>
          {isNaN(totalPrice) ? '' : `€ ${totalPrice}`}
        </div>
      </div>
    </div>
  );
};

export default memo(PriceSection);

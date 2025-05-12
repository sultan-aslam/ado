import React, { useEffect, useState } from 'react';
import { Alert, Spin, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
 
import styles from './bookingFilters.module.css';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { setHotelBookingDetails } from '@/store/features/bookingPayload/bookingPayloadSlice';
import dayjs from 'dayjs';
import { usePackageFilterStore } from '@/hooks/useZustandStore';
// import { resetHotelSearch } from '@/store/features/hotelOnlySearch/hotelOnlySearchSlice';
// import { resetReSelectionSearch } from '@/store/features/reselection/reSelectionSlice';
import dynamic from 'next/dynamic';
const PakketReizenComponent = dynamic(
  () => import('../PackageTravel/PackageTravel'),
  {
    ssr: true,
    loading: () => <div></div>
  }
);
// const AlleenHotelComponent = dynamic(() => import('../HotelOnly/HotelOnly'), {
//   ssr: true,
//   loading: () => <div></div>
// });
const BookingFilters = ({
  selection,
  token, 
  selectionLoading,
  hotelLoading,
  hotel
}) => {
  const { packageFilter, setPackageFilter, resetPackageFilter } =
    usePackageFilterStore();
  // const dispatch = useAppDispatch();
  // const [selectedRoomType, setSelectedRoomType] = useState();
  // const bookingPayload = useAppSelector(state => state.bookingPayloadData);
  const bookingPayload = null
  const [selectedTag, setSelectedTag] = useState('Pakket Reizen');
  const [numRooms, setNumRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomData, setRoomData] = useState([
    { AdultCount: 2, ChildCount: 0, InfantCount: 0, childAgeList: [] }
  ]);
  const savedCheckIn = localStorage.getItem('checkInDate');
  useEffect(() => {
    const durationPackage = Number(packageFilter?.selectedDuration) || 7;
    if (savedCheckIn && dayjs(savedCheckIn).isValid()) {
      setCheckInDate(dayjs(savedCheckIn));
      setCheckOutDate(
        dayjs(savedCheckIn).add(durationPackage, 'days').subtract(1, 'day')
      );
    } else {
      setCheckInDate(dayjs().startOf('day').add(5, 'months'));
      setCheckOutDate(dayjs().startOf('day').add(5, 'months').add(7, 'days'));
    }
  }, [savedCheckIn, packageFilter?.selectedHotelOnlyDuration]);
  // useEffect(() => {
  //   if (selectedTag === 'Pakket Reizen') {
  //     dispatch(setHotelBookingDetails(bookingPayload));
  //   } else {
  //     dispatch(setHotelBookingDetails(bookingPayload));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const { reSelectionData: hotelReSelectionData } = useAppSelector(
  //   state => state.reSelectionSearch
  // );
  const hotelReSelectionData = null
  const isHotelonly = JSON.parse(localStorage.getItem('bookingPayload'));
  const handleTagClick = tag => {
    const payloadXYZ = JSON.parse(localStorage.getItem('PayloadXYZ'));
    const booking = JSON.parse(localStorage.getItem('bookingPayload'));
    const IsHotelOnly = tag !== 'Pakket Reizen';
    if (booking) booking.IsHotelOnly = IsHotelOnly;
    if (payloadXYZ) payloadXYZ.IsHotelOnly = IsHotelOnly;
    localStorage.setItem('bookingPayload', JSON.stringify(booking));
    localStorage.setItem('PayloadXYZ', JSON.stringify(payloadXYZ));
    setSelectedTag(tag);
    if (tag === 'Pakket Reizen') {
      dispatch(setHotelBookingDetails(bookingPayload));
      dispatch(resetHotelSearch());
    } else {
      dispatch(setHotelBookingDetails(bookingPayload));
      dispatch(resetReSelectionSearch());
    }
  };
  // localStorage.setItem('bookingPayload', JSON.stringify(bookingPayload));

  if (selectionLoading || hotelLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px'
        }}
      >
        <Spin
          indicator={
            <LoadingOutlined
              className={styles.loader}
              style={{ fontSize: 100, marginBottom: '100px' }}
              spin
            />
          }
        />
      </div>
    );
  }

  const renderComponent = () => {
    switch (selectedTag) {
      case 'Pakket Reizen':
        return (
          selection && (
            <PakketReizenComponent
              key="PakketReizenComponent"
              selection={selection}
              token={token}
              selectionLoading={selectionLoading}
              hotel={hotel}
              hotelLoading={hotelLoading}
            />
          )
        );
      // case 'Alleen hotel':
      //   return (
      //     selection && (
      //       <AlleenHotelComponent
      //         key="AlleenHotelComponent"
      //         selection={selection}
      //         selectedRoomType={selectedRoomType}
      //         setSelectedRoomType={setSelectedRoomType}
      //         token={token}
      //         selectionLoading={hotelLoading}
      //         numRooms={numRooms}
      //         setNumRooms={setNumRooms}
      //         checkInDate={checkInDate}
      //         setCheckInDate={setCheckInDate}
      //         checkOutDate={checkOutDate}
      //         setCheckOutDate={setCheckOutDate}
      //         roomData={roomData}
      //         setRoomData={setRoomData}
      //       />
      //     )
      //   );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        {!!hotelReSelectionData?.warnings?.length &&
          isHotelonly &&
          !isHotelonly?.IsHotelOnly && (
            <Alert
              style={{ marginTop: 10, marginBottom: 10 }}
              message={hotelReSelectionData.warnings}
              type="warning"
            />
          )}
        <h1 className={styles.title}>Boek snel & makkelijk met adotravel</h1>
        <div className={styles.titleContainer}>
          <div className={styles.tagsContainer}>
            {selection && (
              <Tag
                className={`${styles.Pakket} ${
                  selectedTag === 'Pakket Reizen'
                    ? styles.selected
                    : styles.unSelected
                }`}
                onClick={() => handleTagClick('Pakket Reizen')}
              >
                Pakket Reizen
              </Tag>
            )}

            <Tag
              className={`${styles.Alleen} ${
                selectedTag === 'Alleen hotel'
                  ? styles.selected
                  : styles.unSelected
              }`}
              onClick={() => handleTagClick('Alleen hotel')}
            >
              Alleen hotel
            </Tag>
          </div>
        </div>
        <div className={styles.desktopFilters}>{renderComponent()}</div>
        <div className={styles.mobileFilters}>{renderComponent()}</div>
      </div>
    </>
  );
};

export default BookingFilters;

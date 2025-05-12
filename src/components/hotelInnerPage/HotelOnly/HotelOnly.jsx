import { Button, Skeleton, Spin, Typography, message } from 'antd';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';

import { MinusSvg, PlusSvg } from '@/components/common/svgs/Svgs';
import CustomDatePickerWithLabel from '@/components/CustomDatePickerWithLabel/CustomDatePickerWithLabel';
import { CalendarIcon } from '@/components/Icons/CalendarIcon';
import {
  addRoom,
  fetchHotelSearch,
  removeRoom
} from '@/store/features/hotelOnlySearch/hotelOnlySearchSlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import PassengerRoomSelection from '../PassengerRoomSelection/PassengerRoomSelection';
import RoomType from '../RoomType/RoomType';
import styles from './hotelOnly.module.css';
import EverythingInGlanceCard from '@/components/cards/everythingInGlanceCard/EverythingInGlanceCard';
import { updateHotelOnlyPayload } from '@/store/features/hotelOnlyPayload/hotelOnlyPayloadSlice';
import NoSelectionFound from '../NoSelectionFound/NoSelectionFound';
import { usePackageFilterStore } from '@/hooks/useZustandStore';
const RoomComponent = ({
  roomNumber,
  roomData,
  setRoomData,
  setSelectedRoomType,
  dateDifference,
  data,
  hotelSelectionLoading
}) => {
  const handlePassengerChange = data => {
    const updatedRoomData = [...roomData];
    updatedRoomData[roomNumber - 1] = {
      ...updatedRoomData[roomNumber - 1],
      ...data
    };

    if (Object.entries(data).some(([key]) => key === 'ChildCount')) {
      const childCount = data.ChildCount;
      const childAgeList = updatedRoomData[roomNumber - 1].childAgeList;
      if (childCount === 0) {
        updatedRoomData[roomNumber - 1].childAgeList = [];
      } else if (childCount < childAgeList.length) {
        updatedRoomData[roomNumber - 1].childAgeList = childAgeList.slice(
          0,
          childCount
        );
      } else if (childCount > childAgeList.length) {
        const extra = Array(childCount - childAgeList.length).fill(2);
        updatedRoomData[roomNumber - 1].childAgeList = [
          ...childAgeList,
          ...extra
        ];
      }
    }

    setRoomData(updatedRoomData);
    setSelectedRoomType({ ...data, dateDifference });
  };
  return (
    <div className={styles.room}>
      <h2 className={styles.typeTitle}>Kamer {roomNumber}</h2>
      <div>
        <PassengerRoomSelection
          onChange={handlePassengerChange}
          setSelectedRoomType={setSelectedRoomType}
          AdultCount={data.AdultCount}
          ChildCount={data.ChildCount}
          InfantCount={data.InfantCount}
          childAgeList={data.childAgeList}
          hotelSelectionLoading={hotelSelectionLoading}
        />
      </div>
    </div>
  );
};

const AlleenHotelComponent = ({
  selection,
  setSelectedRoomType,
  selectedRoomType,
  token,
  numRooms,
  setNumRooms,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  roomData,
  selectionLoading,
  setRoomData
}) => {
  localStorage.setItem(
    'selectedRoomTypeHotelOnly',
    JSON.stringify(selectedRoomType)
  );
  const { packageFilter, setPackageFilter, resetPackageFilter } =
    usePackageFilterStore();
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const retrievedDatax = localStorage.getItem('reSelectionData');
  const reSelectionData = retrievedDatax ? JSON.parse(retrievedDatax ?? '{}') : {};
  const {
    hotelOnlyData,
    loading: hotelSelectionLoading,
    error: hotelSelectionError,
    roomChange
  } = useAppSelector(state => state.hotelOnlySearch);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const departureDate = urlParams.get('departureDate');
    const returnDate = urlParams.get('returnDate');
    const people = urlParams.get('people');
    if (departureDate) {
      const parsedCheckInDate = dayjs(departureDate);
      setCheckInDate(parsedCheckInDate);
      setCheckOutDate(parsedCheckInDate.add(7, 'days'));
    }

    if (returnDate) {
      setCheckOutDate(dayjs(returnDate));
    }

    if (people) {
      const adultsMatch = people.match(/(\d+)\s*adult/);
      const infantMatch = people.match(/(\d+)\s*infant/);
      const childrenMatch = people.match(/(\d+)\s*child/);
      const childAgeMatch = people.match(/\(([\d,\s]+)\)/);

      const adults = adultsMatch ? parseInt(adultsMatch[1], 10) : 2;
      const infents = infantMatch ? parseInt(infantMatch[1], 10) : 0;
      const children = childrenMatch ? parseInt(childrenMatch[1], 10) : 0;
      const childAges = childAgeMatch
        ? childAgeMatch[1].split(',').map(age => parseInt(age.trim(), 10))
        : [];

      setRoomData([
        {
          AdultCount: adults,
          ChildCount: children,
          InfantCount: infents,
          childAgeList: childAges
        }
      ]);
      setNumRooms(numRooms);
    } else {
      setRoomData(roomData);
      setNumRooms(numRooms);
    }
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (packageFilter?.selectedRooms) {
      setRoomData(packageFilter?.selectedRooms);
      setNumRooms(packageFilter?.selectedRooms?.length || 1);
    }
  }, [packageFilter?.selectedRooms]);

  useEffect(() => {
    if (checkInDate && checkInDate instanceof Date && !isNaN(checkInDate)) {
      localStorage.setItem('checkInDate', checkInDate.toISOString());
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate && checkOutDate instanceof Date && !isNaN(checkOutDate)) {
      localStorage.setItem('checkOutDate', checkOutDate.toISOString());
    }
  }, [checkOutDate]);

  const hotelCode = params.slug?.replaceAll('-', ' ');
  useEffect(() => {
    if (hotelCode) {
      makeRequest(hotelCode, checkInDate, checkOutDate, roomData, false);
      setInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params,
    checkInDate,
    checkOutDate,
    roomData,
    hotelCode,
    setSelectedRoomType,
    RoomComponent
  ]);

  useEffect(() => {
    if (!initialRender) {
      if ((hotelCode && checkInDate && checkOutDate, roomData)) {
        makeRequest(hotelCode, checkInDate, checkOutDate, roomData, true);
        const booking = JSON.parse(localStorage.getItem('bookingPayload'));
        if (booking?.hotelBookingInfo) {
          booking.hotelBookingInfo.checkOutDate = dayjs(checkOutDate).format('YYYY-MM-DD');
          booking.hotelBookingInfo.checkInDate = dayjs(checkInDate).format('YYYY-MM-DD');
          localStorage.setItem('bookingPayload', JSON.stringify(booking));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkInDate,
    checkOutDate,
    hotelCode,
    initialRender,
    roomData,
    setSelectedRoomType
  ]);

  const handleAddRoom = () => {
    if (numRooms >= 3) {
      message.error('You can add a maximum of 3 rooms.');
      return;
    }
    dispatch(addRoom());
    setNumRooms(numRooms + 1);
    setRoomData([
      ...roomData,
      { AdultCount: 2, ChildCount: 0, InfantCount: 0, childAgeList: [] }
    ]);
  };

  const handleRemoveRoom = () => {
    if (numRooms > 1) {
      dispatch(removeRoom());
      setNumRooms(numRooms - 1);
      setRoomData(roomData.slice(0, -1));
    }
  };

  const dateDifference =
    checkInDate && checkOutDate ? checkOutDate.diff(checkInDate, 'days') + 1 : 0;
  useEffect(() => {
    if (dateDifference > 0) {
      localStorage.setItem('dateDifference', dateDifference);
    }
  }, [dateDifference]);

  const rooms = roomData?.map((data, index) => (
    <RoomComponent
      key={index}
      code={hotelCode}
      data={data}
      roomNumber={index + 1}
      roomData={roomData}
      setRoomData={setRoomData}
      setSelectedRoomType={setSelectedRoomType}
      dateDifference={dateDifference}
      hotelSelectionLoading={hotelSelectionLoading}
    />
  ));

  const makeRequest = (
    hotelCode,
    checkInDate,
    checkOutDate,
    roomData,
    showMessage
  ) => {
    if (!checkInDate || !checkOutDate) {
      if (showMessage) {
        message.error('Please select both check-in and check-out dates.');
      }
      return;
    }

    for (let room of roomData) {
      if (room.AdultCount < 1) {
        message.error('Each room must have at least one adult.');
        return;
      }
    }
    const checkInDateEN = checkInDate;
    const checkOutDateEN = checkOutDate;
    const payload = {
      PassengerRoomSelections: roomData,
      HotelCode: hotelCode,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate,
      IsHotelOnly: true,
      hotelCodeNumber: hotelOnlyData?.data?.[0]?.hotelCode
    };
    sessionStorage.setItem('payload', JSON.stringify(payload));
    dispatch(
      updateHotelOnlyPayload({
        ...payload
      })
    );
    dispatch(
      fetchHotelSearch({
        ...payload,
        CheckInDate: checkInDateEN.locale('en').format('DD-MMM-YY hh.mm.ss A'),
        CheckOutDate: checkOutDateEN.locale('en').format('DD-MMM-YY hh.mm.ss A')
      })
    );
  };

  const handleCheckInDateChange = date => {
    const travelDatesOptions = reSelectionData?.travelDates;
    const validDates = new Set(
      travelDatesOptions?.map(dateObj => {
        const date = dayjs(dateObj.travelDate);
        return date.toISOString().split('T')[0];
      })
    );
    const selectedDate = date ? dayjs(date).toISOString().split('T')[0] : null;
    if (!selectedDate || !validDates.has(selectedDate)) {
      console.warn('Selected check-in date is not available.');
    }
    else {
      const durationInDays = 8
      setPackageFilter({ ...packageFilter, selectedDate: date, selectedDuration: durationInDays.toString() })
    }

    setCheckInDate(date);
    setCheckOutDate(date ? date.add(7, 'days') : null)
    const booking = JSON.parse(localStorage.getItem('bookingPayload'));
    if (booking?.hotelBookingInfo) {
      booking.hotelBookingInfo.checkInDate = dayjs(date).format('YYYY-MM-DD');
      booking.hotelBookingInfo.checkOutDate = dayjs(date).add(7, 'days').format('YYYY-MM-DD');
      localStorage.setItem('bookingPayload', JSON.stringify(booking));
    }


    // setNumRooms(1);
    // setRoomData([
    //   { AdultCount: 2, ChildCount: 0, InfantCount: 0, childAgeList: [] }
    // ]);
  };
   const handleCheckOutDateChange = date => {
    setCheckOutDate(date);
    if (checkInDate && date) {
      const start = new Date(checkInDate);
      const end = new Date(date);
      const durationInMs = end - start;
      const durationInDays = (Math.floor(durationInMs / (1000 * 60 * 60 * 24)) + 1).toString();
      setPackageFilter({ ...packageFilter, selectedDuration: durationInDays });
    }
    const booking = JSON.parse(localStorage.getItem('bookingPayload'));

    if (booking?.hotelBookingInfo) {
      booking.hotelBookingInfo.checkOutDate = dayjs(date).format('YYYY-MM-DD');
      localStorage.setItem('bookingPayload', JSON.stringify(booking));
    }

    // setNumRooms(1);
    // setRoomData([
    //   { AdultCount: 2, ChildCount: 0, InfantCount: 0, childAgeList: [] }
    // ]);
  };

  const { hotel } = useAppSelector(state => state.hotel);
  const images = hotel?.hotelImage || [];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.datesContainer}>
          <div className={styles.filter}>
            <Typography className={styles.title}>
              Datum van inchecken
            </Typography>
            <CustomDatePickerWithLabel
              size='large'
              prefixIcon={<CalendarIcon />}
              customStyle={true}
              allowClear={false}
              disabledDate={current =>
                current && current < dayjs().startOf('day')
              }
              onChange={handleCheckInDateChange}
              value={checkInDate}
            />
          </div>
          <div className={styles.filter}>
            <Typography className={styles.title}>Datum uitchecken</Typography>
            <CustomDatePickerWithLabel
              size='large'
              prefixIcon={<CalendarIcon />}
              customStyle={true}
              allowClear={false}
              disabledDate={(current) => {
                if (!checkInDate) return false;
                const maxDate = dayjs(checkInDate).add(3, 'day').startOf('day');
                return current.startOf('day').isBefore(maxDate);
              }}

              onChange={handleCheckOutDateChange}
              value={checkOutDate}
            />
          </div>
        </div>
        <div className={styles.noOfRoomsContainer}>
          <h1 className={styles.title}>Select Aantal kamers</h1>
          <div className={styles.btns}>
            <Button
              className={styles.minus}
              onClick={() => !hotelSelectionLoading && handleRemoveRoom()}
            >
              <MinusSvg className={styles.minusIcon} />
            </Button>
            <span className={styles.roomCount}>{numRooms}</span>
            <Button
              className={styles.plus}
              disabled={
                hotelSelectionError &&
                !hotelSelectionLoading &&
                hotelSelectionError !== 'signal is aborted without reason'
              }
              onClick={() => !hotelSelectionLoading && handleAddRoom()}
            >
              <PlusSvg className={styles.plusIcon} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.roomsContainer}>{rooms}</div>
      <RoomType
        hotelOnly
        numRooms={numRooms}
        hotelSelectionLoading={hotelSelectionLoading}
        setSelectedRoomType={setSelectedRoomType}
      />

      {hotelSelectionError &&
        !hotelSelectionLoading &&
        hotelSelectionError !== 'signal is aborted without reason' ? (
        <NoSelectionFound />
      ) : (
        <Spin spinning={hotelSelectionLoading}>
          {hotelOnlyData?.data?.length > 0 && (
            <div className={styles.glance}>
              {hotelOnlyData?.data && (
                <div className={styles.details}>Jouw reis</div>
              )}
              <EverythingInGlanceCard
                packageHotel={selection}
                hotelInner={true}
                hotel={hotel}
                data={hotelOnlyData?.data}
                images={images}
                hotelOnly={true}
                selectedRoomType={selectedRoomType}
                token={token}
              />
            </div>
          )}
        </Spin>
      )}
      {/* )} */}
    </div>
  );
};

export default AlleenHotelComponent;

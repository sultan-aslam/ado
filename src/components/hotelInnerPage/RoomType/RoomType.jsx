'use client';

import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { useAppSelector } from '@/store/reduxHooks';
import RoomTypeCard from '../RoomTypeCard/RoomTypeCard';
import styles from './roomType.module.css';
import NoSelectionFound from '../NoSelectionFound/NoSelectionFound';
import { WarningOutlined } from '@ant-design/icons';

const RoomType = ({
  roomTypeList,
  hotelOnly,
  setSelectedRoomType,
  hotelSelectionLoading
}) => {
  const { hotelOnlyData, error: hotelSelectionError } = useAppSelector(
    state => state.hotelOnlySearch
  );
  let rooms = hotelOnlyData?.data?.[0]?.rooms;

  const [selectedRooms, setSelectedRooms] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const calculateTotalCostAndDiscount = rooms => {
    const totals = Object.values(rooms).reduce(
      (totals, room) => {
        totals.cost += room?.price ?? 0;
        totals.discount += room?.discount ?? 0;
        return totals;
      },
      { cost: 0, discount: 0 }
    );
    totals.cost = parseFloat(totals.cost.toFixed(2));
    totals.discount = parseFloat(totals.discount.toFixed(2));

    return totals;
  };

  const handleCardSelect = (roomIndex, index, roomType) => {
    const updatedRooms = {
      ...selectedRooms,
      [roomIndex]: roomType
    };
    setSelectedRooms(updatedRooms);
    const { cost, discount } = calculateTotalCostAndDiscount(updatedRooms);

    const selectedRoomTypes = Object.values(updatedRooms).map(room => room);
    if (hotelOnly) {
      setSelectedRoomType({
        selectedRoomTypes,
        totalCost: cost,
        totalDiscount: discount
      });
    }
  };

  const handleCardSelectPackage = index => { };

  useEffect(() => {
    if (rooms?.length > 0) {
      const initialSelection = {};
      rooms.forEach((room, roomIndex) => {
        initialSelection[roomIndex] = room.roomTypeList?.[0];
      });
      setSelectedRooms(initialSelection);

      const { cost, discount } =
        calculateTotalCostAndDiscount(initialSelection);
      const selectedRoomTypes = Object.values(initialSelection).map(
        room => room
      );
      if (hotelOnly) {
        setSelectedRoomType({
          selectedRoomTypes,
          totalCost: cost,
          totalDiscount: discount
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  if (
    hotelSelectionError &&
    hotelSelectionError !== 'signal is aborted without reason'
  )
    return <div></div>;

  const hasData =
    roomTypeList?.roomTypeList?.[0]?.roomTypeList?.length > 0 ||
    rooms?.length > 0;
  const isRoomSelectionDisabled = rooms?.some(room => (room.roomTypeList === null || room.roomTypeList?.length === 0));
  // if (isRoomSelectionDisabled)
  // return <NoSelectionFound />;
  return (
    <Spin spinning={hotelSelectionLoading} className={styles.container}>
      {hasData && (
        <div className={styles.roomType}>
          <h1 className={styles.title}>Selecteer uw kamer</h1>
          {/* <FiAlertCircle className={styles.icon} /> */}
        </div>
      )}

      {roomTypeList?.[0]?.roomTypeList?.length > 0 &&
        roomTypeList?.[0]?.roomTypeList?.map((room, index) => (
          <RoomTypeCard
            key={index}
            cost={room.cost || null}
            radioDescription={room.roomName}
            onSelect={() => handleCardSelectPackage(index)}
            selected={selectedCard === index}
            className={selectedCard === index ? styles.selectedCard : ''}
          />
        ))}

      {rooms?.length > 0 &&
        rooms.map((room, roomIndex) => (
          <div key={roomIndex} className={styles.roomContainer}>
            <div className={styles.roomTitle}>{'Kamer ' + (roomIndex + 1)}</div>
            {room.roomTypeList && room.roomTypeList.length > 0 ? (
              room.roomTypeList.map((roomType, index) => {
                return (
                  <RoomTypeCard
                    key={index}
                    cost={roomType?.price}
                    radioDescription={roomType.roomName}
                    onSelect={() => handleCardSelect(roomIndex, index, roomType)}
                    selected={
                      selectedRooms[roomIndex]?.roomRequestKey ===
                      roomType.roomRequestKey
                    }
                    className={
                      selectedRooms[roomIndex]?.roomRequestKey ===
                        roomType.roomRequestKey
                        ? styles.selectedCard
                        : ''
                    }
                  />
                );
              })
            ) : (
              <div style={{color:"red"}}><WarningOutlined style={{ fontSize: '22px' }}/> kamer is niet meer beschikbaar.</div>
            )}

          </div>
        ))}
    </Spin>
  );
};

export default RoomType;

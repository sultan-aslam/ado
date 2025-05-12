'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import RoomTypeCard from '../RoomTypeCard/RoomTypeCard';
import styles from './roomTypePackage.module.css';
import { setGlanceData } from '@/store/features/glance/glanceSlice';
import { updatePayload } from '@/store/features/chartPayload/chartPayloadSlice';
import { updateReselectionPayload } from '@/store/features/reselectionPayload/reSelectionPayload';
import { usePackageFilterStore } from '@/hooks/useZustandStore';

const RoomTypePackage = ({
  roomTypeList,
  roomData = 1,
  setPayload,
  payload,
  isLoading
}) => {
  const { loading: loadCount, error: hotelReSelectionError } = useAppSelector(
    state => state.reSelectionSearch
  );
  const hotelReSelectionLoading = loadCount > 0;
  const { packageFilter, setPackageFilter } = usePackageFilterStore();

  const [selectedCards, setSelectedCards] = useState(
    Array(roomData).fill(null)
  );

  const dispatch = useAppDispatch();

  const RoomRequest = useAppSelector(
    state => state.chartPayloadSlice.RoomRequest
  );
  const { loading } = useAppSelector(state => state.reSelectionSearch);
  const reSelectionPayload = useAppSelector(state => state.reSelectionPayload);
  const customLoader = loading > 0;

  useEffect(() => {
    if (roomTypeList && roomTypeList.length > 0) {
      const initialSelectedCards = roomTypeList.map((roomType, idx) => {
        const selectedRoomAllocationCode =
          reSelectionPayload?.PassengerRoomSelections?.[idx]
            ?.RoomAllocationTypeCode;

        const matchedRoomTypeIndex = roomType.roomTypeList?.findIndex(
          item => item?.roomAllocationTypeCode === selectedRoomAllocationCode
        );

        return matchedRoomTypeIndex !== -1 ? matchedRoomTypeIndex : 0;
      });

      setSelectedCards(initialSelectedCards);
      const updatedRoomRequest = initialSelectedCards.map(
        (matchedIndex, idx) => {
          const selectedRoom = roomTypeList[idx]?.roomTypeList[matchedIndex];

          return {
            RoomAllocationTypeCode:
              selectedRoom?.roomAllocationTypeCode || 'DEFAULT_CODE',
            AdultCount: RoomRequest[idx]?.AdultCount || 2,
            ChildCount: RoomRequest[idx]?.ChildCount || 0,
            InfantCount: RoomRequest[idx]?.InfantCount || 0,
            childAgeList: RoomRequest[idx]?.childAgeList || []
          };
        }
      );
      setPayload({
        ...payload,
        RoomRequest: updatedRoomRequest,
        PassengerRoomSelections: updatedRoomRequest
      });

      initialSelectedCards.forEach((matchedIndex, idx) => {
        dispatch(
          setGlanceData({
            type: 'roomType',
            value: roomTypeList[idx]?.roomTypeList[matchedIndex]
          })
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypeList, roomData, reSelectionPayload, dispatch]);

  const handleCardSelectPackage = (
    instanceIndex,
    cardIndex,
    roomName,
    selectedRoomPackage
  ) => {
    if (customLoader) return;
    setPackageFilter({ ...packageFilter, selectedRoomPackage });
    const newSelectedCards = [...selectedCards];
    newSelectedCards[instanceIndex] = cardIndex;
    setSelectedCards(newSelectedCards);

    dispatch(
      setGlanceData({
        type: 'roomType',
        value: roomTypeList[instanceIndex].roomTypeList[cardIndex]
      })
    );
    dispatch(
      updatePayload({
        RoomRequest: RoomRequest?.map((room, index) =>
          index === instanceIndex
            ? {
                ...room,
                RoomAllocationTypeCode:
                  roomTypeList[instanceIndex].roomTypeList[cardIndex]
                    .roomAllocationTypeCode
              }
            : room
        )
      })
    );
    dispatch(
      updateReselectionPayload({
        ...reSelectionPayload,
        PassengerRoomSelections: RoomRequest?.map((room, index) =>
          index === instanceIndex
            ? {
                ...room,
                RoomAllocationTypeCode:
                  roomTypeList[instanceIndex].roomTypeList[cardIndex]
                    .roomAllocationTypeCode
              }
            : room
        )
      })
    );
  };
  if (
    hotelReSelectionError &&
    hotelReSelectionError !== 'signal is aborted without reason' &&
    !hotelReSelectionLoading
  ) {
    return <div></div>;
  }
  return (
    <>
      {roomTypeList && roomTypeList.length > 0 ? (
        Array.from({ length: roomTypeList.length }).map((_, instanceIndex) => (
          <div key={instanceIndex} className={styles.container}>
            {roomTypeList?.[instanceIndex]?.roomTypeList?.length > 0 && (
              <div className={styles.roomType}>
                <h1 className={styles.title}>
                  Selecteer uw kamer {instanceIndex + 1}
                </h1>
                {/* <FiAlertCircle className={styles.icon} /> */}
              </div>
            )}

            {roomTypeList?.[instanceIndex]?.roomTypeList?.length > 0 &&
              roomTypeList[instanceIndex].roomTypeList.map(
                (room, cardIndex) => (
                  <RoomTypeCard
                    customLoader={customLoader}
                    key={cardIndex}
                    cost={room.cost || null}
                    radioDescription={room.roomName}
                    roomCode={room.roomAllocationTypeCode}
                    onSelect={() => {
                      handleCardSelectPackage(
                        instanceIndex,
                        cardIndex,
                        room?.roomName,
                        room.roomAllocationTypeCode
                      );
                    }}
                    selected={selectedCards[instanceIndex] === cardIndex}
                    className={
                      selectedCards[instanceIndex] === cardIndex
                        ? styles.selectedCard
                        : ''
                    }
                  />
                )
              )}
          </div>
        ))
      ) : (
        <div>{isLoading ? '' : 'No rooms available'}</div>
      )}
    </>
  );
};

export default RoomTypePackage;

import { Button, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';

import { DropdownSvg, MinusSvg, PlusSvg } from '@/components/common/svgs/Svgs';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import styles from './travelCompany.module.css';
import CustomSelect from '@/components/customSelect/CustomSelect';
import ButtonContainer from '@/components/button/Button';
import alertIcn from '../../../../public/images/summaryICon/alertIcn.svg';
import { GET } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { isMobileOrTablet } from '@/lib/deviceType';

const RoomComponent = ({
  roomNumber,
  roomData,
  setRoomData,
  ageData,
  minAge,
  maxAge,
  condition
}) => {
  const [adults, setAdults] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState();
  const [babies, setBabies] = useState(0);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [ageOptions, setAgeOptions] = useState([]);
  useEffect(() => {
    setAdults(roomData?.AdultCount || 2);
    setBabies(roomData?.InfantCount || 0);
    setChildren(roomData?.ChildCount || 0);
    setChildrenAges(roomData?.childAgeList || []);
  }, [roomData]);

  usePreventBodyScroll(isModalVisible);

  const handleAdultsChange = (value = 0) => {
    setRoomData(prevData => {
      const newData = [...prevData];
      newData[roomNumber - 1] = {
        ...newData[roomNumber - 1],
        AdultCount: value
      };

      // Calculate the total number of people in the temporary state
      const totalPeople = newData.reduce(
        (total, room) =>
          total + room.AdultCount + room.ChildCount + room.InfantCount,
        0
      );

      if (totalPeople <= 9) {
        return newData;
      } else {
        setAlertMsg('Het totale aantal personen mag niet meer dan 9 zijn.');
        setIsModalVisible(true);
        return prevData; // Return the previous state if total exceeds 9
      }
    });
  };

  const handleBabiesChange = (value = 0) => {
    setRoomData(prevData => {
      const newData = [...prevData];
      newData[roomNumber - 1] = {
        ...newData[roomNumber - 1],
        InfantCount: value
      };

      const totalPeople = newData.reduce(
        (total, room) =>
          total + room.AdultCount + room.ChildCount + room.InfantCount,
        0
      );
      if (totalPeople <= 9) {
        return newData;
      } else {
        setAlertMsg('Het totale aantal personen mag niet meer dan 9 zijn.');
        setIsModalVisible(true);
        return prevData;
      }
    });
  };

  const handleChildrenChange = (value = 0) => {
    if (!adults && value > 0) {
      message.warning(
        'Controleer eerst of er minimaal 1 Reiziger aanwezig is.'
      );
      return;
    }

    // Update the temporary room data
    setRoomData(prevData => {
      const newData = [...prevData];
      const newChildrenAges = [...childrenAges];
      newData[roomNumber - 1] = {
        ...newData[roomNumber - 1],
        ChildCount: value,
        childAgeList: value
          ? Array(value)
            .fill(null)
            .map((v, i) => newChildrenAges[i] ?? null)
          : []
      };

      const totalPeople = newData.reduce(
        (total, room) =>
          total + room.AdultCount + room.ChildCount + room.InfantCount,
        0
      );

      if (totalPeople <= 9) {
        return newData;
      } else {
        setAlertMsg('Het totale aantal personen mag niet meer dan 9 zijn.');
        setIsModalVisible(true);
        return prevData;
      }
    });
  };
  const handleChildAgeChange = (index, age) => {
    if (age !== null) {
      const newChildrenAges = [...childrenAges];
      newChildrenAges[index] = age;

      setRoomData(prevData => {
        const newData = [...prevData];
        newData[roomNumber - 1] = {
          ...newData[roomNumber - 1],
          childAgeList: newChildrenAges
        };
        return newData;
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const adultOptions =
    !ageData || ageData === null || Object.keys(ageData || {})?.length === 0
      ? Array.from({ length: 4 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} Reiziger${i + 1 > 1 ? 's' : ''}`
      }))
      : Array.from(
        new Set(ageData?.combination?.map(item => item.adultCount))
      ).map(adultCount => ({
        value: adultCount,
        label:
          adultCount === 1
            ? `${adultCount} Reiziger`
            : `${adultCount} Reizigers`
      }));

  const babyOptions =
    !ageData || ageData === null || Object.keys(ageData || {})?.length === 0
      ? Array.from({ length: 4 }, (_, i) => ({
        value: i,
        label: i === 0 ? 'Aantal baby’s' : `${i} bab${i > 1 ? 'y’s' : 'y'}`
      }))
      : Array.from({ length: adults + 1 }, (_, i) => ({
        value: i,
        label: i === 0 ? 'Aantal baby’s' : `${i} bab${i > 1 ? 'y’s' : 'y'}`
      }));

  useEffect(() => {
    if (minAge !== null && maxAge !== null && maxAge >= minAge) {
      const ageRange = Array.from({ length: maxAge - minAge + 1 }, (_, i) => ({
        value: minAge + i,
        label: `${minAge + i} jaar`
      }));
      setAgeOptions(ageRange);
    }
  }, [minAge, maxAge]); // Re-run when minAge or maxAge changes

  const childrenOptions =
    !ageData || ageData === null || Object.keys(ageData || {})?.length === 0
      ? Array.from({ length: 4 }, (_, i) => ({
        value: i,
        label: i === 0 ? 'Aantal kinderen' : `${i} kind${i > 1 ? 'eren' : ''}`
      }))
      : Array.from(
        new Set(
          ageData?.combination
            ?.filter(combination => combination.adultCount === adults)
            ?.map(combination => combination.childCount)
        )
      ).map(count => ({
        value: count,
        label:
          count === 0
            ? 'Aantal kinderen'
            : `${count} kind${count > 1 ? 'eren' : ''}`
      }));

  // const ageOptions = Array.from({ length: 7 }, (_, i) => ({
  //   value: i + 6,
  //   label: `${i + 6} years`
  // }));
  const handleCancel = () => setIsModalVisible(false);
  const handleOk = () => setIsModalVisible(false);
  return (
    <>
      <div className={styles.room}>
        <div className={styles.roomWrapper}>
          <h2 className={styles.typeTitle}>Kamer {roomNumber}</h2>
          <div className={styles.btnContainer}>
            <Button
              className={
                isVisible
                  ? `${condition ? styles.arrowUpHome : styles.arrowUp}`
                  : `${styles.arrowDown}`
              }
              onClick={toggleVisibility}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0', // optional: adjust padding to better fit the icon
                width: '30px', // adjust the size of the button to fit the icon better
                height: '30px'
              }}
            >
              {isVisible ? (
                <MdKeyboardArrowUp
                  size={24} // Increase the size of the icon
                  style={{
                    color: 'white',
                    marginLeft: '0' // Center the icon by removing extra margins
                  }}
                />
              ) : (
                <MdKeyboardArrowDown
                  size={24} // Increase the size of the icon
                  style={{
                    color: 'black',
                    marginLeft: '0' // Center the icon by removing extra margins
                  }}
                />
              )}
            </Button>
          </div>
        </div>
        {isVisible && (
          <div className={styles.containerRooms}>
            <div className={styles.wrapper}>
              <div className={styles.adultsContainer}>
                <div>
                  <h4 className={styles.adultsTitle}>Reizigers</h4>
                  <p className={styles.ageRange}>vanaf {maxAge + 1} jaar</p>
                </div>
                <CustomSelect
                  options={adultOptions}
                  suffixIcon={<DropdownSvg />}
                  size='large'
                  travelCompany={true}
                  allowClear
                  placeholder='Aantal Reizigers'
                  onChange={handleAdultsChange}
                  value={adults}
                  className={styles.selectFixedWidth}
                />
              </div>
              <div className={styles.childrensContainer}>
                <div>
                  <h4 className={styles.adultsTitle}>kinderen</h4>
                  {ageData ? (
                    <p className={styles.ageRange}>
                      Leeftijd: {minAge} t/m {maxAge} jaar
                    </p>
                  ) : (
                    <p className={styles.ageRange}>Leeftijd laden...</p>
                  )}
                </div>
                <CustomSelect
                  options={childrenOptions}
                  suffixIcon={<DropdownSvg />}
                  allowClear
                  size='large'
                  travelCompany={true}
                  placeholder={
                    childrenOptions?.length === 0 ? 'Aantal inderen' : ''
                  }
                  onChange={handleChildrenChange}
                  value={children}
                  className={styles.selectFixedWidth}
                />
              </div>
              {childrenAges.length > 0 && (
                <div className={styles.childAgeContainer}>
                  {childrenAges.map((age, index) => (
                    <div key={index} className={styles.childAgeSelect}>
                      <h4 className={styles.adultsTitle}>
                        kind {index + 1} Leeftijd
                      </h4>
                      <CustomSelect
                        options={ageOptions}
                        suffixIcon={<DropdownSvg />}
                        size='large'
                        travelCompany={true}
                        allowClear={false}
                        placeholder='Selecteer leeftijd'
                        onChange={value => handleChildAgeChange(index, value)}
                        value={age}
                        className={styles.selectFixedWidth}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.adultsContainer}>
                <div>
                  <h4 className={styles.adultsTitle}>baby’s</h4>
                  <p className={styles.ageRange}>Leeftijd : 0 t/m 2 jaar</p>
                </div>
                <CustomSelect
                  options={babyOptions}
                  suffixIcon={<DropdownSvg />}
                  size='large'
                  travelCompany={true}
                  allowClear
                  placeholder='Aantal baby’s'
                  onChange={handleBabiesChange}
                  value={babies}
                  className={styles.selectFixedWidth}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={800}
        closable={false}
      >
        <div className={styles.modalHeader}>
          <h2>Alert</h2>
          <p>
            <Image src={alertIcn} alt='alertIcn' />
          </p>
          <p className={styles.warningAlert}>{alertMsg}</p>
          <div className={styles.footer}>
            <ButtonContainer
              size='large'
              className={styles.loginBtn}
              onClick={handleOk}
            >
              Ok
            </ButtonContainer>
          </div>
        </div>
      </Modal>
    </>
  );
};

const TravelCompany = ({
  onClose,
  tooltipVisible,
  onDone,
  condition,
  initialRoomData,
  selectedCode,
  ...props
}) => {
  const [numRooms, setNumRooms] = useState(initialRoomData?.length || 1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState();
  const [roomData, setRoomData] = useState([
    { AdultCount: 2, ChildCount: 0, InfantCount: 0, ChildAgeList: [] }
  ]);
  const [errorAge, setAgeError] = useState(null);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [ageData, setAgeData] = useState({});
  const searchParams = useSearchParams();
  const code = selectedCode || searchParams.get('code') || 'code';
  const {
    passngerCombination,
    loading: loadingpassngerCombination,
    error: errorpassngerCombination
  } = useAppSelector(state => state?.passngerCombination);
  useEffect(() => {
    setRoomData(initialRoomData);
    setNumRooms(initialRoomData?.length || 1);
  }, [initialRoomData]);

  const handleAddRoom = () => {
    if (getTotalPeopleCount() >= 9) {
      setAlertMsg(
        'U hebt al het maximale aantal reizigers voor de geselecteerde locatie geselecteerd'
      );
      setIsModalVisible(true);
      return;
    }
    if (numRooms >= 3) {
      message.warning('Je kunt geen kamers meer toevoegen.');
      return;
    }

    setNumRooms(numRooms + 1);
    if (getTotalPeopleCount() == 8) {
      setRoomData(prevData => [
        ...prevData,
        {
          AdultCount: 1,
          ChildCount: 0,
          InfantCount: 0
          // childAgeList: []
        }
      ]);
    } else {
      setRoomData(prevData => [
        ...prevData,
        {
          AdultCount: 2,
          ChildCount: 0,
          InfantCount: 0
          // childAgeList: []
        }
      ]);
    }
  };
  useEffect(() => {
    const newMinAge = passngerCombination?.childMinAge ?? 2;
    const newMaxAge = passngerCombination?.childMaxAge ?? 17;
    setMinAge(newMinAge);
    setMaxAge(newMaxAge);
    setAgeData(passngerCombination);
  }, [passngerCombination]);
  const handleRemoveRoom = () => {
    if (numRooms > 1) {
      setNumRooms(numRooms - 1);
      setRoomData(prevData => prevData.slice(0, -1));
    }
  };

  const getTotalPeopleCount = () => {
    return roomData.reduce(
      (total, room) =>
        total + room.AdultCount + room.ChildCount + room.InfantCount,
      0
    );
  };

  useEffect(() => {
    const totalPeople = getTotalPeopleCount();

    if (totalPeople > 9) {
      setAlertMsg('Het totale aantal personen mag niet meer dan 9 zijn.');
      setIsModalVisible(true);
      return;
    }
    // eslint-disable-next-line
  }, [roomData]);

  const rooms = Array.from({ length: numRooms }, (_, index) => (
    <RoomComponent
      key={index}
      minAge={minAge}
      maxAge={maxAge}
      ageData={ageData}
      roomNumber={index + 1}
      roomData={roomData[index]}
      setRoomData={setRoomData}
      setAlertMsg={setAlertMsg}
      condition={condition}
    // {...props}
    />
  ));
  const handleDoneClick = () => {
    // dispatch(
    //   updatePayload({
    //     RoomRequest: RoomRequest?.map(
    //       (room, index) =>
    //         true && {
    //           ...room,
    //           RoomAllocationTypeCode:
    //           roomLists[0].roomTypeList[0].roomAllocationTypeCode
    //         }
    //     )
    //   })
    // );

    // if (!isUpdated) return onClose();

    // if (totalPeople > 9) {
    //   setAlertMsg('Het totale aantal personen mag niet meer dan 9 zijn.');
    //   setIsModalVisible(true);
    //   return;
    // }
    for (let room of roomData) {
      if (room.AdultCount < 1) {
        return message.warning(
          'In elke kamer dient minimaal één Reiziger aanwezig te zijn.'
        );
      }
      if (
        room?.ChildCount > 0 &&
        room?.childAgeList?.some(age => age === null)
      ) {
        return message.warning('Selecteer de leeftijden voor alle kinderen.');
      }
      if (getTotalPeopleCount() > 9) {
        setAlertMsg('Het totale aantal personen mag niet meer dan 9 bedragen.');
        setIsModalVisible(true);
        return;
      }
      if (getTotalPeopleCount() < 1) {
        setAlertMsg('Het totale aantal personen mag niet minder dan 1 zijn.');
        setIsModalVisible(true);
        return;
      }
    }
    onDone(roomData);
  };
  const handleCancel = () => setIsModalVisible(false);
  const handleOk = () => setIsModalVisible(false);

  return (
    <>
      <div
        className={`${styles.tooltipContainer} ${condition ? styles.activeTooltip : ''
          }`}
      >
        <div className={styles.container}>
          <div className={styles.noOfRoomsContainer}>
            <h1 className={styles.title}>Aantal kamers</h1>
            <div className={styles.btns}>
              <Button className={styles.minus} onClick={handleRemoveRoom}>
                <MinusSvg className={styles.minusIcon} />
              </Button>
              <span className={styles.roomCount}>{numRooms}</span>
              <Button
                className={`${condition ? styles.plusHome : styles.plus}`}
                onClick={handleAddRoom}
              >
                <PlusSvg className={styles.plusIcon} />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.totalPeopleCount}>
          Totaal {getTotalPeopleCount()} personen
        </div>
        <div className={styles.roomsContainer}>{rooms}</div>
        <ButtonContainer
          className={`${styles.doneBtn} ${condition ? styles.bgColor : ''}`}
          onClick={handleDoneClick}
          tooltipvisible
        >
          Opslaan
        </ButtonContainer>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={800}
        closable={false}
      >
        <div className={styles.modalHeader}>
          <h2>Alert</h2>
          <p>
            <Image src={alertIcn} alt='alertIcn' />
          </p>
          <p className={styles.warningAlert}>{alertMsg}</p>
          <div className={styles.footer}>
            <ButtonContainer
              size='large'
              className={styles.loginBtn}
              onClick={handleOk}
            >
              Ok
            </ButtonContainer>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TravelCompany;

const usePreventBodyScroll = isModalVisible => {
  useEffect(() => {
    const handleTouchMove = e => {
      if (!e.target.closest('.ant-select-dropdown')) {
        e.preventDefault();
      }
    };

    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      });
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isModalVisible]);
};

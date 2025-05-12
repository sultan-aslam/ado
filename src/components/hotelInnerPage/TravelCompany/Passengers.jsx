import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import styles from './passengers.module.css';
import CustomSelect from '@/components/customSelect/CustomSelect';
import { DropdownSvg } from '@/components/common/svgs/Svgs';
import ButtonContainer from '@/components/button/Button';

const Passengers = ({
  initialAdults,
  initialChildren,
  initialChildrenAges,
  onDone
}) => {
  const [adults, setAdults] = useState(initialAdults || null);
  const [children, setChildren] = useState(initialChildren || 0);
  const [childrenAges, setChildrenAges] = useState(initialChildrenAges || []);

  useEffect(() => {
    setAdults(initialAdults || null);
    setChildren(initialChildren || 0);
    setChildrenAges(initialChildrenAges || []);
  }, [initialAdults, initialChildren, initialChildrenAges]);

  const handleAdultsChange = value => {
    setAdults(value);
  };

  const handleChildrenChange = value => {
    if (!adults && value > 0) {
      message.warning('Selecteer eerst minimaal 1 Reiziger.');
      return;
    }
    setChildren(value);
    setChildrenAges(value ? Array(value).fill(null) : []);
  };

  const handleChildAgeChange = (index, age) => {
    if (age !== null) {
      const newChildrenAges = [...childrenAges];
      newChildrenAges[index] = age;
      setChildrenAges(newChildrenAges);
    }
  };

  const handleDoneClick = () => {
    if (!adults) {
      message.warning('Selecteer eerst minimaal 1 Reiziger.');
      return;
    }
    if (children === 0) {
      setChildren(0);
      setChildrenAges([]);
    } else if (children > 0 && childrenAges?.some(age => age === null)) {
      message.warning('Selecteer de leeftijden van alle kinderen.');
      return;
    }
    onDone(adults, children, childrenAges);
  };

  const adultOptions = Array.from({ length: 4 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Volwassen${i + 1 > 1 ? 's' : ''}`
  }));

  const childrenOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i,
    label: i === 0 ? 'Select Kinderen' : `${i} kind${i > 1 ? 'eren' : ''}`
  }));

  const ageOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i + 6,
    label: `${i + 6} jaar`
  }));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Reisgezelschap</h1>
        <div className={styles.adultsContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Reizigers</h4>
            <p className={styles.ageRange}>vanaf 21 jaar</p>
          </div>
          <CustomSelect
            options={adultOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            travelCompany={true}
            allowClear
            placeholder='Select Reizigers'
            onChange={handleAdultsChange}
            value={adults}
            className={styles.selectFixedWidth}
          />
        </div>
        <div className={styles.adultsContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Baby’s</h4>
            <p className={styles.ageRange}>Leeftijdsbereik: 0 t/m 2 jaar</p>
          </div>
          <CustomSelect
            options={adultOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            travelCompany={true}
            allowClear
            placeholder='Select Baby’s'
            onChange={handleAdultsChange}
            value={adults}
            className={styles.selectFixedWidth}
          />
        </div>
        <div className={styles.childrensContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Kinderen</h4>
            <p className={styles.ageRange}>Leeftijdsbereik: 6 t/m 12 jaar</p>
          </div>
          <CustomSelect
            options={childrenOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            travelCompany={true}
            placeholder={childrenOptions?.length === 0 ? 'Select Kinderen' : ''}
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
                  Kind {index + 1} Leeftijd
                </h4>
                <CustomSelect
                  options={ageOptions}
                  suffixIcon={<DropdownSvg />}
                  size='large'
                  travelCompany={true}
                  allowClear={false}
                  placeholder='Select Age'
                  onChange={value => handleChildAgeChange(index, value)}
                  value={age}
                  className={styles.selectFixedWidth}
                />
              </div>
            ))}
          </div>
        )}
        <ButtonContainer className={styles.doneBtn} onClick={handleDoneClick}>
          Done
        </ButtonContainer>
      </div>
    </div>
  );
};

export default Passengers;

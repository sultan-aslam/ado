import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import styles from './travelCompany.module.css';
import CustomSelect from '@/components/customSelect/CustomSelect';
import { DropdownSvg } from '@/components/common/svgs/Svgs';
import ButtonContainer from '@/components/button/Button';

const TravelCompany = ({
  initialAdults,
  initialChildren,
  initialChildrenAges,
  initialBabies,
  initialAges,
  minAge,
  maxAge,
  onDone,
  setTravelDetails
}) => {
  const [adults, setAdults] = useState(initialAdults || null);
  const [childMinAge, setChildMinAge] = useState(minAge || 0);
  const [children, setChildren] = useState(initialChildren || 0);
  const [childrenAges, setChildrenAges] = useState(initialChildrenAges || []);
  const [babies, setBaby] = useState(initialBabies || 0);
  const [ageData, setAgeData] = useState(null);
  const [ageOptions, setAgeOptions] = useState([]); // ageOptions state to store dynamic age options
  // const [travelDetails, setTravelDetails] = useState({
  //   adults: null,
  //   children: null,
  //   childrenAges: [],
  //   babies: null
  // });

  useEffect(() => {
    setChildMinAge(minAge || 0);
    setAdults(initialAdults || null);
    setChildren(initialChildren || 0);
    setChildrenAges(initialChildrenAges || []);
    setBaby(initialBabies || 0);
    setAgeData(initialAges || null);
    // eslint-disable-next-line
  }, [
    initialAdults,
    initialChildren,
    initialChildrenAges,
    initialBabies,
    initialAges
  ]);
  // useEffect(() => {
  //   setChildrenAges([]);
  //   setChildren(0);
  //   setTravelDetails(prevState => ({
  //     ...prevState,
  //     children: 0,
  //     childrenAges: []
  //   }));
  // }, [minAge, maxAge]);
  const handleAdultsChange = value => {
    setAdults(value);
    if (typeof setTravelDetails === 'function') {
      setTravelDetails({
        adults: value,
        children: children,
        childrenAges: childrenAges,
        babies: babies
      });
    }
  };
  const handleBabiesChange = value => {
    setBaby(value);
    if (typeof setTravelDetails === 'function') {
      setTravelDetails({
        adults: adults,
        children: children,
        childrenAges: childrenAges,
        babies: value
      });
    }
  };

  const handleChildrenChange = (value = 0) => {
    if (!adults && value > 0) {
      message.warning('Selecteer eerst minimaal 1 Reiziger.');
      return;
    }

    setChildren(value);
    // setTravelDetails({ adults: adults, children:children, childrenAges:newChildrenAges, babies:babies });
    // setChildrenAges(value ? Array(value).fill(null) : []);
    setChildrenAges(
      value === 0
        ? []
        : value < initialChildrenAges?.length
        ? initialChildrenAges.slice(0, value)
        : initialChildrenAges.concat(
            Array(Math.max(0, value - initialChildrenAges.length)).fill(null)
          )
    );
    if (typeof setTravelDetails === 'function') {
      setTravelDetails({
        adults: adults,
        children: value,
        childrenAges:
          value === 0
            ? []
            : value < initialChildrenAges?.length
            ? initialChildrenAges.slice(0, value)
            : initialChildrenAges.concat(
                Array(Math.max(0, value - initialChildrenAges.length)).fill(
                  null
                )
              ),
        babies: babies
      });
    }
  };

  const handleChildAgeChange = (index, age) => {
    if (age !== null) {
      const newChildrenAges = [...childrenAges];
      newChildrenAges[index] = age;
      setChildrenAges(newChildrenAges);
      if (typeof setTravelDetails === 'function') {
        setTravelDetails({
          adults: adults,
          children: children,
          childrenAges: newChildrenAges,
          babies: babies
        });
      }
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
    } else if (
      children > 0 &&
      childrenAges?.some(age => age === null || !age)
    ) {
      message.warning('Selecteer de leeftijden van alle kinderen.');
      return;
    }
    onDone(adults, children, childrenAges, babies);
  };

  const adultOptions = Array.from({ length: 4 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Volwassen${i + 1 > 1 ? 's' : ''}`
  }));

  const babyOptions = Array.from({ length: 4 }, (_, i) => ({
    value: i,
    label:
      i === 0 ? "Selecteer Aantal Baby's" : `${i} Bab${i > 1 ? 'ies' : 'y'}`
  }));

  const childrenOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i,
    label:
      i === 0 ? 'Selecteer Aantal kinderen' : `${i} kind${i > 1 ? 'eren' : ''}`
  }));

  // const ageOptions = Array.from({ length: 7 }, (_, i) => ({
  //   value: i + 6,
  //   label: `${i + 6} years`
  // }));
  useEffect(() => {
    if (childMinAge !== null && maxAge !== null && maxAge >= minAge) {
      const ageRange = Array.from(
        { length: maxAge - childMinAge + 1 },
        (_, i) => ({
          value: childMinAge + i,
          label: `${childMinAge + i} jaar`
        })
      );
      setAgeOptions(ageRange);
    } else {
      const ageRange = Array.from({ length: 17 - 2 + 1 }, (_, i) => ({
        value: 2 + i,
        label: `${2 + i} jaar`
      }));
      setAgeOptions(ageRange);
    }
    // eslint-disable-next-line
  }, [childMinAge, maxAge]); // Re-run when minAge or maxAge changes

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Reisgezelschap</h1>
        <div className={styles.adultsContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Aantal Reiziger(s)</h4>
            <p className={styles.ageRange}>vanaf 12 jaar</p>
          </div>
          <CustomSelect
            options={adultOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            travelCompany={true}
            allowClear
            placeholder='Selecteer Aantal Reizigers'
            onChange={handleAdultsChange}
            value={adults}
            className={styles.selectFixedWidth}
          />
        </div>

        <div className={styles.childrensContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Aantal kinderen</h4>
            {ageData ? (
              <p className={styles.ageRange}>
                {ageData.childMinAge} t/m {ageData.childMaxAge} jaar
              </p>
            ) : (
              <p className={styles.ageRange}>2 t/m 17 jaar</p>
            )}
          </div>
          <CustomSelect
            options={childrenOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            allowClear
            travelCompany={true}
            placeholder={
              childrenOptions?.length === 0 ? 'Selecteer Aantal kinderen' : ''
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
                  Kind {index + 1} Leeftijd
                </h4>
                <CustomSelect
                  options={ageOptions}
                  suffixIcon={<DropdownSvg />}
                  size='large'
                  travelCompany={true}
                  allowClear
                  placeholder='Selecteer Leeftijd'
                  onChange={value => handleChildAgeChange(index, value)}
                  value={age}
                  // className={styles.selectFixedWidth}
                />
              </div>
            ))}
          </div>
        )}
        <div className={styles.adultsContainer}>
          <div>
            <h4 className={styles.adultsTitle}>Aantal Baby’s </h4>
            <p className={styles.ageRange}>Jonger dan 2 jaar</p>
          </div>
          <CustomSelect
            options={babyOptions}
            suffixIcon={<DropdownSvg />}
            size='large'
            travelCompany={true}
            allowClear
            placeholder="Selecteer Aantal baby's"
            onChange={value => handleBabiesChange(value)}
            value={babies}
            className={styles.selectFixedWidth}
          />
        </div>
        <ButtonContainer className={styles.doneBtn} onClick={handleDoneClick}>
          Reisgezelschap opslaan
        </ButtonContainer>
      </div>
    </div>
  );
};

export default TravelCompany;

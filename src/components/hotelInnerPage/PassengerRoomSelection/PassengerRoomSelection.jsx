import { DropdownSvg, PersonsSvg } from '@/components/common/svgs/Svgs';
import CustomSelect from '@/components/customSelect/CustomSelect';
import { Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './passengerRoomSelection.module.css';
import { useAppSelector } from '@/store/reduxHooks';



const PassengerRoomSelection = ({
  onChange,
  travelCompany,
  setSelectedRoomType,
  AdultCount,
  ChildCount,
  InfantCount,
  childAgeList,
  hotelSelectionLoading
}) => {
  const [numChildren, setNumChildren] = useState(ChildCount ?? 0);
  const [numInfants, setNumInfants] = useState(InfantCount ?? 0);
  const [childAges, setChildAges] = useState(childAgeList ?? []);
  const [adultCount, setAdultCount] = useState(AdultCount ?? 2);
  const {
    passngerCombination,
    loading: loadingpassngerCombination,
    error: errorpassngerCombination
  } = useAppSelector(state => state?.passngerCombination);

  const childMinAge = passngerCombination?.childMinAge ?? 0;
  const childMaxAge = passngerCombination?.childMaxAge ?? 13;

  const filterData = [
    { heading: 'Aantal Reizigers', key: 'Adults', type: 'AdultCount' ,agelimit :`vanaf ${childMaxAge + 1} jaar`},
    { heading: 'Aantal kinderen', key: 'Children', type: 'ChildCount' ,agelimit :`Leeftijd: ${childMinAge} t/m ${childMaxAge} jaar`},
    { heading: "Aantal baby's", key: 'Babies', type: 'InfantCount', agelimit :"Leeftijd : 0 t/m 2 jaar"}
  ];
  const handleSelectChange = type => value => {
    const data = {};
    if (type === 'childAgeList') {
      data[type] = value ? value.map(val => parseInt(val.split('-')[0])) : [];
    } else {
      data[type] = value ? parseInt(value.split('-')[0]) : 0;
      if (type === 'ChildCount') {
        const newChildrenCount = data[type];
        setNumChildren(newChildrenCount);

        // Adjust child ages based on the new number of children
        const newChildrenAges = [...childAges];

        // Add children with default age (e.g., 2 years old) if the count increases
        while (newChildrenCount > newChildrenAges.length) {
          newChildrenAges.push(2); // Default age for new children
        }

        // Remove ages if the count decreases
        newChildrenAges.splice(newChildrenCount);

        setChildAges(newChildrenAges);
      } else if (type === 'InfantCount') {
        setNumInfants(data[type]);
      } else if (type === 'AdultCount') {
        setAdultCount(data[type]);
        // Reset children and infants count if the selected adults are fewer
        if (numChildren > data[type]) setNumChildren(data[type]);
        if (numInfants > data[type]) setNumInfants(data[type]);
      }
    }
    onChange(data);
  };

  useEffect(() => {
    if (AdultCount !== adultCount) onChange({ AdultCount: adultCount });
    // eslint-disable-next-line
  }, [adultCount]);

  const handleChildAgeChange = index => value => {
    setChildAges(prevAges => {
      const updatedAges = [...prevAges];
      updatedAges[index] = parseInt(value.split('-')[0]);
      onChange({ childAgeList: updatedAges });
      return updatedAges;
    });
  };

  return (
    <div className={styles.filterContainer}>
      {filterData.map(({ heading, key, type ,agelimit }) => (
        <div
          key={key}
          className={
            travelCompany ? `${styles.travelCompanyFilter}` : `${styles.filter}`
          }
        >
          <Typography className={styles.filterHeadingMain}>{heading}</Typography>
          <Typography className={styles.filterHeading}>{agelimit}</Typography>
          <CustomSelect
            prefixIcon={<PersonsSvg />}
            suffixIcon={<DropdownSvg />}
            disabled={hotelSelectionLoading}
            size='large'
            customStyle={true}
            onChange={handleSelectChange(type)}
            value={
              type === 'AdultCount'
                ? `${adultCount}-qty`
                : type === 'ChildCount'
                  ? `${numChildren}-qty`
                  : type === 'InfantCount'
                    ? `${numInfants}-qty`
                    : undefined
            }
          >
            {type === 'AdultCount'
              ? [1, 2, 3, 4].map((qty, index) => (
                <Select.Option key={index} value={`${qty}-qty`}>
                  <p style={{ marginRight: '40px' }}>
                    {qty} Reiziger{qty > 1 ? 's' : ''}
                  </p>
                </Select.Option>
              ))
              : type === 'ChildCount' || type === 'InfantCount'
                ? Array.from({ length: 5 }, (_, qty) => (
                  <Select.Option key={qty} value={`${qty}-qty`}>
                    <p style={{ marginRight: '40px' }}>
                      {qty}{' '}
                      {type === 'ChildCount'
                        ? `Kind${qty > 1 ? 'eren' : ''}`
                        : `Baby${qty > 1 ? "'s" : ''}`}
                    </p>
                  </Select.Option>
                ))
                : null}
          </CustomSelect>
        </div>
      ))}

      {/* Render child age selectors dynamically based on number of children */}
      {Array.from({ length: numChildren }).map((_, index) => (
        <div key={index} className={styles.filter}>
          <Typography className={styles.filterHeadingMain}>
            Leeftijd van het kind
            {index + 1}
          </Typography>
          <Typography className={styles.filterHeadingx}>Leeftijd van het kind</Typography>
          <CustomSelect
            disabled={hotelSelectionLoading}
            prefixIcon={<PersonsSvg />}
            suffixIcon={<DropdownSvg />}
            size='large'
            customStyle={true}
            value={`${childAges[index]}-age`}
            onChange={handleChildAgeChange(index)}
          >
            {Array.from({ length: childMaxAge - childMinAge + 1 }, (_, idx) => {
              const age = childMinAge + idx;
              return (
                <Select.Option key={age} value={`${age}-age`}>
                  <p style={{ marginRight: '40px' }}>{`${age}-jaar`}</p>
                </Select.Option>
              );
            })}
          </CustomSelect>
        </div>
      ))}
    </div>
  );
};

export default PassengerRoomSelection;

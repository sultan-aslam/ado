'use client';

import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import styles from './mobileLandingFilters.module.css';
import ButtonContainer from '@/components/button/Button';
import CustomSelectWithLabel from '@/components/customSelectWithLabel/CustomSelectWithLabel';
import CustomInputWithLabel from '@/components/customInputWithLabel/CustomInputWithLabel';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import CustomDatePickerWithLabel from '@/components/CustomDatePickerWithLabel/CustomDatePickerWithLabel';
import { fetchCustomSearchList } from '@/store/features/customSearch/customSearchSlice';
import TravelCompany from '../travelCompany/TravelCompany';
import { Drawer, message, Modal } from 'antd';
import { fetchNavSearchList } from '@/store/features/navSearch/navSearchSlice';

const MobileLandingFilters = () => {
  const [selectedHotelCategory, setSelectedHotelCategory] = useState(null);
  const [selectedHotelCode, setSelectedHotelCode] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [travelCompanyVisible, setTravelCompanyVisible] = useState(false);
  const [travelDetails, setTravelDetails] = useState({
    adults: null,
    children: null,
    childrenAges: []
  });

  const [selectedTransportType, setSelectedTransportType] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const departureDatePickerRef = useRef(null);
  const returnDatePickerRef = useRef(null);

  const transportTypeOptions = [
    { value: 'packages', label: 'Packages' },
    { value: 'hotel_only', label: 'Hotel Only' }
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, loading, error } = useAppSelector(state => state.searchList);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(
        fetchNavSearchList({ PageNumber: 1, PageSize: 10, searchTerm: '' })
      );
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (selectedDate !== null) {
      setSelectedReturnDate(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const sortedData = [...data]?.sort((a, b) =>
        a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase())
      );
      setFilteredResults(sortedData);
    }
  }, [data]);

  const handleTravelCompanyClick = e => {
    e.stopPropagation();
    setTravelCompanyVisible(true);
  };

  const handleDropdownVisibleChange = visible => {
    if (visible) {
      setTravelCompanyVisible(true);
    } else {
      setTravelCompanyVisible(false);
    }
  };

  const handleTravelCompanyDone = (adults, children, childrenAges) => {
    setTravelDetails({ adults, children, childrenAges });
    setSelectedPeople(
      `${adults} volwassen${adults > 1 ? 's' : ''}, ${children} kind${
        children > 1 ? 'eren' : ''
      }`
    );
    setTravelCompanyVisible(false);
  };

  const handleSearch = () => {
    if (searchInput && selectedItem) {
      let url = '';

      switch (selectedItem.category) {
        case 'hotel':
          url = `/hotel/${selectedHotelCode}`;
          break;
        case 'country':
          url = `/destination?Destination=countries&id=${selectedItem.id}`;
          break;
        case 'region':
          url = `/destination?Destination=regions&id=${selectedItem.id}`;
          break;
        case 'place':
          url = `/destination?Destination=places&id=${selectedItem.id}`;
          break;
        case 'landingpage':
          url = `/landing?LandingPageName=${selectedItem.name}&id=${selectedItem.id}`;
          break;
        default:
          message.warning('Invalid category.');
          return;
      }

      const queryParams = [];

      if (selectedDate) {
        queryParams.push(`departureDate=${selectedDate.format('YYYY-MM-DD')}`);
      }
      if (selectedReturnDate) {
        queryParams.push(
          `returnDate=${selectedReturnDate.format('YYYY-MM-DD')}`
        );
      }
      if (selectedPeople) {
        queryParams.push(`people=${selectedPeople}`);
      }

      if (queryParams.length > 0) {
        url += (url.includes('?') ? '&' : '?') + queryParams.join('&');
      }

      router.push(url);
    } else {
      message.warning(
        'At least a hotel or destination is required to perform the search.'
      );
    }
  };

  const disabledReturnDate = current => {
    return current && current <= selectedDate;
  };

  const disabledPastDates = current => {
    const today = dayjs().startOf('day');
    return current && current < today;
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchInputRef]);

  useEffect(() => {
    if (searchInput) {
      const filtered = [...data]
        ?.filter(item =>
          item?.name?.toLowerCase().includes(searchInput?.toLowerCase())
        )
        .sort((a, b) =>
          a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase())
        );

      setFilteredResults(filtered);
    } else {
      const sortedData = [...data].sort((a, b) =>
        a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase())
      );
      setFilteredResults(sortedData);
    }
  }, [searchInput, data]);

  const handleLinkClick = item => {
    setSearchInput(item.name);
    setSelectedHotelCategory(item.category);
    setSelectedHotelCode(item.code);
    setSelectedItem(item);
    setSearchActive(false);
    setFilteredResults([]);
  };

  const handleSearchInputChange = e => {
    const query = e.target.value;
    setSearchInput(query);

    if (query && searchActive) {
      const results = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }

    if (!query) {
      setSearchActive(true);
    }
  };

  const allowClearFunction = () => {
    setSearchInput('');
    setSelectedHotelCategory('');
    setSelectedHotelCode('');
    setFilteredResults([]);
  };

  const handleSearchInputFocus = () => {
    if (!searchInput && data?.length > 0) {
      const sortedData = [...data].sort((a, b) =>
        a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase())
      );
      setFilteredResults(sortedData);
      setSearchActive(true);
    }
  };

  const scrollToElementWithOffset = elementRef => {
    const offset = window.innerHeight * 0.1;
    if (elementRef.current) {
      const elementPosition =
        elementRef.current.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDatePickerChange = date => {
    setSelectedDate(date);
    scrollToElementWithOffset(departureDatePickerRef);
  };

  const handleReturnDateChange = date => {
    setSelectedReturnDate(date);
    scrollToElementWithOffset(returnDatePickerRef);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSearch} ref={searchInputRef}>
        <CustomInputWithLabel
          style={{ maxWidth: 360 }}
          size='large'
          label={'Hotel / Destination'}
          placeholder={'Search Here'}
          allowClear
          value={searchInput}
          onChange={handleSearchInputChange}
          onFocus={handleSearchInputFocus}
        />
        {searchActive && filteredResults?.length > 0 && (
          <div className={styles.searchResults}>
            {filteredResults?.map((result, index) => (
              <div
                key={index}
                className={styles.nameCategory}
                onClick={() => handleLinkClick(result)}
              >
                <div
                  className={
                    result?.category === 'hotel' ? styles.name : styles.nameBold
                  }
                >
                  {result.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filter} ref={departureDatePickerRef}>
        <CustomDatePickerWithLabel
          size='large'
          label={'Departure Date'}
          landingFiltersMobile={true}
          placeholder='Select'
          onChange={handleDatePickerChange}
          onClick={() => scrollToElementWithOffset(departureDatePickerRef)}
          className={styles.customInput}
          disabledDate={disabledPastDates}
          allowClear={true}
        />
      </div>
      <div className={styles.filter} ref={returnDatePickerRef}>
        <CustomDatePickerWithLabel
          size='large'
          label={'Return Date'}
          landingFiltersMobile={true}
          placeholder='Select'
          allowClear={true}
          onChange={date => setSelectedReturnDate(date)}
          className={styles.customInput}
          disabledDate={current =>
            disabledReturnDate(current) || disabledPastDates(current)
          }
          value={selectedReturnDate}
          onClick={() => scrollToElementWithOffset(returnDatePickerRef)}
        />
      </div>
      <div className={styles.filter}>
        <div className={styles.filterTravel} style={{ flex: 2 }}>
          <CustomSelectWithLabel
            size='large'
            label={'Reisgezelschap'}
            placeholder={'Select'}
            landingFiltersMobile={true}
            travelCompany={true}
            onClick={e => handleTravelCompanyClick(e)}
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            value={selectedPeople}
            onDropdownVisibleChange={handleDropdownVisibleChange}
          />
        </div>
      </div>
      <div className={styles.filter}>
        <CustomSelectWithLabel
          size='large'
          label={'Transport Type'}
          placeholder={'Select'}
          allowClear
          landingFiltersMobile={true}
          options={transportTypeOptions}
          onChange={setSelectedTransportType}
          value={selectedTransportType}
        />
      </div>

      <div className={styles.filter}>
        <ButtonContainer
          className={styles.filterButton}
          onClick={handleSearch}
          size='large'
        >
          Search
        </ButtonContainer>
      </div>

      <Modal
        open={travelCompanyVisible}
        onCancel={() => setTravelCompanyVisible(false)}
        footer={null}
        centered
        destroyOnClose
        className={styles.modalCotainer}
      >
        <TravelCompany
          initialAdults={travelDetails?.adults}
          initialChildren={travelDetails?.children}
          initialChildrenAges={travelDetails?.childrenAges}
          onDone={handleTravelCompanyDone}
          onClose={() => {
            setTravelCompanyVisible(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default MobileLandingFilters;

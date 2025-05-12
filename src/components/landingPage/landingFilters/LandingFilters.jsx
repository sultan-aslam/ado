'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import {  useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Modal, Skeleton } from 'antd';
import dynamic from 'next/dynamic';

// import { GET, POST } from '@/lib/api';
import ButtonContainer from '@/components/common/button/Button';
import CustomDatePickerWithLabel from '@/components/common/CustomDatePickerWithLabel/CustomDatePickerWithLabel';
import CustomInputWithLabel from '@/components/common/customInputWithLabel/CustomInputWithLabel';
import CustomSelectWithLabel from '@/components/common/customSelectWithLabel/CustomSelectWithLabel';
// import TravelCompany from '../../../components/hotelInnerPage/TravelCompany/TravelCompany';
import styles from './landingFilter.module.css';
import SearchResults from './SearchResults';
import {
  useHotelStore,
  useLandingFiltersStore,
  usePackageFilterStore,
  useReselectionStore,
  useSelectionStore,
  useStepOnePassngersStore,
  useStepOneStore
} from '@/hooks/useZustandStore';
// import { setGlanceData } from '@/store/features/glance/glanceSlice';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { fetchPassngerCombination } from '@/store/features/passengerCombination/passengerCombinationSlice';

const LandingFilters = () => {
  const { packageFilter, setPackageFilter, resetPackageFilter } =
    usePackageFilterStore();
  // const {
  //   passngerCombination,
  //   loading: loadingpassngerCombination,
  //   error: errorpassngerCombination
  // } = useAppSelector(state => state?.passngerCombination);
  const passngerCombination = [];
  const loadingpassngerCombination = false;
  const errorpassngerCombination = null;
  const { setSelection } = useSelectionStore();
  const { setReselection } = useReselectionStore();
  const { resetFormData } = useStepOnePassngersStore();
  const { resetFormDataOne } = useStepOneStore();
  const { places, setPlaces } = useLandingFiltersStore();
  const { hotel } = useHotelStore();
  const [selectedHotelCategory, setSelectedHotelCategory] = useState(null);
  const [selectedTransportType, setSelectedTransportType] = useState(null);
  const [selectedHotelCode, setSelectedHotelCode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [travelCompanyVisible, setTravelCompanyVisible] = useState(false);
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [placesState, setPlaceState] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [groupedHotels, setGroupedHotels] = useState([]);
  const [groupedHotel, setGroupedHotel] = useState(places);
  const [filteredGroupedHotels, setFilteredGroupedHotels] = useState(places);
  const [showHoteslWithDestination, setShowHoteslWithDestination] =
    useState(true);
  const [loadings, setLoadings] = useState(true);
  const [errors, setErrors] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [departureDates, setDepartureDates] = useState([]);
  const [durationSelected, setDurationSelected] = useState([]);
  const [roomAllocationCode, setRoomAllocationCode] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(
    [
      {
        RoomAllocationTypeCode: roomAllocationCode,
        AdultCount: 2,
        ChildCount: 0,
        InfantCount: 0,
        ChildAgeList: []
      }
    ] || []
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [travelDetails, setTravelDetails] = useState({
    adults: null,
    children: null,
    childrenAges: [],
    babies: null
  });
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedDepartureDateDisplay, setSelectedDepartureDateDisplay] =
    useState(null);
  const [ageData, setAgeData] = useState(null);
  const departureDate = dayjs(selectedDepartureDate);
  const currentDate = dayjs(selectedReturnDate);
  const duration = currentDate.diff(departureDate, 'days');
  const [errorAge, setAgeError] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [destinationInfo, setDestinationInfo] = useState({});
  const [dyamicTravelDateLoading, setDyamicTravelDateLoading] = useState(false);
  const transportTypeOptions = [
    { value: 'packages', label: 'Pakketten' },
    { value: 'hotel_only', label: 'Alleen hotel' }
  ];
  const countries = useMemo(
    () =>
      Object.entries(filteredGroupedHotels).length
        ? Object.entries(filteredGroupedHotels)
        : Object.entries(places),
    [filteredGroupedHotels, places]
  );
  // const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);
    setMobile(window.innerWidth < 600);

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('redirectedFromBooking') === 'true') {
      setShowPopup(true);
    }
  }, []);
  const generateEnabledDates = selectedDepartureDate => {
    if (!durationSelected || durationSelected?.length === 0) {
      return [];
    }
    const departureDateObj = dayjs(selectedDepartureDate);
    const enabledDates = [];

    durationSelected.forEach(day => {
      enabledDates.push(
        departureDateObj.add(Number(day), 'day').format('YYYY-MM-DD')
      );
    });

    return enabledDates;
  };

  const disabledDate = current => {
    const enabledDates = generateEnabledDates(selectedDepartureDateDisplay);
    return !enabledDates.includes(current.format('YYYY-MM-DD'));
  };

  const continueBooking = () => {
    sessionStorage.removeItem('redirectedFromBooking');
    sessionStorage.setItem('allowedAccess', 'true');
    router.push('/booking');
  };

  const stayAtHome = () => {
    setShowPopup(false);
    sessionStorage.removeItem('redirectedFromBooking');
    resetPackageFilter(null);
    setReselection({});
    setSelection({});
    resetFormData();
    resetFormDataOne();
    localStorage.removeItem('glanceData');
    localStorage.removeItem('PayloadXYZ');
    localStorage.removeItem('checkInDate');
    localStorage.removeItem('bookingPayload');
    localStorage.removeItem('hotel-store');
    localStorage.removeItem('hotelOnlyPayload');
    localStorage.removeItem('payloadHotel');
    localStorage.removeItem('reSelectionData');
    localStorage.removeItem('glanceData');
    localStorage.removeItem('activeInboundFlight');
    localStorage.removeItem('secretCode');
    localStorage.removeItem('activeOutboundFlight');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('thirdStepData');
    localStorage.removeItem('SecondStepData');
    localStorage.removeItem('selectedReturnBaggage');
    localStorage.removeItem('selectedBaggage');
    localStorage.removeItem('airportParkingToggle');
    localStorage.removeItem('payloadSecond');
    localStorage.removeItem('formValue');
    localStorage.removeItem('passengersData');
    localStorage.removeItem('setSelectedCard');
    localStorage.removeItem('selectedCard');
    localStorage.removeItem('selectedIndexes');
    localStorage.removeItem('selectedCancellationIndexes');
    localStorage.removeItem('selectedInsurances');
    localStorage.removeItem('selectedCancellationInsurances');
    localStorage.removeItem('updatedInsurances');
    localStorage.removeItem('setInsurances');
    localStorage.removeItem('selectedParkingValue');
    localStorage.removeItem('preferencesWithI');
    localStorage.removeItem('flightsKey');
    localStorage.removeItem('codePromotion');
    localStorage.removeItem('pp');
    localStorage.removeItem('finaldiscount');
    localStorage.removeItem('extraamounts');
    localStorage.removeItem('couponState');
    localStorage.removeItem('setNoTransfer');
    '', localStorage.removeItem('checkboxStateInsurance');
  };
  useEffect(() => {
    resetPackageFilter(null);
    // dispatch(setGlanceData({ type: 'clear' }));
  }, []);

  const travelCompanyRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const pageNumberRef = useRef(pageNumber);
  const getTravelDate = async () => {
    try {
      setDyamicTravelDateLoading(true);
      const response = await POST({
        endpoint: 'api/commons/dynamichoteldate',
        body: {
          HotelId: selectedItem,
          DepartureAirport:
            packageFilter?.selectedRoute?.departureAirportCode || null,
          SelectedDate:
            (selectedDepartureDate &&
              dayjs(selectedDepartureDate).format('YYYY-MM-DDTHH:mm:ss')) ||
            null,
          Duration: duration && duration.toString(),
          RoomRequests: selectedRooms
        }
      });
      if (response.success === true) {
        const dates = response.data?.travelDates?.map(t => t.travelDate) ?? [];
        const durationSelected = response.data?.durationSelected;
        setDepartureDates(dates);
        setDurationSelected(durationSelected);
        const roomTypeList =
          response?.data?.roomListResponses[0]?.roomTypeList || [];
        const roomAllocationTypeCodes = roomTypeList.map(
          room => room.roomAllocationTypeCode
        );
        setRoomAllocationCode(
          response?.data?.roomListResponses[0]?.roomTypeList[0]
            ?.roomAllocationTypeCode
        );
        if (response.data)
          setPackageFilter({
            ...packageFilter,
            selectedRoute: response.data?.selectedRoute
          });
        // dates.length && setSelectedDepartureDate(dayjs(dates[0]));
        const formattedDate = dayjs(selectedDepartureDateDisplay).format(
          'YYYY-MM-DDTHH:mm:ss'
        );
        const isDatePresent = dates.includes(formattedDate);
        if (selectedDepartureDateDisplay === null || !isDatePresent)
          dates.length && setSelectedDepartureDateDisplay(dayjs(dates[0]));
      }
    } catch (error) {
      message.error('Failed to get travel dates. Please try again.');
    } finally {
      setDyamicTravelDateLoading(false);
    }
  };
  useEffect(() => {
    if (selectedItem && !selectedItem.startsWith('PLACE')) {
      getTravelDate();
    }
  }, [
    selectedItem,
    duration,
    selectedReturnDate,
    selectedDepartureDate,
    selectedRooms
  ]);
  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await GET({
          endpoint: 'api/commons/bannersearchlist'
        });
        setLoadings(false);
        const grouped = groupData(response.data);
        setGroupedHotel(grouped);
        setFilteredGroupedHotels(grouped);
        setPlaces(grouped);
      } catch (err) {
        !places.length && setErrors('Error fetching data');
        setLoadings(false);
      }
    };

    fetchPlacesData();
  }, []);
  useEffect(() => {
    if (selectedDate !== null) {
      setSelectedReturnDate(null);
    }
    if (selectedDate !== null) {
      setSelectedDepartureDate(null);
    }
  }, [selectedDate]);
  // const calculateTotalPeople = () => {
  //   // Extract numbers from the string and sum them up
  //   const numbers = selectedPeople?.match(/\d+/g)?.map(Number);
  //   const total = numbers?.reduce((sum, num) => sum + num, 0);
  //   return total;
  // };

  const calculateTotalPeople = () => {
    const { adults = 0, children = 0, babies = 0 } = travelDetails;
    return adults + children + babies;
  };

  const calculateDaysBetween = () => {
    const start = new Date(selectedDepartureDate);
    const end = new Date(selectedReturnDate);
    const differenceInTime = end - start;
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return differenceInDays + 1;
  };

  useEffect(() => {
    const handleClickOutside = event => {
      const parents = [
        event.target?.parentElement,
        event.target.parentElement?.parentElement
      ];

      if (
        travelCompanyRef.current &&
        !travelCompanyRef.current.contains(event.target) &&
        !event.target.classList.contains('ant-select-item-option-content') &&
        !event.target.classList.contains('ant-select-selection-item') &&
        !event.target.classList.contains('ant-select-item') &&
        !parents.some(
          event =>
            event?.classList.contains('anticon-close-circle') ||
            event?.classList.contains('ant-select-clear')
        )
      ) {
        setTravelCompanyVisible(false);
      }

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
  }, [travelCompanyRef, searchInputRef]);

  const handleReturnDateChange = date => {
    if (selectedDepartureDateDisplay === null) {
      setSelectedReturnDate(null);
      return message.warning(
        'Please select the Departure date before selecting the Return date.'
      );
    }
    if (selectedDepartureDate && date && date.isBefore(selectedDepartureDate)) {
      message.warning(
        'Invalid Date.Your Return Date cannot be previous to the Departure Date.'
      );
      // Reset the return date if it's invalid
      setSelectedReturnDate(null);
    } else {
      setSelectedReturnDate(date);
    }
  };

  const handleSearch = () => {
    if (searchQuery && selectedItem) {
      let url;
      switch (selectedItem && selectedItem.startsWith('PLACE')) {
        case false: // Check if selectedItem is a string
          url = `/${hotel?.countryInfo?.name?.replaceAll(
            ' ',
            '-'
          )}/${hotel?.regionInfo?.name?.replaceAll(
            ' ',
            '-'
          )}/${hotel?.placeInfo?.name?.replaceAll(
            ' ',
            '-'
          )}/${hotel?.name?.replaceAll(' ', '-')}`;
          break;

        case true: // Check if selectedItem is a number
          url = `/${destinationInfo?.country?.replaceAll(
            ' ',
            '-'
          )}/${destinationInfo?.region?.replaceAll(
            ' ',
            '-'
          )}/${destinationInfo?.place?.replaceAll(' ', '-')}`;
          break;

        default:
          message.warning('Invalid category.');
          return;
      }
      const queryParams = [];
      if (typeof selectedItem === 'number') {
        if (selectedDepartureDate) {
          queryParams.push(
            `departureDate=${selectedDepartureDate.format('YYYY-MM-DD')}`
          );
        }
        if (selectedReturnDate) {
          queryParams.push(
            `returnDate=${selectedReturnDate.format('YYYY-MM-DD')}`
          );
        }
        if (selectedPeople) {
          queryParams.push(`people=${selectedPeople}`);
        }
        const totalDays = calculateDaysBetween();
        const totalPeoples = calculateTotalPeople();
        if (totalDays && totalDays > 1) {
          queryParams.push(`totalDays=${totalDays} Days`);
        }
        if (totalPeoples) {
          queryParams.push(`totalPeoples=${totalPeoples} Personen`);
        }
      }

      if (selectedReturnDate) {
        setPackageFilter({
          ...packageFilter,
          selectedDuration: `${calculateDaysBetween()}`
        });
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

  const handleTravelCompanyClick1 = e => {
    e.stopPropagation();
    setTravelCompanyVisible(!travelCompanyVisible);
  };
  useEffect(() => {
    setSelectedPeople(null);
    setTravelDetails({
      adults: null,
      children: null,
      childrenAges: [],
      babies: null
    });
  }, [minAge, maxAge]);

  const handleTravelCompanyDone1 = (adults, children, childrenAges, babies) => {
    const ageString =
      children >= 1 && childrenAges.length
        ? ` (${childrenAges.join(', ')})`
        : '';
    setTravelDetails({ adults, children, childrenAges, babies });
    setSelectedPeople(
      `${adults} adult${adults > 1 ? 's' : ''},${babies} infant${
        babies > 1 ? 's' : ''
      }, ${children} child${children > 1 ? 'ren' : ''}${ageString}`
    );

    setTravelCompanyVisible(false);
  };

  const handleDropdownVisibleChange = visible => {
    if (visible) {
      setTravelCompanyVisible(true);
    } else {
      setTravelCompanyVisible(false);
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
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  const handleLinkClick = item => {
    setSelectedDepartureDate(null);
    setSelectedDepartureDateDisplay(null);
    setSelectedReturnDate(null);
    setSelectedPeople(null);
    setPackageFilter, { ...packageFilter, selectedRooms: null };
    setTravelDetails({
      adults: null,
      children: null,
      childrenAges: [],
      babies: null
    });
    // getTravelDate(item.id);

    // router.push(`/hotel/${item.code}`);
    setSearchQuery(item.name);
    setSelectedHotelCategory(item.category);
    setSelectedHotelCode(item.code);
    setSelectedItem(item.code);
    setSearchActive(false);
    if (item && item.code) {
      const url = new URL(window.location.href);
      // url.searchParams.set('code', item.code);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleDestination = (placeId, placeData) => {
    setDurationSelected([]);
    setSearchQuery(placeId[1]);
    setSelectedItem(`PLACE${placeId[0]}`);
    setSearchActive(false);
    setDestinationInfo(placeData);
    const url = new URL(window.location.href);
    url.searchParams.set('code', placeId[0]);

    window.history.replaceState(null, '', url.toString());
  };
  useEffect(() => {
    if (searchQuery === '') {
      // If placeId is empty or not valid, remove the 'code' query parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('code'); // Remove the 'code' query parameter

      // Replace the current state with the new URL, without triggering a page reload
      window.history.replaceState(null, '', url.toString());
    }
  }, [searchQuery]);

  const handleSearchInputFocus = e => {
    handleSearchChange(e);
    setSearchActive(true);
    setPageNumber(1);
  };

  const urlParams = new URLSearchParams(window.location.search);

  const code = urlParams.get('code');
  // useEffect(() => {
  //   if (!selectedItem) return;
  //   dispatch(fetchPassngerCombination(selectedItem));
  // }, [dispatch, selectedItem]);

  // useEffect(() => {
  //   const newMinAge = passngerCombination?.childMinAge ?? 2;
  //   const newMaxAge = passngerCombination?.childMaxAge ?? 17;
  //   setMinAge(newMinAge);
  //   setMaxAge(newMaxAge);
  //   setAgeData(passngerCombination);
  //   setAgeError(errorpassngerCombination);
  // }, [passngerCombination]);

  const groupData = data => {
    const grouped = {};

    data.forEach(item => {
      const { countryName, regionName, placeName, placeId, hotels } = item;

      // If the country doesn't exist in the grouped object, create it
      if (!grouped[countryName]) {
        grouped[countryName] = {};
      }

      // If the region doesn't exist for the country, create it
      if (!grouped[countryName][regionName]) {
        grouped[countryName][regionName] = {};
      }

      // If the place doesn't exist in the region, create it
      if (!grouped[countryName][regionName][placeName]) {
        grouped[countryName][regionName][placeName] = {
          placeID: placeId,
          hotels: hotels
        };
      } else {
        // If the place already exists, just update the hotels (assuming placeID should stay the same)
        grouped[countryName][regionName][placeName].hotels = hotels;
      }
    });

    return grouped;
  };

  const handleSearchChange = e => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the grouped hotels based on the search query
    const filtered = filterHotels(groupedHotels, query);
    Object.keys(groupedHotel).forEach(country => {
      const countryData = groupedHotel[country];
      const filteredCountry = {};

      Object.keys(countryData).forEach(region => {
        const regionData = countryData[region];
        const filteredRegion = {};

        Object.keys(regionData).forEach(place => {
          const placeData = regionData[place];
          const hotels = placeData.hotels; // hotels is an array of objects

          // Filter hotels by matching hotel name
          const filteredHotels = hotels.filter(hotel => {
            return hotel.name.toLowerCase().includes(query.toLowerCase()); // Match hotel name
          });

          // Include the place if it has matching hotels or if the place name itself matches
          if (
            filteredHotels.length > 0 ||
            place.toLowerCase().includes(query.toLowerCase())
          ) {
            filteredRegion[place] = {
              placeID: placeData.placeID,
              hotels: filteredHotels
            };
          }
        });

        // Include the region if it has any matching places
        if (Object.keys(filteredRegion).length > 0) {
          filteredCountry[region] = filteredRegion;
        }
      });

      // Include the country if it has any matching regions
      if (Object.keys(filteredCountry).length > 0) {
        filtered[country] = filteredCountry;
      }
    });

    setFilteredGroupedHotels(filtered);
  };
  const filterHotels = (groupedHotel, query) => {
    const filtered = {};

    const queryLowerCase = query.toLowerCase();

    // Flag to check if we found any matching hotels
    let hasMatchingHotels = false;

    // Reset the flag for showing hotels with destinations
    setShowHoteslWithDestination(false);

    Object.keys(groupedHotel).forEach(country => {
      const countryData = groupedHotel[country];
      const filteredCountry = {};

      Object.keys(countryData).forEach(region => {
        const regionData = countryData[region];
        const filteredRegion = {};

        Object.keys(regionData).forEach(place => {
          const placeData = regionData[place];
          const hotels = placeData.hotels;

          // Filter hotels by matching hotel name
          const filteredHotels = hotels.filter(hotel =>
            hotel.name.toLowerCase().includes(queryLowerCase)
          );

          // If there are matching hotels, include the place
          if (filteredHotels.length > 0) {
            filteredRegion[place] = {
              placeID: placeData.placeID,
              hotels: filteredHotels
            };
            hasMatchingHotels = true; // At least one matching hotel found
          } else if (place.toLowerCase().includes(queryLowerCase)) {
            // If place name matches the query but no hotels match
            filteredRegion[place] = {
              placeID: placeData.placeID,
              hotels: [] // No matching hotels
            };
          }
        });

        // Only include the region if it has matching places (with hotels or matching names)
        if (Object.keys(filteredRegion).length > 0) {
          filteredCountry[region] = filteredRegion;
        }
      });

      // Only include the country if it has matching regions with hotels or matching names
      if (Object.keys(filteredCountry).length > 0) {
        filtered[country] = filteredCountry;
      }
    });

    // If there were no matching hotels, but some places matched the query (with no hotels)
    if (!hasMatchingHotels) {
      setShowHoteslWithDestination(true); // Show destinations even if no hotels match
    }

    return filtered;
  };

  const toggleHotelsVisibility = place => {
    setPlaceState(false);
    setVisiblePlaces(prevState => ({
      ...prevState,
      [place]: !prevState[place] // Toggle visibility (true/false)
    }));
  };

  const validDates = new Set(
    departureDates.map(travelDate => {
      const date = dayjs(travelDate);
      return date.toISOString().split('T')[0];
    })
  );

  const disableInvalidDates = current => {
    const date = dayjs(current);
    const formattedDate = date.toISOString().split('T')[0];
    return !validDates.has(formattedDate);
  };

  const disableYears = current => {
    const currentYear = dayjs(current).year();
    const hasValidDatesInYear = Array.from(validDates).some(
      date => dayjs(date).year() === currentYear
    );
    return !hasValidDatesInYear;
  };
  const disableDecades = current => {
    const currentDecadeStart = Math.floor(dayjs(current).year() / 10) * 10;
    const currentDecadeEnd = currentDecadeStart + 9;
    const hasValidYearsInDecade = Array.from(validDates).some(date => {
      const year = dayjs(date).year();
      return year >= currentDecadeStart && year <= currentDecadeEnd;
    });
    return !hasValidYearsInDecade;
  };
  const handleTravelCompanyClick = e => {
    e.stopPropagation();
    if (isMobile) {
      setModalVisible(true);
    } else {
      setTooltipVisible(!tooltipVisible);
    }
  };

  const getSelectedPeopleLabels = () => {
    let adult = 0;
    let child = 0;
    let infant = 0;
    let childAgeList = [];

    selectedRooms?.forEach(val => {
      adult += val.AdultCount;
      child += val.ChildCount;
      infant += val.InfantCount;

      if (val.childAgeList && val.childAgeList.length > 0) {
        childAgeList = [...childAgeList, ...val.childAgeList];
      }
    });

    const childAgeString = child > 0 ? `(${childAgeList.join(', ')})` : '';
    if (infant > 0) {
      return `${adult + child} personen, ${infant} infant${
        infant > 1 ? 's' : ''
      }`;
    }
    return `${adult + child} personen`;
  };

  const handleTravelCompanyDone = roomData => {
    const formattedPeople = roomData?.map((room, index) => ({
      key: index,
      label: `${room.AdultCount} volwassen${room.AdultCount > 1 ? 's' : ''}, ${
        room.ChildCount
      } kind${room.ChildCount > 1 ? 'eren' : ''}, ${room.InfantCount} baby${
        room.InfantCount > 1 ? 's' : ''
      }`,
      value: `${room.AdultCount}-${room.ChildCount}-${room.InfantCount}`
    }));

    setPackageFilter({ ...packageFilter, selectedPeople: formattedPeople });
    setSelectedPeople(formattedPeople);
    const updatedRoomData = roomData?.map(room => ({
      ...room,
      RoomAllocationTypeCode: roomAllocationCode
    }));
    setPackageFilter({ ...packageFilter, selectedRooms: updatedRoomData });
    setSelectedRooms(updatedRoomData);

    setTooltipVisible(false);
    setModalVisible(false);
  };
  if (loadings && !places) return <Skeleton active />;
  if (errors) return <div>{errors}</div>;
  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.firstContainer}>
          <div
            className={styles.filterSearch}
            // style={{ flex: 2 }}
            ref={searchInputRef}
          >
            <CustomInputWithLabel
              style={{
                maxWidth: windowWidth > 900 ? '360px' : ''
              }}
              size="large"
              label={'Hotel/bestemming'}
              placeholder={'Zoek op hotelnaam of plaats'}
              allowClear
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchInputFocus}
            />
            {searchActive && (
              <SearchResults
                countries={countries}
                loadings={loadings}
                placesData={places}
                filteredGroupedHotels={filteredGroupedHotels}
                showHoteslWithDestination={showHoteslWithDestination}
                toggleHotelsVisibility={toggleHotelsVisibility}
                handleDestination={handleDestination}
                setPlaceState={setPlaceState}
                searchQuery={searchQuery}
                visiblePlaces={visiblePlaces}
                placesState={placesState}
                handleLinkClick={handleLinkClick}
              />
            )}
          </div>
          {!mobile && (
            <div className={styles.filterTravel} style={{ flex: 2 }}>
              <CustomSelectWithLabel
                style={{
                  width: windowWidth > 900 ? '360px' : ''
                }}
                size="large"
                label={'Reisgezelschap'}
                placeholder={'Selecteer'}
                landingPage={true}
                travelCompany={true}
                onClick={e => handleTravelCompanyClick(e)}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                value={getSelectedPeopleLabels()}
                onDropdownVisibleChange={handleDropdownVisibleChange}
              />
              {isMobile
                ? tooltipVisible && (
                    <div ref={travelCompanyRef}>
                      <TravelCompany
                        selectedCode={selectedItem}
                        ageData={ageData}
                        setAgeData={setAgeData}
                        errorAge={errorAge}
                        setAgeError={setAgeError}
                        minAge={minAge}
                        setMinAge={setMinAge}
                        maxAge={maxAge}
                        setMaxAge={setMaxAge}
                        tooltipVisible={tooltipVisible}
                        onClose={() => {
                          setTooltipVisible(false);
                          setModalVisible(false);
                        }}
                        onDone={handleTravelCompanyDone}
                        condition={true}
                        initialRoomData={
                          packageFilter?.selectedRooms || [
                            {
                              AdultCount: 2,
                              ChildCount: 0,
                              InfantCount: 0,
                              ChildAgeList: []
                            }
                          ] ||
                          []
                        }
                      />
                    </div>
                  )
                : tooltipVisible && (
                    <div ref={travelCompanyRef}>
                      <TravelCompany
                        selectedCode={selectedItem}
                        ageData={ageData}
                        setAgeData={setAgeData}
                        errorAge={errorAge}
                        setAgeError={setAgeError}
                        minAge={minAge}
                        setMinAge={setMinAge}
                        maxAge={maxAge}
                        setMaxAge={setMaxAge}
                        tooltipVisible={tooltipVisible}
                        onClose={() => {
                          setTooltipVisible(false);
                          setModalVisible(false);
                        }}
                        onDone={handleTravelCompanyDone}
                        condition={true}
                        initialRoomData={
                          packageFilter?.selectedRooms || [
                            {
                              AdultCount: 2,
                              ChildCount: 0,
                              InfantCount: 0,
                              ChildAgeList: []
                            }
                          ] ||
                          []
                        }
                      />
                    </div>
                  )}
            </div>
          )}
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.filter}>
            <CustomDatePickerWithLabel
              size="large"
              label={'Vertrekdatum'}
              landingPage={true}
              placeholder="Selecteer uw vertrekdatum"
              onChange={date => {
                setPackageFilter({ ...packageFilter, selectedDate: date });
                setSelectedReturnDate(null);
                setSelectedDepartureDate(date);
                setSelectedDepartureDateDisplay(date);
              }}
              className={styles.customInput}
              disabledDate={(c, { type }) => {
                if (!isNaN(code)) {
                  return c && c < dayjs().startOf('day');
                }
                if (validDates.size === 0) {
                  return false;
                }

                if (type === 'decade') return disableDecades(c);
                if (type === 'year') return disableYears(c);
                return disableInvalidDates(c);
              }}
              allowClear={false}
              defaultPickerValue={
                selectedDepartureDateDisplay
                  ? dayjs(selectedDepartureDateDisplay).add(1, 'day')
                  : dayjs()
              }
              value={selectedDepartureDateDisplay}
            />
          </div>
          <div className={styles.filter}>
            <CustomDatePickerWithLabel
              size="large"
              label={'Retourdatum'}
              landingPage={true}
              placeholder="Selecteer uw retourdatum"
              allowClear={false}
              onChange={handleReturnDateChange}
              className={styles.customInput}
              disabledDate={
                durationSelected.length !== 0
                  ? disabledDate
                  : (c, { type }) => {
                      const departure = dayjs(selectedDepartureDateDisplay);
                      const twoDaysAfter = departure.add(3, 'day');
                      if (type === 'decade')
                        return c.isBefore(twoDaysAfter, 'decade');
                      if (type === 'year')
                        return c.isBefore(twoDaysAfter, 'year');
                      if (type === 'month')
                        return c.isBefore(twoDaysAfter, 'month');
                      return c.isBefore(twoDaysAfter, 'day');
                    }
              }
              defaultPickerValue={
                durationSelected.length === 0
                  ? selectedDepartureDateDisplay
                    ? dayjs(selectedDepartureDateDisplay).add(1, 'day')
                    : dayjs()
                  : generateEnabledDates(selectedDepartureDateDisplay).length >
                      0
                    ? dayjs(
                        generateEnabledDates(selectedDepartureDateDisplay)[0]
                      )
                    : dayjs().add(1, 'day')
              }
              value={selectedReturnDate}
            />
          </div>
          {mobile && (
            <div className={styles.filterTravel} style={{ flex: 2 }}>
              <CustomSelectWithLabel
                style={{
                  width: windowWidth > 900 ? '360px' : ''
                }}
                size="large"
                label={'Reisgezelschap'}
                placeholder={'Selecteer'}
                landingPage={true}
                travelCompany={true}
                onClick={e => handleTravelCompanyClick(e)}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                value={getSelectedPeopleLabels()}
                onDropdownVisibleChange={handleDropdownVisibleChange}
              />
              {mobile
                ? tooltipVisible && (
                    <Modal
                      open={tooltipVisible}
                      onCancel={() => {
                        setTooltipVisible(false);
                      }}
                      footer={null}
                      style={{ position: 'relative !important' }}
                    >
                      <div ref={travelCompanyRef}>
                        <TravelCompany
                          selectedCode={selectedItem}
                          ageData={ageData}
                          setAgeData={setAgeData}
                          errorAge={errorAge}
                          setAgeError={setAgeError}
                          minAge={minAge}
                          setMinAge={setMinAge}
                          maxAge={maxAge}
                          setMaxAge={setMaxAge}
                          tooltipVisible={tooltipVisible}
                          onClose={() => {
                            setTooltipVisible(false);
                            setModalVisible(false);
                          }}
                          onDone={handleTravelCompanyDone}
                          condition={true}
                          initialRoomData={
                            packageFilter?.selectedRooms || [
                              {
                                AdultCount: 2,
                                ChildCount: 0,
                                InfantCount: 0,
                                ChildAgeList: []
                              }
                            ] ||
                            []
                          }
                        />
                      </div>
                    </Modal>
                  )
                : tooltipVisible && (
                    <div ref={travelCompanyRef}>
                      <TravelCompany
                        selectedCode={selectedItem}
                        ageData={ageData}
                        setAgeData={setAgeData}
                        errorAge={errorAge}
                        setAgeError={setAgeError}
                        minAge={minAge}
                        setMinAge={setMinAge}
                        maxAge={maxAge}
                        setMaxAge={setMaxAge}
                        tooltipVisible={tooltipVisible}
                        onClose={() => {
                          setTooltipVisible(false);
                          setModalVisible(false);
                        }}
                        onDone={handleTravelCompanyDone}
                        condition={true}
                        initialRoomData={
                          packageFilter?.selectedRooms || [
                            {
                              AdultCount: 2,
                              ChildCount: 0,
                              InfantCount: 0,
                              ChildAgeList: []
                            }
                          ] ||
                          []
                        }
                      />
                    </div>
                  )}
            </div>
          )}
          <div className={styles.filter}>
            <ButtonContainer
              className={styles.filterButton}
              size="large"
              onClick={handleSearch}
              disabled={dyamicTravelDateLoading}
            >
              Zoek uw vakantie
            </ButtonContainer>
          </div>
        </div>

        <div className={styles.thirdContainer}></div>
      </div>
      {showPopup && (
        <Modal
          title="Bevestig navigatie"
          open={showPopup}
          onOk={continueBooking}
          onCancel={stayAtHome}
          footer={[
            <Button
              key="back"
              onClick={stayAtHome}
              style={{ marginBottom: '10px' }}
            >
              Ja, verlaat deze pagina
            </Button>,
            <Button key="submit" type="primary" onClick={continueBooking}>
              Nee, ga verder met boeken
            </Button>
          ]}
        >
          <p>
            LET OP: uw boeking is nog NIET geplaatst <br />
            Weet u zeker dat u het boekingsproces wilt verlaten?
          </p>
        </Modal>
      )}
      {/* {!showPopup && (
        <div style={popupStyles}>
          <h4>Confirm Navigation</h4>
          <p>You were in the middle of a booking. Do you want to continue?</p>
          <ButtonContainer onClick={stayAtHome}>No, Stay at Home</ButtonContainer>
          <ButtonContainer onClick={continueBooking} >Yes, Continue Booking</ButtonContainer>
        </div>
      )} */}
    </>
  );
};

// Export with dynamic import to ensure client-side only rendering
export default dynamic(() => Promise.resolve(LandingFilters), {
  ssr: false
});
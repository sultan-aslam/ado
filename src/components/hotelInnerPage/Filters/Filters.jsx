/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { Modal, Select, Typography } from 'antd';
import { useEffect, useState, useRef, memo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
 
import {
  AirPortSvg,
  ClockSvg,
  DropdownSvg,
  LogiesSvg,
  PersonsSvg
} from '@/components/common/svgs/Svgs';
// import CustomDatePickerWithLabel from '@/components/CustomDatePickerWithLabel/CustomDatePickerWithLabel';
// import CustomSelect from '@/components/customSelect/CustomSelect';
import { CalendarIcon } from '@/components/common/icons/CalendarIcon';
// import {
//   fetchReSelectionSearch,
//   reselectionCustomLoader
// } from '@/store/features/reselection/reSelectionSlice';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import TravelCompany from '../TravelCompany/TravelCompany';
import styles from './filters.module.css';
// import { setGlanceData } from '@/store/features/glance/glanceSlice';
// import { setHotelBookingDetails } from '@/store/features/bookingPayload/bookingPayloadSlice';
// import { updatePayload } from '@/store/features/chartPayload/chartPayloadSlice';
// import {
//   updateReselectionPayload,
//   updateReselectionPayloadPriceChart,
//   updateReselectionRoomPayload
// } from '@/store/features/reselectionPayload/reSelectionPayload';
import {
  useHotelStore,
  usePackageFilterStore,
  useReselectionStore
} from '@/hooks/useZustandStore';
import CustomDatePickerWithLabel from '@/components/common/CustomDatePickerWithLabel/CustomDatePickerWithLabel';
import CustomSelect from '@/components/common/customSelect/CustomFlightData';
const Filters = ({
  isFilterOpen,
  selection,
  onDateChange,
  onPayloadChange,
  token,
  selectedDate,
  setSelectedDate,
  selectionLoading
}) => {
  const searchParams = useSearchParams();
  const departureDate = searchParams.get('departureDate');
  // const dispatch = useAppDispatch();
  const params = useParams();
  const {
    travelDates,
    duration,
    concept,
    roomLists,
    hotelSelectedResponse,
    priceDetails,
    categorizedRoutes
  } = selection;
  const { packageFilter, setPackageFilter } = usePackageFilterStore();
  const { setReselection } = useReselectionStore();
  const { glanceData } = useAppSelector(state => state?.glanceSlice);
  const payloadChart = useAppSelector(state => state.chartPayloadSlice);
  const reSelectionPayload = useAppSelector(state => state.reSelectionPayload);
  const { reSelectionData, loading: hotelReSelectionLoading } = useAppSelector(
    state => state.reSelectionSearch
  );
  const hotelStore = useHotelStore();
  const hotel = hotelStore.hotel;

  const travelDatesOptions = reSelectionData?.travelDates ?? travelDates ?? [];
  const durationOptions = reSelectionData.duration
    ? reSelectionData.duration?.duration
    : duration?.duration;
  const routeOptions = reSelectionData.categorizedRoutes ?? categorizedRoutes;
  const { fetched: selectionFetched } = useAppSelector(
    state => state.selection
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(
    packageFilter?.selectedConcept ||
      hotelSelectedResponse?.conceptSelected ||
      {}
  );
  const [selectedPeople, setSelectedPeople] = useState(
    packageFilter?.selectedPeople
  );
  const [initial, setInitial] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);
  useEffect(() => {
    if (
      JSON.stringify(selectedRooms) !==
      JSON.stringify(packageFilter?.selectedRooms)
    ) {
      setSelectedRooms(packageFilter.selectedRooms);
    }
  }, [packageFilter?.selectedRooms]);
  useEffect(() => {
    if (packageFilter?.selectedRoute) {
      setSelectedRoute(packageFilter.selectedRoute);
    } else if (hotelSelectedResponse?.selectedRoute) {
      setSelectedRoute(hotelSelectedResponse.selectedRoute);
    }
  }, [packageFilter?.selectedRoute, hotelSelectedResponse?.selectedRoute]);
  useEffect(() => {
    if (packageFilter?.selectedDuration) {
      setSelectedDuration(packageFilter?.selectedDuration);
    } else if (hotelSelectedResponse?.durationSelected) {
      setSelectedDuration(hotelSelectedResponse?.durationSelected);
    }
  }, [
    packageFilter?.selectedDuration,
    hotelSelectedResponse?.durationSelected
  ]);

  const travelCompanyRef = useRef(null);
  const initialized = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isMobile = window.innerWidth < 768;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [airportsVisible, setAirportsVisible] = useState(false);
  const [handleState, setHandleState] = useState(false);
  const dropdownRef = useRef(null);
  const [ageData, setAgeData] = useState(null);
  const [errorAge, setAgeError] = useState(null);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  useEffect(() => {
    if (!isFilterOpen) {
      setHandleState(false);
    }
  }, [isFilterOpen]);
  const toggleHandleState = () => {
    setHandleState(prevState => !prevState);
  };
  useEffect(() => {
    if (roomLists) {
      const defaultRoom = {
        RoomAllocationTypeCode:
          roomLists?.[0]?.roomTypeList?.[0].roomAllocationTypeCode,
        AdultCount: 2,
        ChildCount: 0,
        InfantCount: 0
      };
      !packageFilter.selectedRooms && setSelectedRooms([defaultRoom]);

      !packageFilter.selectedPeople &&
        setSelectedPeople([
          {
            key: 0,
            label: '2 Reiziger, 0 kind, 0 baby',
            value: '2-0-0'
          }
        ]);
      initialized.current = true;
    }
  }, [roomLists]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const departureDate = urlParams.get('departureDate');
    const people = urlParams.get('people');
    const maxChildAge = 12; // The maximum age for a child to be considered a child

    if (departureDate) {
      const parsedCheckInDate = dayjs(departureDate);
      setPackageFilter({ ...packageFilter, selectedDate: parsedCheckInDate });
      setSelectedDate(parsedCheckInDate);
    }

    if (people) {
      const adultsMatch = people.match(/(\d+)\s*adult/);
      const infantMatch = people.match(/(\d+)\s*infant/);
      const childrenMatch = people.match(/(\d+)\s*child/);
      const childAgeMatch = people.match(/\(([\d,\s]+)\)/);

      let adults = adultsMatch ? parseInt(adultsMatch[1], 10) : 1;
      let infants = infantMatch ? parseInt(infantMatch[1], 10) : 0;
      let children = childrenMatch ? parseInt(childrenMatch[1], 10) : 0;
      let childAges = childAgeMatch
        ? childAgeMatch[1].split(',').map(age => parseInt(age.trim(), 10))
        : [];

      // Initialize counts for adults and valid children
      let validChildrenAges = [];
      let invalidChildrenCount = 0;

      // Separate valid and invalid children based on age
      childAges.forEach(age => {
        if (age <= maxChildAge) {
          validChildrenAges.push(age); // valid child age
        } else {
          invalidChildrenCount++; // invalid child age (count as adults)
        }
      });

      // Add the invalid children (aged > maxChildAge) to the adult count
      adults += invalidChildrenCount;

      // If adults exceed 4, limit to 4
      if (adults > 4) {
        adults = 4;
      }

      // Final children count (only valid children)
      children = validChildrenAges.length;
    }
  }, [params]);
  useEffect(() => {
    if (hotelSelectedResponse?.departures && !packageFilter?.selectedRoute) {
      setPackageFilter({
        ...packageFilter,
        selectedRoute: hotelSelectedResponse?.departures
      });
      setSelectedRoute(hotelSelectedResponse?.departures);
    }
    if (hotelSelectedResponse?.duration && !packageFilter?.selectedDuration) {
      setPackageFilter({
        ...packageFilter,
        selectedDuration: hotelSelectedResponse?.duration,
        selectedHotelOnlyDuration: hotelSelectedResponse?.duration
      });
      setSelectedDuration(hotelSelectedResponse?.duration);
    }
    if (
      hotelSelectedResponse?.conceptSelected &&
      !packageFilter?.selectedConcept
    ) {
      setPackageFilter({
        ...packageFilter,
        selectedConcept: hotelSelectedResponse?.conceptSelected
      });
      setSelectedConcept(hotelSelectedResponse?.conceptSelected);
    }
    if (departureDate && !packageFilter?.selectedDate) {
      setSelectedDate(dayjs(departureDate));
      setPackageFilter({
        ...packageFilter,
        selectedDate: dayjs(departureDate)
      });
    } else if (
      hotelSelectedResponse?.travelDateSelected &&
      !packageFilter?.selectedDate
    ) {
      setPackageFilter({
        ...packageFilter,
        selectedDate: dayjs(hotelSelectedResponse?.travelDateSelected)
      });
      setSelectedDate(dayjs(hotelSelectedResponse?.travelDateSelected));
    }
  }, [
    hotelSelectedResponse?.duration,
    hotelSelectedResponse?.conceptSelected,
    hotelSelectedResponse?.travelDateSelected,
    departureDate,
    hotelSelectedResponse?.departures
  ]);

  const validDates = new Set(
    travelDatesOptions?.map(dateObj => {
      const date = dayjs(dateObj.travelDate);
      return date.toISOString().split('T')[0];
    })
  );

  const disableInvalidDates = current => {
    const date = dayjs(!current.isValid() ? new Date() : current);
    const formattedDate = date?.toISOString().split('T')[0];
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

  useEffect(() => {
    if (selectedDate) {
      onDateChange(selectedDate);
    }
    localStorage.setItem('checkInDate', selectedDate);
  }, [selectedDate]);
  const handleDateChange = date => {
    setSelectedDate(date);
    setPackageFilter({ ...packageFilter, selectedDate: date });
    // dispatch(reselectionCustomLoader());
    localStorage.setItem('checkInDate', date);
  };

  const handleDurationChange = value => {
    setPackageFilter({
      ...packageFilter,
      selectedDuration: value,
      selectedHotelOnlyDuration: value
    });
    // dispatch(reselectionCustomLoader());
    setSelectedDuration(value);
  };

  const handleConceptChange = value => {
    const selectedConcept = concept.find(c => c.code === value);
    // dispatch(reselectionCustomLoader());
    setPackageFilter({
      ...packageFilter,
      selectedConcept
    });
    setSelectedConcept(selectedConcept);
  };

  const payloadForChart = {
    SelectedTravelDate: departureDate
      ? departureDate
      : dayjs(selectedDate)?.format('YYYY-MM-DDTHH:mm:ss'),
    ConceptCode: selectedConcept?.code || '',
    Duration: parseInt(selectedDuration, 10) || 0,
    OutBoundFlightKey:
      (reSelectionData &&
        reSelectionData?.outBoundFlights &&
        reSelectionData?.outBoundFlights[0]?.flightKey) ||
      '',
    InBoundFlightKey:
      (reSelectionData &&
        reSelectionData?.inBoundFlights &&
        reSelectionData?.inBoundFlights[0]?.flightKey) ||
      '',
    LanguageCode: null,
    RoomRequest: selectedRooms,
    ProductType: 0,
    ProductCode: priceDetails?.tripInfo?.code || 'ARNORDELUX',
    CurrencyCode: 'EUR',
    DepartureAirportId: parseInt(selectedRoute.departureAirportId, 10) || '',
    ArriveAirportId: parseInt(selectedRoute.arriveAirportId, 10) || ''
  };

  const payload = {
    PassengerRoomSelections: selectedRooms,
    HotelCode: priceDetails?.tripInfo?.code || 'ARNORDELUX',
    Departures: {
      DepartureAirportId: selectedRoute
        ? selectedRoute?.departureAirportId
        : '',
      DepartureAirportName: selectedRoute
        ? selectedRoute?.departureAirportName
        : '',
      ArriveAirportId: selectedRoute ? selectedRoute?.arriveAirportId : '',
      ArriveAirportName: selectedRoute ? selectedRoute?.arriveAirportName : '',
      DepartureAirportCode: selectedRoute
        ? selectedRoute?.departureAirportCode
        : '',
      ArriveAirportCode: selectedRoute ? selectedRoute?.arriveAirportCode : '',
      DepartureCountryCode: selectedRoute
        ? selectedRoute?.departureCountryCode
        : '',
      DepartureCountryName: selectedRoute
        ? selectedRoute?.departureCountryName
        : ''
    },
    TravelDateSelected: packageFilter.selectedDate
      ? dayjs(packageFilter.selectedDate)?.format('YYYY-MM-DDTHH:mm:ss')
      : dayjs(selectedDate)?.format('YYYY-MM-DDTHH:mm:ss'),
    DurationSelected: selectedDuration,
    ConceptSelected: {
      id: selectedConcept?.id || '',
      code: selectedConcept?.code || '',
      name: hotel?.conceptName || ''
    },

    OutBoundFlight: {
      flightKey: hotelSelectedResponse?.outBoundFlight?.flightKey || '',
      name: hotelSelectedResponse?.outBoundFlight?.name || ''
    },
    InBoundFlight: {
      flightKey: hotelSelectedResponse?.inBoundFlight?.flightKey || '',
      name: hotelSelectedResponse?.inBoundFlight?.name || ''
    }
  };
  const payloadPriceChart = {
    RoomRequest: selectedRooms,
    ProductCode: priceDetails?.tripInfo?.code || 'ARNORDELUX',
    CurrencyCode: 'EUR',
    DepartureAirportId: selectedRoute ? selectedRoute?.departureAirportId : '',
    ArriveAirportId: selectedRoute ? selectedRoute?.arriveAirportId : '',
    SelectedTravelDate: packageFilter.selectedDate
      ? dayjs(packageFilter.selectedDate)?.format('YYYY-MM-DDTHH:mm:ss')
      : dayjs(selectedDate)?.format('YYYY-MM-DDTHH:mm:ss'),
    Duration: selectedDuration,
    ConceptCode: selectedConcept?.code || '',
    OutBoundFlightKey: hotelSelectedResponse?.outBoundFlight?.flightKey || '',
    InBoundFlightKey: hotelSelectedResponse?.inBoundFlight?.flightKey || '',
    LanguageCode: null
  };
  useEffect(() => {
    if (
      initialized.current &&
      selectedRooms?.length > 0 &&
      selectedDate &&
      selectedRoute &&
      selectedDuration &&
      priceDetails &&
      payload.TravelDateSelected &&
      payload.Departures.DepartureAirportId &&
      payload.Departures.ArriveAirportId &&
      payload.DurationSelected &&
      payload.ConceptSelected.code &&
      payload.OutBoundFlight
    ) {
        // dispatch(updateReselectionPayload(payload));
        // dispatch(updatePayload(payloadForChart));
        // dispatch(updateReselectionPayloadPriceChart(payloadPriceChart));
    }
  }, [
    selectedDate,
    selectedDuration,
    selectedRoute,
    selectedConcept,
    selectedRooms,
    // dispatch
  ]);
  useEffect(() => {
    if (
      initial === 0 &&
      initialized.current &&
      selectedRooms?.length > 0 &&
      selectedDate &&
      selectedRoute &&
      selectedDuration &&
      priceDetails &&
      payload.TravelDateSelected &&
      payload.Departures.DepartureAirportId &&
      payload.Departures.ArriveAirportId &&
      payload.DurationSelected &&
      payload.ConceptSelected.code &&
      payload.OutBoundFlight
    ) {
      setInitial(1);
      // dispatch(setGlanceData({ type: 'clear' }));
      // dispatch(updateReselectionPayload(payload));
    }
  }, [
    selectedDate,
    selectedDuration,
    selectedRoute,
    selectedConcept,
    selectedRooms,
    initial,
    // dispatch
  ]);

  // useEffect(() => {
  //   if (selectedRooms?.length > 0) {
  //     dispatch(updateReselectionRoomPayload(selectedRooms));
  //   }
  // }, [selectedRooms, dispatch]);

  useEffect(() => {
    if (glanceData && Object.keys(glanceData).length > 0) {
      localStorage.setItem('glanceData', JSON.stringify(glanceData));
    }
  }, [glanceData]);

  useEffect(() => {
    const glanceDataload = localStorage.getItem('glanceData');

    // if (glanceDataload) {
    //   const payload = {
    //     type: 'fulldata',
    //     data: JSON.parse(glanceDataload)
    //   };

    //   dispatch(setGlanceData(payload));
    // }
  }, []);
  useEffect(() => {
    if (
      reSelectionPayload &&
      initialized.current &&
      reSelectionPayload.TravelDateSelected &&
      reSelectionPayload.Departures.DepartureAirportId &&
      reSelectionPayload.Departures.ArriveAirportId &&
      reSelectionPayload.DurationSelected &&
      reSelectionPayload.ConceptSelected.code
      // (packageFilter.selectedDuration ||
      //   (packageFilter.selectedDate &&
      //     typeof packageFilter.selectedDate === 'string') ||
      //   packageFilter.selectedRooms ||
      //   packageFilter.selectedPeople ||
      //   packageFilter.selectedRoute ||
      //   packageFilter.selectedRoomPackage ||
      //   packageFilter.selectedHotelOnlyDuration ||
      //   packageFilter.selectedOutward ||
      //   packageFilter.selectedInward)
    ) {
      // dispatch(
      //   fetchReSelectionSearch({
      //     payload: {
      //       ...reSelectionPayload,
      //       HotelCode: params.slug?.replaceAll('-', ' ')
      //     },
      //     dispatch,
      //     cb: data => {
      //       setReselection({ ...data, code: params.slug });
      //     }
      //   })
      // );
    }
  }, [reSelectionPayload, payloadChart]);

  const handleTravelCompanyDone = roomData => {
    const formattedPeople = roomData?.map((room, index) => ({
      key: index,
      label: `${room.AdultCount} adult${room.AdultCount > 1 ? 's' : ''}, ${
        room.ChildCount
      } child${room.ChildCount > 1 ? 'ren' : ''}, ${room.InfantCount} infant${
        room.InfantCount > 1 ? 's' : ''
      }`,
      value: `${room.AdultCount}-${room.ChildCount}-${room.InfantCount}`
    }));

    // dispatch(
    //   setGlanceData({
    //     type: 'roomAndFlight',
    //     data: {
    //       roomType: formattedPeople,
    //       selectedFlight: selectedRoute,
    //       selectedDuration
    //     }
    //   })
    // );
    setPackageFilter({ ...packageFilter, selectedPeople: formattedPeople });
    setSelectedPeople(formattedPeople);
    const updatedRoomData = roomData?.map(room => ({
      ...room,
      RoomAllocationTypeCode: glanceData?.roomType?.roomAllocationTypeCode
    }));
    // dispatch(reselectionCustomLoader());
    setPackageFilter({ ...packageFilter, selectedRooms: updatedRoomData });
    setSelectedRooms(updatedRoomData);

    setTooltipVisible(false);
    setModalVisible(false);
  };
  const getSelectedPeopleLabels = () => {
    let adult = 0;
    let child = 0;
    let infant = 0;

    selectedRooms?.forEach(val => {
      adult += val.AdultCount;
      child += val.ChildCount;
      infant += val.InfantCount;
    });
    return `${adult} volwassen${adult > 1 ? 'en' : ''}, ${child} kind${
      child > 1 ? 'eren' : ''
    }, ${infant} baby${infant > 1 ? "'s" : ''}`;
    // return (packageFilter?.selectedPeople || selectedPeople)
    //   ?.map(person => person.label)
    //   .join('; ');
  };
  const createPayload = () => {
    const checkInDate =
      typeof packageFilter?.selectedDate === 'object'
        ? packageFilter?.selectedDate?.format('YYYY-MM-DDTHH:mm:ss') || ''
        : packageFilter?.selectedDate;
    const checkOutDate =
      typeof packageFilter?.selectedDate === 'object'
        ? dayjs(packageFilter?.selectedDate)
            .add(selectedDuration - 1, 'day')
            .format('YYYY-MM-DDTHH:mm:ss')
        : dayjs(new Date(packageFilter?.selectedDate))
            .add(selectedDuration - 1, 'day')
            .format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      Token: token ? JSON.parse(token)?.data?.token : '',
      BasketKey: '',
      IsIntialLoad: true,
      HotelBookingInfo: {
        Code: priceDetails?.tripInfo?.code || 'ARNORDELUX',
        DepartureAirportId: selectedRoute?.departureAirportId || '',
        ArriveAirportId: selectedRoute?.arriveAirportId || '',
        DepartureAirportCode: selectedRoute?.departureAirportCode || '',
        ArrivalAirportCode: selectedRoute?.arriveAirportCode || '',
        DepartureAirport: selectedRoute?.departureAirportName || '',
        ArrivalAirport: selectedRoute?.arriveAirportName || '',
        Duration: selectedDuration,
        ProductCode: priceDetails?.tripInfo?.code || 'ARNORDELUX',
        ConceptCode: selectedConcept?.code || '',
        OutBoundFlightKey:
          hotelSelectedResponse?.outBoundFlight?.flightKey || '',
        OutBoundFlightDepartureDate:
          reSelectionData?.priceDetails?.tripInfo?.flightInfo?.[0]
            ?.departureDate ||
          priceDetails?.tripInfo?.flightInfo?.[0]?.departureDate,
        OutBoundFlightArrivalDate:
          reSelectionData?.priceDetails?.tripInfo?.flightInfo?.[1]
            ?.arriveDate || priceDetails?.tripInfo?.flightInfo?.[0]?.arriveDate,
        InBoundFlightKey: hotelSelectedResponse?.inBoundFlight?.flightKey || '',
        InBoundFlightDepartureDate:
          reSelectionData?.priceDetails?.tripInfo?.flightInfo?.[0]
            ?.departureDate ||
          priceDetails?.tripInfo?.flightInfo?.[1]?.departureDate,

        InBoundFlightArrivalDate:
          reSelectionData?.priceDetails?.tripInfo?.flightInfo?.[1]
            ?.arriveDate || priceDetails?.tripInfo?.flightInfo?.[1]?.arriveDate,

        CheckInDate: checkInDate,
        CheckOutDate: checkOutDate
      },
      PassengerRoomSelections: selectedRooms?.map(room => ({
        RoomAllocationTypeCode: room.RoomAllocationTypeCode,
        AdultCount: room.AdultCount,
        ChildCount: room.ChildCount,
        InfantCount: room.InfantCount
      }))
    };

    onPayloadChange(payload);

    return payload;
  };

  const handleSavePayload = () => {
    const payload = createPayload();
    if (selectedDuration && selectedDate && selectedRooms?.length > 0);
    // dispatch(setHotelBookingDetails(payload));
  };

  useEffect(() => {
    if (selectedDuration && selectedDate && selectedRooms?.length > 0) {
      handleSavePayload();
    }
  }, [
    selectedDate,
    selectedDuration,
    selectedRoute,
    selectedConcept,
    reSelectionData,
    selectedRooms,
    selectionFetched
  ]);

  const airports =
    hoveredCountry && routeOptions ? routeOptions[hoveredCountry] : [];

  const handleAirportClick = airport => {
    // dispatch(reselectionCustomLoader());
    setPackageFilter({ ...packageFilter, selectedRoute: airport });
    setSelectedRoute(airport);
    setAirportsVisible(false);
    setHandleState(false);
  };

  const onMouseHover = country => {
    setHoveredCountry(country);
    setAirportsVisible(true);
  };

  const handleClickOutsideList = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAirportsVisible(false);
      setHandleState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideList);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideList);
    };
  }, []);

  const convertToDayjsObject = dateInput => {
    return dayjs(dateInput);
  };
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter}>
        <Typography className={styles.filterHeading}>
          Kies uw vertrekdatum
        </Typography>
        <CustomDatePickerWithLabel
          size="large"
          prefixIcon={<CalendarIcon className={styles.calenderIcon} />}
          suffixIcon={<DropdownSvg />}
          customStyle={true}
          allowClear={false}
          placeholder="Geen voorkeur"
          disabledDate={(c, { type }) => {
            if (type === 'decade') return disableDecades(c);
            if (type === 'year') return disableYears(c);
            return disableInvalidDates(c);
          }}
          value={
            typeof selectedDate === 'object'
              ? selectedDate
              : convertToDayjsObject(selectedDate)
          }
          onChange={date => handleDateChange(dayjs(date))}
        />
      </div>
      <div className={styles.filter}>
        <Typography className={styles.filterHeading}>Reisduur</Typography>
        <CustomSelect
          prefixIcon={<ClockSvg size={24} />}
          suffixIcon={<DropdownSvg />}
          size="large"
          customStyle={true}
          allowClear={false}
          placeholder="Please select dagen"
          // value={hotelSelectedResponse?.durationSelected + " dagen"}
          value={
            durationOptions?.some(d => d == selectedDuration)
              ? selectedDuration + ' dagen'
              : durationOptions && durationOptions[0]
          }
          onChange={handleDurationChange}
        >
          {durationOptions?.map((d, index) => (
            <Select.Option key={index} value={`${d}`}>
              {d} dagen
            </Select.Option>
          ))}
        </CustomSelect>
      </div>
      <div className={styles.filterAirport} ref={dropdownRef}>
        <Typography className={styles.filterHeading}>Luchthavens</Typography>
        <div className={styles.countrySelectContainer}>
          <CustomSelect
            open={handleState}
            prefixIcon={<AirPortSvg size={24} />}
            suffixIcon={<DropdownSvg />}
            size="large"
            customStyle={true}
            onClick={() => toggleHandleState()}
            allowClear={false}
            placeholder="Select Airport"
            value={selectedRoute?.departureAirportName}
            onChange={e => {
              !isMobile && setAirportsVisible(!airportsVisible);
            }}
          >
            {/* Add 'Select Country' placeholder */}
            <Select.Option
              key="select-country"
              value=""
              className={`${styles.placeholder} ${styles.fweight}  ${styles.disabled}`}
            >
              Select Country
            </Select.Option>

            {routeOptions &&
              Object.keys(routeOptions).map((country, index) => (
                <Select.Option
                  key={index}
                  value={country}
                  onMouseDown={e => isMobile && e.stopPropagation()}
                  {...(isMobile && isIOS
                    ? // ? isIOS
                      {
                        onTouchEnd: () => {
                          onMouseHover(country);
                          setTimeout(() => document.activeElement?.blur(), 100);
                        }
                      }
                    : // : isAndroid
                      // ? {
                      //     onClick: () => onMouseHover(country)
                      //   }
                      // : { onTouchStart: () => onMouseHover(country) }
                      { onMouseEnter: () => onMouseHover(country) })}
                >
                  <div className={styles.countryOption}>
                    {country}
                    {index === 0 && (
                      <span className={styles.tagTitleChip}>
                        Extra affordable
                      </span>
                    )}
                    {index === 1 && (
                      <span className={styles.tagTitleChip}>Ideal times</span>
                    )}
                  </div>
                </Select.Option>
              ))}
          </CustomSelect>
        </div>
        {airportsVisible && hoveredCountry && (
          <div className={styles.airportDropdown} ref={dropdownRef}>
            <ul className={styles.airportList}>
              {/* Add 'Select Airport' placeholder */}
              <li
                key="select-airport"
                className={`${styles.placeholder} ${styles.disabled}`}
                onClick={e => {
                  e.preventDefault();
                }}
              >
                Select Airport
              </li>

              {airports &&
                airports.map((airport, index) => {
                  return (
                    <li
                      key={index}
                      {...(isMobile
                        ? { onClick: () => handleAirportClick(airport) }
                        : { onClick: () => handleAirportClick(airport) })}
                    >
                      {airport
                        ? airport.departureAirportName
                        : selectedRoute?.departureAirportName}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filter}>
        <Typography className={styles.filterHeading}>Reisgezelschap</Typography>
        <CustomSelect
          prefixIcon={<PersonsSvg size={24} />}
          suffixIcon={<DropdownSvg />}
          size="large"
          customStyle={true}
          travelCompany={true}
          hotelInnerPage={true}
          allowClear={false}
          placeholder="Geen voorkeur"
          onClick={handleTravelCompanyClick}
          value={getSelectedPeopleLabels()}
        >
          {selectedPeople?.map(person => (
            <Select.Option key={person.key} value={person.value}>
              {person.label}
            </Select.Option>
          ))}
        </CustomSelect>
        {isMobile ? (
          <Modal
            open={modalVisible}
            onCancel={() => {
              setModalVisible(false);
              setAirportsVisible(false);
              setTooltipVisible(false);
              setHoveredCountry(null);
              setHandleState(false);
            }}
            footer={null}
            centered
            destroyOnClose
            className={styles.modalCotainer}
          >
            {/* <TravelCompany
              selectedCode={reSelectionPayload?.HotelCode}
              ageData={ageData}
              setAgeData={setAgeData}
              errorAge={errorAge}
              setAgeError={setAgeError}
              minAge={minAge}
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              tooltipVisible={modalVisible}
              onDone={handleTravelCompanyDone}
              onClose={() => {
                setModalVisible(false);
                setAirportsVisible(false);
                setTooltipVisible(false);
                setHoveredCountry(null);
                setHandleState(false);
              }}
              initialRoomData={
                selectedRooms || hotelSelectedResponse?.roomData || []
              }
            /> */}
          </Modal>
        ) : (
          tooltipVisible && (
            <div ref={travelCompanyRef} style={{ width: '100%' }}>
              {/* <TravelCompany
                selectedCode={reSelectionPayload?.HotelCode}
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
                initialRoomData={
                  selectedRooms || hotelSelectedResponse?.roomData || []
                }
              /> */}
            </div>
          )
        )}
      </div>
      <div className={styles.filter}>
        <Typography className={styles.filterHeading}>Zorg</Typography>
        <CustomSelect
          prefixIcon={<LogiesSvg size={24} />}
          suffixIcon={<DropdownSvg />}
          size="large"
          customStyle={true}
          allowClear={false}
          placeholder="Geen voorkeur"
          // value={hotelSelectedResponse?.conceptSelected?.name}
          value={selectedConcept?.name}
          onChange={handleConceptChange}
        >
          {concept?.map(c => (
            <Select.Option key={c.id} value={c.code}>
              {c.name}
            </Select.Option>
          ))}
        </CustomSelect>
      </div>
    </div>
  );
};

export default memo(Filters);

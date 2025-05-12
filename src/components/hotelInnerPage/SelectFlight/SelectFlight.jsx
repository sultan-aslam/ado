import { Select, Typography, Spin } from 'antd';
import { useState, useEffect, memo } from 'react';

import FlightCard from '../FlightCard/FlightCard';
// import MobileFilterCollapse from '../MobileFilters/MobileFilters';
import styles from './selectFlight.module.css';
import { ClockSvg, DropdownSvg } from '@/components/common/svgs/Svgs';
import CustomBarChart, { getVisibleCount } from '../BarChart/CustomBarChar';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import RoomTypePackage from '../RoomTypePackage/RoomTypePackage';
// import { setGlanceData } from '@/store/features/glance/glanceSlice';
import { parseFlightString } from '@/lib/flightDataFormat';
// import { updateReselectionPayload } from '@/store/features/reselectionPayload/reSelectionPayload';
import FlightCards from '../AirportsFlights/FlightCards';
import {
  usePackageFilterStore,
  useReselectionStore
} from '@/hooks/useZustandStore';
import { useSearchParams } from 'next/navigation';
import CustomSelect from '@/components/common/customSelect/CustomFlightData';
const SelectFlight = ({
  selectedDate,
  setSelectedDate,
  setPayload,
  payload
}) => {
  const searchParams = useSearchParams();
  // const {
  //   reSelectionData: hotelReSelectionData,
  //   loading: loadCount,
  //   error: hotelReSelectionError
  // } = useAppSelector(state => state.reSelectionSearch);
  // const hotelReSelectionLoading = loadCount > 0;
  const hotelReSelectionData = null
  const hotelReSelectionLoading = false
  const hotelReSelectionError = false

  // const { loading: selectionLoading } = useAppSelector(
  //   state => state.selection
  // );
  const selectionLoading = false
  // const { loading: hotelSelectionLoading } = useAppSelector(
  //   state => state.barChart
  // );
  const hotelSelectionLoading = false
  const { reselection } = useReselectionStore();

  const reSelectionData = hotelReSelectionData?.totalPrice
    ? hotelReSelectionData
    : reselection.code === searchParams.get('code')
      ? reselection
      : hotelReSelectionData;

  const { inBoundFlights, outBoundFlights, roomLists } = reSelectionData;
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [_, setDataValue] = useState('');
  const { packageFilter, setPackageFilter } = usePackageFilterStore();

  const inboundOptions = inBoundFlights?.map(flight => ({
    label: flight.name,
    value: flight.flightKey
  }));
  const isLoading =
    reselection.code === searchParams.get('code') && reselection?.totalPrice
      ? false
      : selectionLoading || hotelReSelectionLoading;
  const inboundOptionsR = inBoundFlights?.map(flight => {
    const parsedFlight = parseFlightString(flight.name); // Parse the label (flight.name)

    return {
      labelOriginal: flight.name,
      label: parsedFlight, // Use parsed data as label
      value: flight.flightKey, // Keep the original flightKey as value
      priceDifference: flight.priceDifference
    };
  });
  const outboundOptions = outBoundFlights?.map(flight => {
    const parsedFlight = parseFlightString(flight.name); // Parse the label (flight.name)

    // Return the parsed flight information along with the flightKey as value
    return {
      labelOriginal: flight.name,
      label: parsedFlight, // Use parsed data as label
      value: flight.flightKey, // Keep the original flightKey as value
      priceDifference: flight.priceDifference
    };
  });
  const outboundOptionsR = outBoundFlights?.map(flight => ({
    label: flight.name,
    value: flight.flightKey
  }));

  // Create dynamic flights array from parsed data
  const handleCardSelect = (id, flightData) => {
    setSelectedCard(id);
    // dispatch(setGlanceData({ type: 'selectedFlight', value: flightData }));
  };

  const handleSelectChange = (type, selectedOption) => {
    const childText =
      typeof selectedOption?.label === 'string' ? selectedOption?.label : '';

    const timeMatch = childText.match(/\d{2}:\d{2} \d{2}:\d{2}/);
    const time = timeMatch ? timeMatch[0] : '';
    const [startTime, endTime] = time.split(' ');
    const formattedTime = `${startTime} - ${endTime}`;
    setPackageFilter({
      ...packageFilter,
      [type === 'outward' ? 'selectedOutward' : 'selectedInward']:
        selectedOption
    });
    const hour = parseInt(startTime.split(':')[0], 10);
    let period = '';

    if (hour >= 5 && hour < 12) {
      period = 'Ochtend';
    } else if (hour >= 12 && hour < 17) {
      period = 'Middag';
    } else if (hour >= 17 && hour < 21) {
      period = 'Avond';
    } else {
      period = 'Nacht';
    }
    const combinedChildren = `${period} (${formattedTime})`;
    setDataValue(combinedChildren);
    if (selectedOption) {
      const { label, value } = selectedOption;
      // dispatch(setGlanceData({ type, value: { label, value } }));
      // type === 'outward' &&
      //   dispatch(
      //     updateReselectionPayload({
      //       OutBoundFlight: {
      //         flightKey: selectedOption?.value,
      //         name: selectedOption?.label
      //       }
      //     })
        // );
      // type === 'inward' &&
      //   dispatch(
      //     updateReselectionPayload({
      //       inBoundFlight: {
      //         flightKey: selectedOption?.value,
      //         name: selectedOption?.label
      //       }
      //     })
      //   );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (reSelectionData?.hotelSelectedResponse) {
      setSelectedCard('best-option');
      // dispatch(
      //   setGlanceData({
      //     type: 'selectedFlight',
      //     value: reSelectionData?.hotelSelectedResponse
      //   })
      // );
      // dispatch(updateReselectionPayload({}));
    }
  }, [reSelectionData]);

  const inBoundFlight =
    reSelectionData?.hotelSelectedResponse?.inBoundFlight?.name;
  const outBoundFlight =
    reSelectionData?.hotelSelectedResponse?.outBoundFlight?.name;

  const renderFilters = () => (
    <>
      <div className={styles.filterConatiner}>
        <div className={styles.filter}>
          <Typography className={styles.filterHeading}>Heenvlucht</Typography>
          <CustomSelect
            disabled={hotelReSelectionLoading}
            size="large"
            className="flight-select"
            style={{ border: '1px solid gray !important' }}
            prefixIcon={<ClockSvg />}
            suffixIcon={<DropdownSvg />}
            value={
              outBoundFlight
                ? outboundOptionsR?.find(
                    option => option.label === outBoundFlight
                  )?.value
                : undefined
            }
            onChange={val => {
              const selectedOption = outboundOptionsR.find(
                (option, index) => option.value === val
              );
              handleSelectChange('outward', selectedOption);
            }}
            variant="borderless"
            allowClear={false}
            placeholder="Geen voorkeur"
            hotelInner={true}
            dropdownStyle={{ padding: '0px', borderRadius: '2px' }}
          >
            {outboundOptionsR?.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </CustomSelect>
        </div>

        <div className={styles.filter}>
          <Typography className={styles.filterHeading}>Terugvlucht</Typography>
          <CustomSelect
            disabled={hotelReSelectionLoading}
            size="large"
            className="flight-select"
            prefixIcon={<ClockSvg />}
            suffixIcon={<DropdownSvg />}
            value={
              inBoundFlight
                ? inboundOptions?.find(option => option.label === inBoundFlight)
                    ?.value
                : undefined
            }
            // open={true }
            onChange={val => {
              const selectedOption = inboundOptions.find(
                (option, index) => option.value === val
              );
              handleSelectChange('inward', selectedOption);
            }}
            variant="borderless"
            allowClear={false}
            placeholder="Geen voorkeur"
            hotelInner={true}
            dropdownStyle={{ padding: '0px', borderRadius: '2px' }}
          >
            {inboundOptions?.map((option, index) => (
              <Select.Option
                key={index}
                value={option.value}
                className={styles.selectOpt}
              >
                {option.label}
              </Select.Option>
            ))}
          </CustomSelect>
        </div>
      </div>
    </>
  );

  const { glanceData } = useAppSelector(state => state?.glanceSlice);
  const { roomData } = glanceData;

  const selectedFlightKeyReturn =
    reSelectionData?.hotelSelectedResponse?.outBoundFlight?.flightKey;
  const selectedFlightKeyDeparture =
    reSelectionData?.hotelSelectedResponse?.inBoundFlight?.flightKey;

  const filteredOutboundOptions =
    outboundOptions &&
    outboundOptions.filter(option => option.value !== selectedFlightKeyReturn);

  const filteredInboundOptions =
    inboundOptionsR &&
    inboundOptionsR.filter(
      option => option.value !== selectedFlightKeyDeparture
    );

  return (
    <>
      <Spin spinning={hotelSelectionLoading || hotelReSelectionLoading}>
        <CustomBarChart
          loading={hotelSelectionLoading || hotelReSelectionLoading}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className={styles.container}>
          <div className={styles.filterContainer}>
            <h1 className={styles.flightsTitle}>Selecteer uw vlucht</h1>
            {isMobile ? <MobileFilterCollapse /> : renderFilters()}
          </div>
          <div className={styles.flights}>
            {/* {
              <h1 className={styles.optionRange}>
                Uw beste optie vanaf {fromDate} naar {toDate}
              </h1>
            } */}
            {reSelectionData?.hotelSelectedResponse && (
              <div className={styles.flightCard}>
                <FlightCard
                  id="best-option"
                  selected={selectedCard === 'best-option'}
                  onSelect={handleCardSelect}
                  flightData={reSelectionData?.hotelSelectedResponse}
                  loading={hotelReSelectionLoading}
                  error={hotelReSelectionError}
                />
              </div>
            )}
          </div>
        </div>
        {(filteredOutboundOptions && filteredOutboundOptions.length > 0) ||
        (filteredInboundOptions && filteredInboundOptions.length > 0) ? (
          <FlightCards
            loading={isLoading || hotelReSelectionLoading}
            outboundOptions={filteredOutboundOptions}
            inboundOptionsR={filteredInboundOptions}
            handleSelectChange={handleSelectChange}
          />
        ) : null}

        <div>
          <RoomTypePackage
            isLoading={isLoading || hotelReSelectionLoading}
            roomTypeList={roomLists}
            roomData={roomData?.length}
            setPayload={setPayload}
            payload={payload}
          />
        </div>
      </Spin>
    </>
  );
};

export default memo(SelectFlight);

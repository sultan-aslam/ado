import React, { useEffect, useState } from 'react';
import { Collapse, Typography, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CustomSelect from '@/components/customSelect/CustomFlightData';
import styles from './mobileFilters.module.css';
import { FilterSettingIcon } from '@/components/Icons/FilterSettingIcon';
import { parseFlightData } from '@/lib/flightDataFormat';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { ClockSvg, DropdownSvg } from '@/components/common/svgs/Svgs';
import dayjs from 'dayjs';
import { setGlanceData } from '@/store/features/glance/glanceSlice';
import reSelectionPayload, {
  updateReselectionPayload
} from '@/store/features/reselectionPayload/reSelectionPayload';
import { parseFlightString } from '@/lib/flightDataFormat';

const { Panel } = Collapse;

const MobileFilterCollapse = () => {
  const { reSelectionData } = useAppSelector(state => state.reSelectionSearch);

  const { inBoundFlights, outBoundFlights, roomLists } = reSelectionData;

  // const { inBoundFlights, outBoundFlights, roomLists } = selection;

  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const inboundOptions = inBoundFlights?.map(flight => ({
    label: flight.name,
    value: flight.flightKey
  }));
  const outboundOptions = outBoundFlights?.map(flight => {
    const parsedFlight = parseFlightString(flight.name); // Parse the label (flight.name)

    // Return the parsed flight information along with the flightKey as value
    return {
      labelOriginal: flight.name,
      label: parsedFlight, // Use parsed data as label
      value: flight.flightKey // Keep the original flightKey as value
    };
  });
  const outboundOptionsR = outBoundFlights?.map(flight => ({
    label: flight.name,
    value: flight.flightKey
  }));

  const handleCardSelect = (id, flightData) => {
    setSelectedCard(id);
    dispatch(setGlanceData({ type: 'selectedFlight', value: flightData }));
  };

  const handleSelectChange = (type, selectedOption) => {
    if (selectedOption) {
      const { label, value } = selectedOption;
      dispatch(setGlanceData({ type, value: { label, value } }));
      dispatch(
        updateReselectionPayload({
          OutBoundFlight: {
            flightKey: selectedOption?.value,
            name: selectedOption?.label
          }
        })
      );
      dispatch(
        updateReselectionPayload({
          inBoundFlight: {
            flightKey: selectedOption?.value,
            name: selectedOption?.label
          }
        })
      );
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reSelectionData?.hotelSelectedResponse) {
      setSelectedCard('best-option');
      dispatch(
        setGlanceData({
          type: 'selectedFlight',
          value: reSelectionData?.hotelSelectedResponse
        })
      );
      // dispatch(updateReselectionPayload({}));
    }
  }, [reSelectionData, dispatch]);

  const extractAndFormatDate = flightName => {
    const parsedName = parseFlightData(flightName);
    return dayjs(parsedName?.departureDate, 'DD.MM.YYYY').format('MMM DD');
  };

  const inBoundFlight =
    reSelectionData?.hotelSelectedResponse?.inBoundFlight?.name;
  const outBoundFlight =
    reSelectionData?.hotelSelectedResponse?.outBoundFlight?.name;

  const toDate = inBoundFlight ? extractAndFormatDate(inBoundFlight) : 'May 29';
  const fromDate = outBoundFlight
    ? extractAndFormatDate(outBoundFlight)
    : 'May 22';

  const renderFilters = () => (
    <>
      <div className={styles.filter}>
        <div className={styles.selectedOption}>
          <Typography className={styles.filterHeading}>
          Heenvlucht
          </Typography>

          <CustomSelect
            size='large'
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
            variant='borderless'
            allowClear={true}
            placeholder='Geen voorkeur'
            hotelInner={true}
          >
            {outboundOptionsR?.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </CustomSelect>
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.selectedOption}>
          <Typography className={styles.filterHeading}>
          Terugvlucht
          </Typography>
          <CustomSelect
            size='large'
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
            variant='borderless'
            allowClear={false}
            placeholder='Geen voorkeur'
            hotelInner={true}
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

  return (
    <Collapse
      className={styles.filter}
      accordion
      expandIconPosition='end'
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
    >
      <Panel
        header={
          <div className={styles.panelHeader}>
            <FilterSettingIcon />
            {'Filters (2)'}
          </div>
        }
        key='1'
      >
        {renderFilters()}
      </Panel>
    </Collapse>
  );
};

export default MobileFilterCollapse;

import React, { useState } from 'react';
// import FiltersMobile from '../FiltersMobile/FiltersMobile';
import styles from './packageTravel.module.css';
import SelectFlight from '../SelectFlight/SelectFlight';
// import EverythingInGlanceCardPackage from '@/components/cards/everythingInGlanceCardPackage/EverythingInGlaceCardPackage';
// import { useAppSelector } from '@/store/reduxHooks';
import { usePackageFilterStore } from '@/hooks/useZustandStore';
import dynamic from 'next/dynamic';
const Filters = dynamic(() => import('../Filters/Filters'), {
  ssr: true,
  loading: () => <div></div>
});
const PakketReizenComponent = ({ selection, token, selectionLoading, hotel, hotelLoading }) => {
  const { packageFilter, setPackageFilter } = usePackageFilterStore();

  const [selectedDate, setSelectedDate] = useState(packageFilter?.selectedDate);
  const [IsHotelOnly, setHotelOnly] = useState(false);
  const [payload, setPayload] = useState(null);
  const handleDateChange = date => {
    setPackageFilter({ ...packageFilter, selectedDate: date });
    setSelectedDate(date);
  };
  // const { hotel, loading: hotelLoading } = useAppSelector(state => state.hotel);
  const images = hotel?.hotelImage || [];

  // const {
  //   reSelectionData,
  //   loading: hotelReSelectionLoading,
  //   error: hotelReSelectionError
  // } = useAppSelector(state => state.reSelectionSearch);
  const reSelectionData = null
  const hotelReSelectionLoading = false
  const hotelReSelectionError = false

  return (
    <div>
      <div className={styles.desktopFilters}>
        <Filters
          selection={selection}
          selectionLoading={selectionLoading}
          onDateChange={handleDateChange}
          onPayloadChange={setPayload}
          token={token}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className={styles.mobileFilters}>
        {/* <FiltersMobile
          selection={selection}
          onDateChange={handleDateChange}
          onPayloadChange={setPayload}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          token={token}
        /> */}
      </div>
      <div>
        <SelectFlight
          hotelReSelectionLoading={hotelReSelectionLoading}
          selection={selection}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setPayload={setPayload}
          payload={payload}
        />
      </div>
      {
        <div className={styles.glance}>
          {!hotelReSelectionError && reSelectionData && hotel && (
            <div className={styles.details}>Jouw reis</div>
          )}

          {/* {hotelReSelectionLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
              }}
              className={styles.popularDestinationContainer}
            >
              <Spin
                indicator={
                  <LoadingOutlined
                    className={styles.loader}
                    style={{ fontSize: 50, marginBottom: '100px' }}
                    spin
                  />
                }
              />
            </div>
          ) : ( */}
          {/* <EverythingInGlanceCardPackage
            packageHotel={selection}
            flightScreen={true}
            packageData={reSelectionData}
            hotelInner={true}
            hotel={hotel}
            data={reSelectionData}
            images={images}
            payload={{ ...payload, IsHotelOnly: IsHotelOnly }}
          /> */}
          {/* )} */}
        </div>
      }
    </div>
  );
};

export default PakketReizenComponent;

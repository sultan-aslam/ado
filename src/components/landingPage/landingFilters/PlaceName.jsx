import React from 'react';
import Image from 'next/image';

import location from '../../../../public/images/locationHotel.png';
import presentationUp from '../../../../public/images/presentationUp.png';
import presentation from '../../../../public/images/presentation.png';
import styles from './landingFilter.module.css';

const PlaceName = ({
  hotels,
  toggleHotelsVisibility,
  handleDestination,
  country,
  region,
  place,
  filteredGroupedHotels,
  setPlaceState,
  searchQuery,
  visiblePlaces
}) => {
  const placeMatchesQuery = place
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
  const showDropdown = Array.isArray(hotels) && hotels.length > 5;

  const showPlace = placeMatchesQuery && (
    <div
      className={styles.headingMain2}
      onClick={() =>
        handleDestination([
          filteredGroupedHotels[country][region][place]?.placeID,
          place
        ])
      }
    >
      {place}
    </div>
  );

  return (
    <div className={styles.mainDesignTag}>
      <div className={styles.searchResult_infodiv_Sec1}>
        {placeMatchesQuery && (
          <div className={styles.locationdiv}>
            <Image
              src={location}
              width={30}
              height={30}
              alt='Location'
              className={styles.location}
            />
          </div>
        )}
        <div className={styles.searchResult_infodiv}>
          <div className={styles.searchResult_infodiv_name}>{showPlace}</div>

          {/* Show the down/up arrow only if there are more than 5 hotels */}
          {placeMatchesQuery && showDropdown && (
            <div
              className={styles.toggleIcon}
              onClick={() => {
                toggleHotelsVisibility(place);
                setPlaceState(true);
              }} // Toggle visibility of hotels
            >
              {visiblePlaces[place] ? (
                <Image
                  src={presentationUp}
                  width={10}
                  height={10}
                  alt='Location'
                />
              ) : (
                <Image
                  src={presentation}
                  width={10}
                  height={10}
                  alt='Location'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceName;

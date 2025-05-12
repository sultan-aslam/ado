/* eslint-disable react/display-name */
import React, { useMemo, useEffect } from 'react';
import { Skeleton } from 'antd';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';

import location from '../../../../public/images/locationHotel.png';
import presentationUp from '../../../../public/images/presentationUp.png';
import presentation from '../../../../public/images/presentation.png';
import styles from './landingFilter.module.css';

const Hotels = dynamic(() => import('./Hotels'), { ssr: false });

const SearchResults = ({
  loadings,
  filteredGroupedHotels,
  showHoteslWithDestination,
  toggleHotelsVisibility,
  handleDestination,
  setPlaceState,
  searchQuery,
  visiblePlaces,
  placesState,
  handleLinkClick,
  countries
}) => {
  if (loadings && !countries.length)
    return (
      <div className={styles.searchResults}>
        <Skeleton active />
      </div>
    );
  if (!countries.length)
    return (
      <div className={styles.searchResults}>
        <div>No results found.</div>
      </div>
    );

  return (
    <div className={styles.searchResults}>
      {countries.map(([country, regions]) => (
        <Country
          key={country}
          country={country}
          regions={regions}
          showHoteslWithDestination={showHoteslWithDestination}
          toggleHotelsVisibility={toggleHotelsVisibility}
          handleDestination={handleDestination}
          setPlaceState={setPlaceState}
          searchQuery={searchQuery}
          visiblePlaces={visiblePlaces}
          placesState={placesState}
          handleLinkClick={handleLinkClick}
          filteredGroupedHotels={filteredGroupedHotels}
        />
      ))}
    </div>
  );
};

const Country = React.memo(({ country, regions, ...props }) => {
  const regionsData = useMemo(() => Object.entries(regions), [regions]);

  return (
    <div>
      <h3 className={styles.countryName}>{country}</h3>
      {regionsData.map(([region, places]) => (
        <Region
          key={region}
          country={country}
          region={region}
          places={places}
          {...props}
        />
      ))}
    </div>
  );
});

const Region = React.memo(({ region, places, ...props }) => {
  const [showAll, setShowAll] = React.useState(false);
  const placesData = useMemo(() => Object.entries(places), [places]);
  useEffect(() => {
    setTimeout(() => setShowAll(true), 500);
  }, []);
  return (
    <div>
      <h4 className={styles.regionName}>{region}</h4>
      {placesData.map(([place, data], index) => (
        <Place
          key={place}
          place={place}
          hotels={data.hotels}
          region={region}
          isShow={showAll ? showAll : index === 0}
          {...props}
        />
      ))}
    </div>
  );
});

const Place = React.memo(
  ({
    place,
    hotels,
    showHoteslWithDestination,
    handleDestination,
    searchQuery,
    country,
    region,
    isShow,
    handleLinkClick,
    filteredGroupedHotels
  }) => {
    const [showHotels, setShowHotels] = React.useState(true);
    const placeMatchesQuery = useMemo(
      () => place.toLowerCase().includes(searchQuery.toLowerCase()),
      [place, searchQuery]
    );

    const showDropdown = useMemo(
      () => Array.isArray(hotels) && hotels.length > 5,
      [hotels]
    );

    const showPlaceName = placeMatchesQuery && (
      <div
        className={styles.headingMain2}
        onClick={() =>
          handleDestination(
            [filteredGroupedHotels[country][region][place]?.placeID, place],
            { country, region, place }
          )
        }
      >
        {place}
      </div>
    );

    return (
      <div className={styles.parentMainDesign}>
        {showHoteslWithDestination && (
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
                <div className={styles.searchResult_infodiv_name}>
                  {showPlaceName}
                </div>

                {placeMatchesQuery && showDropdown && (
                  <div
                    className={styles.toggleIcon}
                    onClick={() => setShowHotels(!showHotels)}
                  >
                    {showHotels ? (
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
        )}
        <InfiniteScroll
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}></p>}
          dataLength={hotels.length}
        >
          {isShow && showHotels && (
            <Hotels
              handleLinkClick={handleLinkClick}
              hotels={hotels}
              country={country}
              region={region}
              place={place}
            />
          )}
        </InfiniteScroll>
      </div>
    );
  }
);

export default SearchResults;

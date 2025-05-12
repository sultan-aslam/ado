import React from 'react';
import {  Radio } from 'antd';
import Image from 'next/image';

import Flights from '../Flights/Flights';
import styles from './flightCard.module.css';
import returnImg from '../../../../public/images/return.png';
import outward from '../../../../public/images/outward.png';
// import { useAppSelector } from '@/store/reduxHooks';

const FlightCard = ({ id, selected, onSelect, flightData, loading, error }) => {
  // const { customLoader: customLoaderCount, loading: loadCount } =
  //   useAppSelector(state => state.reSelectionSearch);
  const customLoader = false
  const hotelReSelectionLoading = false
    
  // const customLoader = customLoaderCount > 0;
  // const hotelReSelectionLoading = loadCount > 0;

  const isLoading = loading || customLoader || hotelReSelectionLoading;
  const handleSelect = () => {
    onSelect(id);
  };

  if (error && !isLoading) {
    return (
      <div>
        Geen vluchtgegevens gevonden.
        {/* <NoSelectionFound /> */}
      </div>
    );
  }
  return (
    <>
      <div className={styles.con}>
        <div className={styles.div2}>
          <div className={styles.outward}>
            <Image src={outward} alt="Outward Flight" className="objectCover" />
            &nbsp;&nbsp;
          </div>
          <h5>Heenvlucht</h5>
        </div>
        <div className={styles.div1}>
          <div className={styles.outward}>
            <Image
              src={returnImg}
              alt="Return Flight"
              className="objectCover"
            />
            &nbsp;&nbsp;
          </div>
          <h5>Terugvlucht</h5>
        </div>
      </div>
      {/* <div>
        <p className={styles.depName}>From {flightData && flightData?.departures?.departureAirportName}</p>
      </div> */}

      <div className={styles.containerSelected}>Geselecteerde vluchten</div>
      <div
        className={`${styles.container} ${selected ? styles.selected : ''}`}
        onClick={handleSelect}
      >
        <div className={styles.radio}>
          <Radio checked={selected} />
        </div>
        <div className={styles.flight}>
          <Flights flightData={flightData} />
        </div>
        <div className={styles.tags}>
          {/* <Tag className={styles.tag1}>GOEDKOOPSTE</Tag>
          <Tag className={styles.tag2}>IDEALE REIS</Tag> */}
        </div>
      </div>
    </>
  );
};

export default FlightCard;

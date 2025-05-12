import React, { useState, useEffect } from 'react';
import {  Radio } from 'antd';
import styles from './flightCard.module.css';
import FlightRight from '../../../../public/images/FlightRight.svg';
import FlightLeft from '../../../../public/images/FlightLeft.svg';
import returnImg from '../../../../public/images/return.png';
import outward from '../../../../public/images/outward.png';
import Image from 'next/image';
// import { reselectionCustomLoader } from '@/store/features/reselection/reSelectionSlice';
// import { useAppDispatch } from '@/store/reduxHooks';

const FlightCards = ({
  outboundOptions,
  inboundOptionsR,
  handleSelectChange,
  loading
}) => {
  // const dispatch = useAppDispatch();
  // States to track the selected outbound and inbound flights
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedInboundFlight, setSelectedInboundFlight] = useState(null);

  // Load the selected outbound and inbound flights from localStorage on mount
  useEffect(() => {
    const savedOutboundFlight = localStorage.getItem('activeOutboundFlight');
    const savedInboundFlight = localStorage.getItem('activeInboundFlight');

    if (savedOutboundFlight) {
      setSelectedOutboundFlight(JSON.parse(savedOutboundFlight));
    }

    if (savedInboundFlight) {
      setSelectedInboundFlight(JSON.parse(savedInboundFlight));
    }
  }, []);

  // Handle selection of an outbound flight
  const handleOutboundSelect = flight => {
    // dispatch(reselectionCustomLoader());
    localStorage.setItem('activeOutboundFlight', JSON.stringify(flight));
    setSelectedOutboundFlight(flight);
    handleSelectChange('outward', {
      label: flight.labelOriginal,
      value: flight.value
    });
  };

  // Handle selection of an inbound flight
  const handleInboundSelect = flight => {
    // dispatch(reselectionCustomLoader());
    localStorage.setItem('activeInboundFlight', JSON.stringify(flight));
    setSelectedInboundFlight(flight);
    handleSelectChange('inward', {
      label: flight.labelOriginal,
      value: flight.value
    });
  };
  const isMobile = window.innerWidth < 600;
  const displayedFromLocations = new Set();
  const displayedFromLocations2 = new Set();
  return (
    <div className={styles.main}>
      {/* Outbound Flight Section */}
      {outboundOptions && (
        <div className={styles.container}>
          <p className={styles.outwardText}>Alternatieve vluchten</p>
          <div className={styles.outward}>
            <Image src={outward} alt='Outward Flight' className='objectCover' />
            &nbsp;&nbsp; Heenvlucht
          </div>
          {outboundOptions.map((flight, index) => {
            const fromLocation = flight?.label?.from;
            if (fromLocation && !displayedFromLocations.has(fromLocation)) {
              displayedFromLocations.add(fromLocation);
              return (
                <p key={index} className={styles.locationDiv}>
                  Van {fromLocation}
                </p>
              );
            }
            return null;
          })}
          {outboundOptions.map((flight, index) => (
            <div key={flight.value} className={styles.container2}>
              <div className={styles.radio}>
                <Radio
                  disabled={loading}
                  // checked={selectedOutboundFlight?.value === flight.value} // Check based on `value`
                  className={styles.radioStyle}
                  onClick={() => handleOutboundSelect(flight)}
                />
              </div>
              <div className={styles.flight}>
                <div className={styles.flightContainer}>
                  <div className={styles.flights}>
                    <div className={styles.flight}>
                      <div className={styles.wrapper}>
                        <div className={styles.imageContainer}>
                          <Image
                            src={FlightRight}
                            alt='Flight Image'
                            className='objectCover'
                          />
                        </div>
                        <div className={styles.timingContainer}>
                          <div className={styles.timing}>
                            <p className={styles.takeOfTime}>
                              {flight?.label?.takeOffTime}
                            </p>
                            <div>
                              <p className={styles.heen}>HEEN</p>
                              <hr className={styles.lineHeen} />
                            </div>
                            <p className={styles.landingTime}>
                              {flight?.label?.landingTime}
                            </p>
                          </div>
                          <div>
                            <p className={styles.directFlight}>
                              DIRECTE VLUCHT
                            </p>
                            <hr className={styles.lineDirectFlight} />
                          </div>
                        </div>
                        <div className={styles.tags}>
                        <p
                            className={styles.tagsP}
                            style={{
                              color: flight?.priceDifference >= 0 ? 'red' : 'green',
                            }}
                          >
                            {flight?.priceDifference >= 0 ? '+ ' : '- '}€{Math.abs(flight?.priceDifference)} p.p.
                          </p>
                          {/* <Tag className={styles.tag1}>GOEDKOOPSTE</Tag>
                          <Tag className={styles.tag2}>IDEALE REIS</Tag> */}
                        </div>
                      </div>
                      <div className={styles.flightDetailsContainer}>
                        <div className={styles.airport}>
                          <p className={styles.airports}>
                            Van {flight?.label?.from} - Naar {flight?.label?.to}
                          </p>
                        </div>
                        <div className={styles.airlineContainer}>
                          <h3 className={styles.airline}>
                            {flight?.label?.airline}
                          </h3>
                          <h4 className={styles.flightNumber}>
                            {flight?.label?.flightNumber}
                          </h4>
                          <h4 className={styles.flightNumber}>
                            {flight?.label?.date}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.tags}>
                <Tag className={styles.tag1}>GOEDKOOPSTE</Tag>
                <Tag className={styles.tag2}>IDEALE REIS</Tag>
              </div> */}
            </div>
          ))}
        </div>
      )}

      {/* Inbound Flight Section */}
      {inboundOptionsR && (
        <div className={styles.container}>
          <p className={styles.outwardText2}>Alternatieve vluchten</p>
          <div className={styles.outward}>
            <Image
              src={returnImg}
              alt='Return Flight'
              className='objectCover'
            />
            &nbsp;&nbsp; Terugvlucht
          </div>
          {inboundOptionsR.map((flight, index) => {
            const fromLocation = flight?.label?.from;
            if (fromLocation && !displayedFromLocations2.has(fromLocation)) {
              displayedFromLocations2.add(fromLocation);
              return (
                <p key={index} className={styles.locationDiv}>
                  Van {fromLocation}
                </p>
              );
            }
            return null;
          })}
          {inboundOptionsR.map((flight, index) => (
            <div key={flight.value} className={styles.container2}>
              <div className={styles.radio}>
                <Radio
                  disabled={loading}
                  // checked={selectedInboundFlight?.value === flight?.value} // Check based on `value`
                  className={styles.radioStyle}
                  onClick={() => handleInboundSelect(flight)}
                />
              </div>
              <div className={styles.flight}>
                <div className={styles.flightContainer}>
                  <div className={styles.flights}>
                    <div className={styles.flight}>
                      <div className={styles.wrapper}>
                        <div className={styles.imageContainer}>
                          <Image
                            src={FlightLeft}
                            alt='Flight Image'
                            className='objectCover'
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '40px' }}>
                          <div className={styles.timingContainer}>
                            <div className={styles.timing}>
                              <p className={styles.takeOfTime}>
                                {flight?.label?.takeOffTime}
                              </p>
                              <div>
                                <p className={styles.heen}>HEEN</p>
                                <hr className={styles.lineHeen} />
                              </div>
                              <p className={styles.landingTime}>
                                {flight?.label?.landingTime}
                              </p>
                            </div>
                            <div>
                              <p className={styles.directFlight}>
                                DIRECTE VLUCHT
                              </p>
                              <hr className={styles.lineDirectFlight} />
                            </div>
                          </div>
                          {/* {!isMobile && (
                            <div className={styles.imageContainer}>
                              <Image
                                src={FlightLeft}
                                alt='Flight Image'
                                className='objectCover'
                              />
                            </div>
                          )} */}
                        </div>
                        <div className={styles.tags}>
                          {/* <p className={styles.tagsP}> €{flight?.priceDifference} p.p.</p> */}
                          <p
                            className={styles.tagsP}
                            style={{
                              color: flight?.priceDifference >= 0 ? 'red' : 'green',
                            }}
                          >
                            {flight?.priceDifference >= 0 ? '+ ' : '- '}€{Math.abs(flight?.priceDifference)} p.p.
                          </p>


                          {/* <Tag className={styles.tag1}>GOEDKOOPSTE</Tag>
                          <Tag className={styles.tag2}>IDEALE REIS</Tag> */}
                        </div>
                      </div>
                      <div className={styles.flightDetailsContainer}>
                        <div className={styles.airport}>
                          <p className={styles.airports}>
                            Van {flight?.label?.from} - Naar {flight?.label?.to}
                          </p>
                        </div>
                        <div className={styles.airlineContainer}>
                          <h3 className={styles.airline}>
                            {flight?.label?.airline}
                          </h3>
                          <h4 className={styles.flightNumber}>
                            {flight?.label?.flightNumber}
                          </h4>
                          <h4 className={styles.flightNumber}>
                            {flight?.label?.date}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.tags}>
                <Tag className={styles.tag1}>GOEDKOOPSTE</Tag>
                <Tag className={styles.tag2}>IDEALE REIS</Tag>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightCards;

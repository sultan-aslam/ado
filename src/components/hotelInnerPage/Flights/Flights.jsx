import React from 'react';
import styles from './flights.module.css';
import FlightRight from '../../../../public/images/FlightRight.svg';
import FlightLeft from '../../../../public/images/FlightLeft.svg';
import { parseFlightString } from '@/lib/flightDataFormat';
// import { useAppSelector } from '@/store/reduxHooks';
import Image from 'next/image';

const Flights = ({ flightData }) => {
  const { inBoundFlight, outBoundFlight } = flightData;
  // const { glanceData } = useAppSelector(state => state?.glanceSlice);
  // const { inward, outward } = glanceData;
  const inward = {}
  const outward = {}
  const isMobile = window.innerWidth < 600;
  // Use parsed data from glanceData or flightData
  const inBoundParsed = inward
    ? parseFlightString(inward.label)
    : inBoundFlight
    ? parseFlightString(inBoundFlight.name)
    : {};

  const outBoundParsed = outward
    ? parseFlightString(outward.label)
    : outBoundFlight
    ? parseFlightString(outBoundFlight.name)
    : {};

  const flights = [
    {
      id: 1,
      imageSrc: FlightRight,
      takeOffTime: outBoundParsed?.takeOffTime || '',
      landingTime: outBoundParsed?.landingTime || '',
      direction: 'HEEN',
      flightType: 'DIRECTE VLUCHT',
      airports: `Van ${outBoundParsed?.from} - Naar ${outBoundParsed?.to}`,
      airline: outBoundParsed?.airline || '',
      flightNumber: outBoundParsed?.flightNumber || '',
      date: outBoundParsed?.date || '',
      isSecondFlight: false
    },
    {
      id: 2,
      imageSrc: FlightLeft,
      takeOffTime: inBoundParsed?.takeOffTime || '',
      landingTime: inBoundParsed?.landingTime || '',
      direction: 'TERUG',
      flightType: 'DIRECTE VLUCHT',
      airports: `Van ${inBoundParsed?.from} - Naar ${inBoundParsed?.to}`,
      airline: inBoundParsed?.airline || '',
      flightNumber: inBoundParsed?.flightNumber || '',
      date: inBoundParsed?.date || '',
      isSecondFlight: true
    }
  ];

  return (
    <div className={styles.flightContainer}>
      {flightData && (
        <div className={styles.flights}>
          {flights?.map((flight, index) => (
            <React.Fragment key={flight.id}>
              <div className={styles.flight}>
                <div className={styles.wrapper}>
                  {(!flight.isSecondFlight ||
                    (isMobile && flight.isSecondFlight)) && (
                    <div
                      className={`${styles.imageContainer} ${
                        flight.isSecondFlight ? styles.imageContainerRight : ''
                      }`}
                    >
                      <Image
                        src={flight.imageSrc}
                        alt='Flight Image'
                        className='objectCover'
                      />
                    </div>
                  )}
                  <div className={styles.timingContainer}>
                    <div className={styles.timing}>
                      <p className={styles.takeOfTime}>{flight.takeOffTime}</p>
                      <div>
                        <p className={styles.heen}>{flight.direction}</p>
                        <hr className={styles.lineHeen} />
                      </div>
                      <p className={styles.landingTime}>{flight.landingTime}</p>
                    </div>
                    <div>
                      <p className={styles.directFlight}>{flight.flightType}</p>
                      <hr className={styles.lineDirectFlight} />
                    </div>
                  </div>
                  {!isMobile && flight.isSecondFlight && (
                    <div
                      className={`${styles.imageContainer} ${
                        flight.isSecondFlight ? styles.imageContainerRight : ''
                      }`}
                    >
                      <Image
                        src={flight.imageSrc}
                        alt='Flight Image'
                        className='objectCover'
                      />
                    </div>
                  )}
                </div>
                <div className={styles.flightDetailsContainer}>
                  <div className={styles.airport}>
                    <p className={styles.airports}>{flight.airports}</p>
                  </div>
                  <div className={styles.airlineContainer}>
                    <h3 className={styles.airline}>{flight.airline}</h3>
                    <h4 className={styles.flightNumber}>
                      {flight.flightNumber}
                    </h4>
                    <h4 className={styles.flightNumber}>{flight.date}</h4>
                  </div>
                </div>
              </div>
              {/* {index < flights.length - 1 && <hr className={styles.dividere} />} */}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;

import { Rate } from 'antd';
import React, { memo } from 'react';
import { IoIosStar } from 'react-icons/io';

import { ScoreIcon } from '@/components/Icons/ScoreIcon';
import styles from './hotelNavbar.module.css';
import { useHotelStore } from '@/hooks/useZustandStore';

const HotelInfo = props => {
  const hotelStore = useHotelStore();
  const hotel = props.hotel ?? hotelStore.hotel;

  const fullText = `${hotel?.name} , ${hotel?.countryInfo?.name}`;
  return (
    <div className={styles.hotelInfoDetails}>
      <div
        className={styles.hotelName}
        title={fullText.length > 12 ? fullText : ''}
      >
        {fullText}
      </div>
      <div className={styles.hotelRating}>
        <Rate
          disabled
          allowHalf
          defaultValue={hotel?.starRating}
          className={styles.rating}
          character={<IoIosStar size={14} className={styles.rating} />}
        />
        <div className={styles.hotelRatingText}>
          {hotel?.conceptName?.toUpperCase()}
        </div>
      </div>
      <div className={styles.travelAdvisorIcon}>
        {hotel?.tripAdvisorRating ? (
          <>
            <ScoreIcon size={14} className={styles.scoreIcon} />
            <div className={styles.accomodationText}>
              {hotel.tripAdvisorRating.replace(',', '.')}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default memo(HotelInfo);

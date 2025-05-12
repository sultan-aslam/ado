import { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import OverViewCard from '../../OverViewCard';
import styles from './overview.module.css';
import { calculateTimeLeft } from '@/lib/dateFormat';
import Reviews from '../Reviews';
const TimerCountdown = dynamic(() => import('@/components/common/TimerCountdown'), {
  ssr: true
});
const Facilities = dynamic(() => import('../Facilities'), {
  ssr: true,
  loading: () => <div></div>,
});

const Overview = ({ hotel, scrollToPriceSection, categories }) => {
  const [isExpired, setIsExpired] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const expirationDate = new Date(hotel?.timeLeft);

    if (expirationDate <= currentDate) {
      setIsFutureDate(false);
    }
  }, [hotel?.timeLeft]);

  const getWordCount = text => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const timeLeft = calculateTimeLeft(hotel?.timeLeft);
  const description = hotel?.overview;
  const wordCount = getWordCount(description);

  return (
    <div className={styles.hotelOveriewSection}>
      <div className={styles.hotelOverview}>
        <div className={styles.hotelOverviewRecommendation}>
          {!isExpired && hotel?.timeLeft && isFutureDate && (
            <div>
              <TimerCountdown
                hours={timeLeft?.totalHours}
                days={timeLeft?.days}
                minutes={timeLeft?.minutes}
                seconds={timeLeft?.seconds}
                setIsExpired={setIsExpired}
                hotelName={hotel?.name}
                discount={hotel?.discount}
              />
            </div>
          )}
        </div>

        <div className={styles.mobileOverviewCard}>
          <OverViewCard
            hotel={hotel}
            scrollToPriceSection={scrollToPriceSection}
          />
        </div>

        <Reviews hotel={hotel} />
        <Facilities categories={categories} />
      </div>
      <div className={styles.desktopOverviewCard}>
        <OverViewCard
          hotel={hotel}
          scrollToPriceSection={scrollToPriceSection}
        />
      </div>
    </div>
  );
};

export default memo(Overview);

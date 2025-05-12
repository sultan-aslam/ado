import { memo } from 'react';

import styles from './reviews.module.css';

const Reviews = ({ hotel }) => {
  const scrollToDiv = () => {
    const element = document.getElementById('details-description');
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };
  return (
    <div id="hotelSection">
      {hotel?.localFacilitiesDescription !== null && (
        <>
          <div className={styles.overviewDescription}>
            {hotel?.localFacilitiesDescription}{' '}
            <span
              style={{ cursor: 'pointer', color: '#028e00' }}
              onClick={scrollToDiv}
            >
              Lees verder
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Reviews);

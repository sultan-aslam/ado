import { memo } from 'react';
import { TiTick } from 'react-icons/ti';

import styles from './facilities.module.css';

const Facilities = ({ categories }) => {
  const facilityCategories = Object.keys(categories).filter(
    category => categories[category].length > 0
  );
  return (
    <div>
      <div className={styles.hotelFacilities}>
        <div className={styles.facilities}>Faciliteiten</div>
        <div className={styles.facilitiesGrid}>
          {facilityCategories.map(category => (
            <div key={category} className={styles.facilityColumn}>
              <div className={styles.gridContainer}>
                {categories[category].map((item, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <TiTick className={styles.tick} color="#028E00" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Facilities);

import React from 'react';
import { Rate } from 'antd';
import Image from 'next/image';

import styles from './landingFilter.module.css';
import {
  useHotelStore,
  usePackageFilterStore,
} from '@/hooks/useZustandStore';
// import { fetchHotel } from '@/store/features/hotel/hotelSlice';
// import { useAppDispatch } from '@/store/reduxHooks';
// import { fetchSelection } from '@/store/features/selection/selectionSlice';

const baseUrlImg = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const Hotels = ({ hotels, handleLinkClick, country, region, place }) => {
  const { setHotel } = useHotelStore();
  // const dispatch = useAppDispatch();
  const { resetPackageFilter } = usePackageFilterStore();
  return (
    <div className={styles.hotelList}>
      {Array.isArray(hotels) ? (
        hotels.map((hotel, hotelIndex) => (
          <div
            key={hotelIndex}
            className={styles.Card_searchResult}
            onClick={() => {
              // dispatch(fetchHotel({ id: hotel?.name, cb: setHotel }));
              // dispatch(fetchSelection({ id: hotel?.name, cb: setSelection }));
              resetPackageFilter(hotel?.name);
              setHotel({
                starRating: hotel?.rating,
                countryInfo: { name: country },
                regionInfo: { name: region },
                placeInfo: { name: place },
                ...hotel
              });

              handleLinkClick(hotel);
            }}
          >
            <div className={styles.Card_searchResult_Wrapper}>
              <div className={styles.searchResult_infodiv_Sec1}>
                <div className={styles.searchResult_imagediv}>
                  <Image
                    src={
                      hotel?.hotelImages?.[0]?.imageName
                        ? `${baseUrlImg}${hotel?.hotelImages?.[0]?.imageName}`
                        : `${baseUrlImg}/uploads/hotelimages/83/Sg4YY3vhtkiyUq3DwTkbIQ.png`
                    }
                    width={60}
                    height={38}
                    alt={hotel?.name || 'HotelRoomImage'}
                    className={styles.searchResult_image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.searchResult_infodiv1}>
                  <div className={styles.searchResult_infodiv_name}>
                    {hotel?.name.length > 35
                      ? `${hotel?.name.substring(0, 35)}...`
                      : hotel?.name}
                  </div>
                  <div className={styles.searchResult_infodiv_content}>
                    <Rate
                      allowHalf
                      disabled
                      value={Number(hotel?.rating || Math.random() * 5)}
                      className={styles.rating}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No hotels found for this place.</div>
      )}
    </div>
  );
};

export default Hotels;

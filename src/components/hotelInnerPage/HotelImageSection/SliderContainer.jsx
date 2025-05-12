'use client'
import Image from 'next/image';
import { memo } from 'react';
import Slider from 'react-slick';

import styles from './hotelImageSection.module.css';
import GalleryIcon from '../../../../public/images/GalleryIcon.svg';
import LeftArrowHI from '../../../../public/images/LeftArrowHI.svg';
import RightArrowHI from '../../../../public/images/RightArrowHI.svg';
// import { useAppSelector } from '@/store/reduxHooks';
import discountBanner from '../../../../public/DISCOUNTBANNER.png';
import { ZoomIcon } from '@/components/common/icons/ZoomIcon';
const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const SliderContainer = ({ images, handleImageClick }) => {
  // const {
  //   hotel,
  //   loading: hotelLoading,
  //   mainLoading
  // } = useAppSelector(state => state.hotel);
  const hotel = {}
  const settingsMobile = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  
  return (
    <div className='slider-container'>
      <Slider {...settingsMobile}>
        {images?.map((image, index) => (
          <div className={styles.slick} key={index}>
            <div className={styles.zoomIcon} onClick={() => handleImageClick(index)}>
              <ZoomIcon />
            </div>
            {hotel?.discount && (

              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", zIndex: "1000" }}>
                  <Image
                    src={discountBanner}
                    alt={hotel?.name || "HotelRoomImage"}
                    height={40}
                    width={120}
                  />
                </div>
               <p className={styles.para}>-{hotel?.discount}%</p>
              </div>
            )}
            {hotel?.overlayText && (
              <>
                <div className={styles.imageTagMobile}>
                  {hotel?.overlayText}
                </div>
              </>
            )}
            <Image
              fill
              src={`${baseUrl}/${image?.imageName}`}
              onClick={() => handleImageClick(index)}
              alt={hotel?.name || "HotelRoomImage"}
              objectFit='cover'
            />
            <div className={styles.imageCountMobile}>
              <div className={styles.imagesQty}>
                <Image src={GalleryIcon} sizes='10px' alt='Htes' />
                <p className={styles.qty}>{images.length}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(SliderContainer);

const NextArrow = ({ onClick }) => (
  <div className={styles.next} onClick={onClick}>
    <Image src={RightArrowHI} alt='Next' />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={styles.prev} onClick={onClick}>
    <Image src={LeftArrowHI} alt='Previous' />
  </div>
);

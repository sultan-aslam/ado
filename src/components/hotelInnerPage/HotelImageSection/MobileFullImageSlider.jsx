import { memo } from 'react';
import Image from 'next/image';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import styles from './hotelImageSection.module.css';

const MobileFullImageSlider = ({
  changeSlide,
  setFullSliderVisible,
  images,
  imageIndex,
  name
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <div className={styles.fullSlider}>
      <div className={styles.arrow} onClick={() => changeSlide('left')}>
        <MdOutlineKeyboardArrowLeft />
      </div>
      <div className={styles.imgContainer}>
        <Image
          fill
          src={`${baseUrl}/${images[imageIndex]?.imageName}`}
          alt={name || "HotelRoomImage"}
          className='objectCover'
        />
      </div>
      <div className={styles.arrow} onClick={() => changeSlide('right')}>
        <MdOutlineKeyboardArrowRight />
      </div>
      <div className={styles.close} onClick={() => setFullSliderVisible(false)}>
        <IoClose />
      </div>
    </div>
  );
};

export default memo(MobileFullImageSlider);

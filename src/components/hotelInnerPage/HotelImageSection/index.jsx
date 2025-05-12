'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import styles from './hotelImageSection.module.css';
// import { LeftArrow } from '../../Icons/LeftArrow';
// import { RightArrow } from '../../Icons/RightArrow';
import FullImagesSlider from './FullImagesSlider';
import MobileFullImageSlider from './MobileFullImageSlider';
import SliderContainer from './SliderContainer';
import { useHotelStore } from '@/hooks/useZustandStore';
// import { useAppSelector } from '@/store/reduxHooks';

const HotelImageSection = props => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const hotelStore = useHotelStore();
  const hotel = props.hotel ?? hotelStore.hotel;
  const [isFullSliderVisible, setFullSliderVisible] = useState(false);                                                                                                    
  const images = hotel?.hotelImage || [];
  const [imageIndex, setImageIndex] = useState(0);
  // const { hotelOnlyData } = useAppSelector(state => state.hotelOnlySearch);
  const changeSlide = direction => {
    if (direction === 'left') {
      setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
    } else {
      setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
    }
  };

  const extraImagesCount = images?.length > 7 ? images?.length - 7 : 0;

  // function NextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return <RightArrow onClick={onClick} className={className} />;
  // }

  // function PrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return <LeftArrow className={className} onClick={onClick} />;
  // }

  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />
  // };

  const handleImageClick = index => {
    setImageIndex(index);
    setFullSliderVisible(true);
  };

  return (
    <>
      {images.length > 0 ? (
        <>
          <div className={styles.imageSection}>
            {isFullSliderVisible && (
              <FullImagesSlider
                setFullSliderVisible={setFullSliderVisible}
                changeSlide={changeSlide}
                images={images}
                name={hotel?.name}
                imageIndex={imageIndex}
              />
            )}

            <div className={styles.heroImagesContainer}>
              <div className={styles.heroMainImageContainer}>
                {hotel?.discount && (
                  <div className={styles.heroMainImageFlag}>
                    -{hotel?.discount}%
                  </div>
                )}
                 {hotel?.overlayText && (
                  <div className={styles.heroMainImageOverlay}>
                    {hotel?.overlayText}
                  </div>
                )}
                <div className={styles.heroMainImage}>
                  <Image
                    fill
                    src={`${baseUrl}/${images[0]?.imageName}`}
                    alt={hotel?.name || "HotelRoomImage"}
                    className='objectCover'
                    onClick={() => handleImageClick(0)}
                  />
                </div>
              </div>
              <div className={styles.heroLeftImages}>
                {images?.map((image, index) =>
                  [1, 2].includes(index) ? (
                    <div key={index} className={styles.heroLeftImage}>
                      <Image
                        fill
                        src={`${baseUrl}/${image?.imageName}`}
                        alt={hotel?.name || "HotelRoomImage"}
                        className='objectCover'
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  ) : (
                    <React.Fragment key={index}></React.Fragment>
                  )
                )}
              </div>
            </div>

            <div className={styles.heroBottomImagesContainer}>
              <div className={styles.heroBottomImages}>
                {images?.map((image, index) =>
                  [3, 4, 5].includes(index) ? (
                    <div className={styles.heroBottomImage} key={index}>
                      <Image
                        fill
                        src={`${baseUrl}/${image?.imageName}`}
                        onClick={() => handleImageClick(index)}
                        alt={hotel?.name || "HotelRoomImage"}
                        className='objectCover'
                      />
                    </div>
                  ) : (
                    <React.Fragment key={index}></React.Fragment>
                  )
                )}
              </div>

              {images?.length > 7 && (
                <div className={styles.heroBottomLastImage}>
                  <div
                    className={styles.extraImagesOverlay}
                    onClick={() => handleImageClick(6)}
                  >
                    <div
                      className={styles.extraImagesCount}
                    >{`+${extraImagesCount} photos`}</div>
                  </div>
                  {images.map((image, index) =>
                    [6].includes(index) ? (
                      <div className={styles.heroBottomLastImage} key={index}>
                        <Image
                          key={index}
                          fill
                          src={`${baseUrl}/${image?.imageName}`}
                          onClick={() => handleImageClick(index)}
                          alt={hotel?.name || "HotelRoomImage"}
                          objectFit='cover'
                        />
                      </div>
                    ) : (
                      <React.Fragment key={index}></React.Fragment>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.mobileSlider}>
            {isFullSliderVisible && (
              <MobileFullImageSlider
                setFullSliderVisible={setFullSliderVisible}
                changeSlide={changeSlide}
                images={images}
                name={hotel?.name}
                imageIndex={imageIndex}
              />
            )}

            <SliderContainer
              images={images}
              handleImageClick={handleImageClick}
            />
          </div>
        </>
      ) : (
        <> {/* <div className={styles.noImages}>No images available</div> */}</>
      )}
    </>
  );
};

export default HotelImageSection;

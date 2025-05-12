import ButtonContainer from '@/components/button/Button';
import React from 'react';
import styles from './mobileHeroSection.module.css';
import Image from 'next/image';
import MobileBanner from '../../../../public/images/MobileBanner.png';
import { formatDateToMonthYear } from '@/lib/dateFormat';
import Link from 'next/link';
import HeroImage from '../heroSection/HeroImage';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchHotel } from '@/store/features/hotel/hotelSlice';
import { fetchSelection } from '@/store/features/selection/selectionSlice';
import { useAppDispatch } from '@/store/reduxHooks';
import {
  useHotelStore,
  usePackageFilterStore,
  useSelectionStore
} from '@/hooks/useZustandStore';

const MobileHeroSlider = ({ data, loading, error, heroSlider }) => {
  const dispatch = useAppDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const truncateText = (text, maxLength = 17) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const { setSelection } = useSelectionStore();
  const { setHotel } = useHotelStore();
  const { packageFilter, resetPackageFilter } = usePackageFilterStore();

  const getTitle = () => {
    const title =
      data?.title && data.title.trim() !== '' ? data.title : 'Opening Sactie:';
    return truncateText(title);
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }}
      >
        <Spin
          indicator={
            <LoadingOutlined
              className={styles.loader}
              style={{ fontSize: 50, marginBottom: '100px' }}
              spin
            />
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroHeadings}>
          <div className={styles.headingsWrapper}>
            <div className={styles.discountAndHeadings}>
              <div>
                <div className={styles.date}>
                  {/* Opening {formatDateToMonthYear(data?.visibleFromDate)} */}
                </div>
                <div className={styles.openingWrapper}>
                  <div className={styles.opening}>{getTitle()}</div>
                  <p className={styles.borderBottom}></p>
                </div>
              </div>
              {data?.discountLabel && (
                <div className={styles.discountMobile}>
                  <h1 className={styles.discount}>
                    -{data?.discountLabel}% Korting
                  </h1>
                </div>
              )}
            </div>
            <div className={styles.location}>
              {data?.description ? data?.description : 'Dream Full World 5*'}
            </div>
          </div>
          {data?.code && data?.linkTo && (
            <Link
              href={`${data?.generatedLink?.replaceAll(' ', '-')}`}
              onClick={() => {
                const currentUrl = window.location.href;
                localStorage.setItem('previousUrl', currentUrl);
                resetPackageFilter(data.code);
                // dispatch(fetchHotel({ id: data.code, cb: setHotel }));
                // dispatch(fetchSelection({ id: data.title, cb: setSelection }));
                setHotel({});
              }}
            >
              <div className={styles.btnLink}>
                <ButtonContainer>{data?.title}</ButtonContainer>
              </div>
            </Link>
          )}
        </div>
        <div className={styles.section1Image}>
          <HeroImage
            fill
            src={
              !!data?.mobilePrimaryImage
                ? `${baseUrl}/${data?.mobilePrimaryImage}`
                : MobileBanner
            }
            style={{ borderRadius: '0px' }}
          />
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.name}>{heroSlider?.text}</div>
        <div className={styles.places}>{heroSlider?.author}</div>
      </div>
    </>
  );
};

export default MobileHeroSlider;

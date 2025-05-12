'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Skeleton } from 'antd';

import styles from './heroSection.module.css';
import HomePage1 from '../../../../public/images/HomePage1.png';
import HomePage2 from '../../../../public/images/HomePage2.png';
import ButtonContainer from '@/components/common/button/Button';
import LandingFilters from '../landingFilters/LandingFilters';
import HeroSlider from '../heroSlider/HeroSlider';
// import { useAppDispatch } from '@/store/reduxHooks';
// import { fetchHeroBanners } from '@/store/features/hero/heroSlice';
import HeroImage from './HeroImage';
import {
  useHotelStore,
  useLandingStore,
  usePackageFilterStore,
  useSelectionStore
} from '@/hooks/useZustandStore';
import { useGetData } from '@/hooks/useApi';

const HeroSection = () => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  // const dispatch = useAppDispatch();

  const { landing, addLanding } = useLandingStore();
  const {
    discountLabel,
    title,
    description,
    name,
    code,
    linkTo,
    desktopPrimaryImage,
    desktopSecondaryImage,
    generatedLink
  } = landing ?? {};
  const { setHotel } = useHotelStore();
  // const { setSelection } = useSelectionStore();
  const { packageFilter, resetPackageFilter } = usePackageFilterStore();

  useGetData(
    'active-banners',
    'api/dynamicbanners/activebanners',
    {
      onSuccess: (data) => {
        addLanding(data);
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );

  // useEffect(() => {
  //   dispatch(fetchHeroBanners(addLanding));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section1}>
          <div className={styles.heroSection}>
            <div className={styles.heroHeadings}>
              <div className={styles.discountDesktop}>
                {discountLabel ? (
                  <h1 className={styles.discount}>
                    -{discountLabel || '34'}% Korting
                  </h1>
                ) : (
                  <Skeleton.Avatar active shape="circle" size={100} />
                )}
              </div>
              {/* <div className={styles.date}>
                {visibleFromDate &&
                  `Opening ${formatDateToMonthYear(visibleFromDate)}`}
              </div> */}
              <div className={styles.openingWrapper}>
                <div className={styles.opening}>
                  {title ? title : 'Opening Sactie:'}
                </div>
                <p className={styles.borderBottom}></p>
              </div>
              <div className={styles.location}>
                {description ? description : 'Dream Full World 5*'}
              </div>
              {code && linkTo ? (
                <Link
                  href={`${generatedLink?.replaceAll(' ', '-')}`}
                  onClick={() => {
                    const currentUrl = window.location.href;
                    localStorage.setItem('previousUrl', currentUrl);
                    resetPackageFilter(name);
                    // dispatch(fetchHotel({ id: name, cb: setHotel }));
                    // dispatch(fetchSelection({ id: name, cb: setSelection }));
                    setHotel({});
                  }}
                >
                  <div className={styles.linkBtn}>
                    <ButtonContainer className={styles.btnLink}>
                      {title}
                    </ButtonContainer>
                  </div>
                </Link>
              ) : (
                <Skeleton.Button
                  active
                  size={32}
                  style={{ width: 140, borderRadius: 6 }}
                />
              )}
            </div>
            <div className={styles.section1Image}>
              <HeroImage
                src={
                  !!desktopPrimaryImage
                    ? `${baseUrl}/${desktopPrimaryImage}`
                    : HomePage1
                }
              />
            </div>
          </div>
          <div className={styles.filterSection}>
            <LandingFilters />
          </div>
          <div className={styles.sliderContainer}>
            <HeroSlider />
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.section2Image}>
            <HeroImage
              src={
                !!desktopSecondaryImage
                  ? `${baseUrl}/${desktopSecondaryImage}`
                  : HomePage2
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

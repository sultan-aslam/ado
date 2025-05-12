'use client';

import React, { memo, useEffect } from 'react';
import { Skeleton } from 'antd';
import styles from './relatedHotels.module.css';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { fetchOffers } from '@/store/features/offer/offerSlice';
import dynamic from 'next/dynamic';
const CardA = dynamic(() => import('@/components/common/cardA/CardA'), {
  ssr: true,
  loading: () => <div></div>,
});
const RelatedHotels = ({ token, hotelInner }) => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchOffers());
  // }, [dispatch]);

  // const { offers, loading } = useAppSelector(state => state.offers);
  const offers = []
  const loading = false

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Check ook deze leuke hotels</h1>
        <div className={styles.offers}>
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className={styles.offerItem}>
                  <Skeleton active />
                </div>
              ))}
            </>
          ) : (
            offers?.slice(0, 3)?.map((offer, id) => (
              <div key={id} className={styles.offerItem}>
                <CardA token={token} offer={offer} hotelInner={hotelInner} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default memo(RelatedHotels);

'use client';

import React from 'react';
import { Skeleton } from 'antd';
import { useGetData } from '@/hooks/useApi';
import CardA from '@/components/common/cardA/CardA';
import styles from './offerSection.module.css';

const OfferSection = () => {
  const { data: offers, isLoading: loading } = useGetData(
    'api/packages/active',
    'api/packages/active',
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false, // Prevent refetch on window focus
      refetchOnMount: true, // Only fetch on mount
    }
  );

  // useEffect(() => {
  //   if (offers?.length === 0) {
  //     dispatch( ());
  //   }
  //   // eslint-disable-next-line
  // }, [dispatch]);

  // const { offers, loading, error } = useAppSelector(state => state.offers);

  return (
    <>
      <div className={styles.headingContainer}>
        {/* <div className={`${styles.inclusive} font-reenie`}>ALLES INCLUSIEF</div> */}
        <div className={styles.heading}>All Inclusive Aanbiedingen Turkije</div>
      </div>
      <div className={styles.container}>
        <div className={styles.offers}>
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div key={index} className={styles.offerItem}>
                  <Skeleton active />
                </div>
              ))}
            </>
          ) : (
            offers?.data?.map((offer, id) => (
              <div key={id} className={styles.offerItem}>
                <CardA offer={offer} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OfferSection;

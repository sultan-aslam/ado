// 'use client';

// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import dynamic from 'next/dynamic';

// import BannerSlider from '@/components/destinationPage/bannerSlider/BannerSlider';
// import DestinationBanner from '@/components/destinationPage/destinationBanner/DestinationBanner';
// import styles from './[destination]/destination.module.css';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { fetchFiltersDestination } from '@/store/features/getFilters/getFiltersSlice';
// import { useBreadCrumbs } from '@/hooks/useZustandStore';

// const MobileBanner = dynamic(() =>
//   import('@/components/destinationPage/mobileBanner/MobileBanner')
// );
// const DestinationHotels = dynamic(() =>
//   import('@/components/destinationPage/destinationHotels/DestinationHotels')
// );
// const DestinationFilters = dynamic(() =>
//   import('@/components/destinationPage/destinationFilters/DestinationFilters')
// );

// const Region = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const { setLinks } = useBreadCrumbs();
//   const { getFiltersInfo } = useAppSelector(state => state?.getFiltersInfo);

//   const destinationInfo = getFiltersInfo?.destinationInfo || {};
//   const info = destinationInfo?.info || {};

//   useEffect(() => {
//     if (!getFiltersInfo?.destinationInfo || !getFiltersInfo?.filters) return;
//     const name = destinationInfo?.info?.title;
//     const country = getFiltersInfo?.filters?.countries?.[0];
//     const countryName = country?.countryName?.replaceAll(' ', '-');
//     setLinks([
//       { title: country?.countryName, href: `/${countryName}` },
//       { title: name, href: `/${countryName}/${name?.replaceAll(' ', '-')}` }
//     ]);
//     return () => {
//       setLinks([]);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [getFiltersInfo]);
//   useEffect(() => {
//     if (params && params.region) {
//       const payload = {
//         id: params.region?.replaceAll('-', ' '),
//         destination: 'regions'
//       };
//       dispatch(fetchFiltersDestination(payload));
//     }
//   }, [dispatch, params]);

//   return (
//     <div className='container'>
//       <div className='wrapper'>
//         <div>
//           <DestinationBanner />
//         </div>
//         <MobileBanner />
//         <div className={styles.bannerSliderMobile}>
//           <BannerSlider />
//         </div>

//         {info?.title && (
//           <div className={styles.holidayHeading}>
//             <h1 className={styles.subHeading}>Vakantie {info.title}</h1>
//           </div>
//         )}

//         <div className={styles.tabs}>
//           <div className={styles.filtersSection}>
//             <div className={styles.emptyDiv}></div>
//             <DestinationFilters />
//           </div>
//           <DestinationHotels
//             destination='region'
//             destinationName={params?.region?.replaceAll('-', ' ')}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Region;

export default function Region() {
  return <div>Region</div>;
}

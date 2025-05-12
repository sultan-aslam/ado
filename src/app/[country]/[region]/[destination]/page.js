// 'use client';

// import { useEffect, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import dynamic from 'next/dynamic';

// import AboutSection from '@/components/destinationPage/aboutSection/AboutSection';
// import BannerSlider from '@/components/destinationPage/bannerSlider/BannerSlider';
// import DestinationBanner from '@/components/destinationPage/destinationBanner/DestinationBanner';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { fetchFiltersDestination } from '@/store/features/getFilters/getFiltersSlice';
// import { useBreadCrumbs } from '@/hooks/useZustandStore';
// import styles from './destination.module.css';

// const MobileBanner = dynamic(() =>
//   import('@/components/destinationPage/mobileBanner/MobileBanner')
// );
// const DestinationHotels = dynamic(() =>
//   import('@/components/destinationPage/destinationHotels/DestinationHotels')
// );
// const DestinationFilters = dynamic(() =>
//   import('@/components/destinationPage/destinationFilters/DestinationFilters')
// );

// const Destination = () => {
//   const targetRef = useRef(null);
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
//     const region = getFiltersInfo?.filters?.regions?.[0];
//     const countryName = country?.countryName?.replaceAll(' ', '-');
//     const regionName = region?.regionName?.replaceAll(' ', '-');

//     setLinks([
//       { title: country?.countryName, href: `/${countryName}` },
//       { title: region?.regionName, href: `/${countryName}/${regionName}` },
//       { title: name, href: `/${countryName}/${regionName}/${name}` }
//     ]);
//     return () => {
//       setLinks([]);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [getFiltersInfo]);

//   useEffect(() => {
//     if (params && params.destination) {
//       const payload = {
//         id: params.destination?.replaceAll('-', ' '),
//         destination: 'places'
//       };

//       dispatch(fetchFiltersDestination(payload));
//     }
//   }, [dispatch, params]);

//   useEffect(() => {
//     const url = new URL(window.location);
//     url.searchParams.delete('ChainHotels');
//     window.history.replaceState({}, '', url.toString());
//   }, []);

//   const handleScroll = () => {
//     if (targetRef.current) {
//       const offset = 170;
//       const elementPosition = targetRef.current.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='wrapper'>
//         <div>
//           <DestinationBanner handleScroll={handleScroll} />
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
//             destination='place'
//             destinationName={params.destination?.replaceAll('-', ' ')}
//           />
//         </div>
//         <div ref={targetRef}>
//           <AboutSection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Destination;

export default function Destination() {
  return <div>Destination</div>;
}

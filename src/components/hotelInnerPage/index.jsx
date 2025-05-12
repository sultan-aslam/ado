'use client';
import { Divider } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
// import { getSession } from '@/lib/auth';
// import { fetchHotel } from '@/store/features/hotel/hotelSlice';
// import { fetchSelection } from '@/store/features/selection/selectionSlice';
// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
// import { fetchHotelFaqs } from '@/store/features/hotelFaqs/hotelFaqsSlice';
// import {
//   AddFavorite,
//   deleteFavorite
// } from '@/store/features/Favorite/Favorite';
// import {
//   toggleFavouriteHotelPage,
//   toggleRemoveFavouriteHotelPage
// } from '@/store/features/hotel/hotelSlice';

import {
  useBreadCrumbs,
  useFilterStore,
  useHotelStore,
  usePackageFilterStore,
  useReselectionStore,
  useSelectionStore
} from '@/hooks/useZustandStore';
import { sendToDataLayer } from '@/lib/gtm';
// import { fetchPassngerCombination } from '@/store/features/passengerCombination/passengerCombinationSlice';
import DetailsDescription from './DetailsDescription';
import { ScreenLoader } from '../common/loader';
import { useGetData } from '@/hooks/useApi';
const HotelImageSection = dynamic(() => import('./HotelImageSection'), {
  ssr: true,
  loading: () => <div></div>
});
const HotelNavbar = dynamic(() => import('./HotelNavbar'), {
  ssr: true,
  loading: () => <div></div>
});
const Accordion = dynamic(() => import('./Accordian'), {
  ssr: true,
  loading: () => <div></div>
});
const RelatedHotels = dynamic(() => import('./RelatedHotels/RelatedHotels'), {
  ssr: true,
  loading: () => <div></div>
});RelatedHotels
const Overview = dynamic(() => import('./HotelInfo/Overview'), {
  ssr: true,
  loading: () => <div></div>
});
const Description = dynamic(() => import('./HotelInfo/Description'), {
  ssr: true,
  loading: () => <div></div>
});
// const SignInCard = dynamic(() => import('../SignInCard'), {
//   ssr: true,
//   loading: () => <div></div>
// });

const BookingFilters = dynamic(
  () => import('./BookingFilters/BookingFilters'),
  {
    ssr: true,
    loading: () => <div></div>
  }
);

// const BottomsStickyBanner = dynamic(
//   () => import('./BottomStickyBanner/bottomsStickyBanner'),
//   {
//     ssr: true,
//     loading: () => <div></div>
//   }
// );

const HotelInnerPage = ({ token, params }) => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const bookingFiltersRef = useRef(null);
  const hotelStore = useHotelStore();
  const selectionStore = useSelectionStore();
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { setLinks } = useBreadCrumbs();
  const [sessionData, setsessionData] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState();
  const { resetSelectedCheckboxesFilter } = useFilterStore();
  const { setReselection } = useReselectionStore();
  const { packageFilter } = usePackageFilterStore();
  
  const { data: hotelData, isLoading: hotelLoading } = useGetData(
    ['hotel-inner', params.slug],
    `api/hotels/hotelinnerpage/${params.slug.replaceAll('-', ' ')}`,
    {
      enabled: !!params.slug,
      onSuccess: (data) => {
        if (data?.data) {
          hotelStore.setHotel({ ...data.data, code: params.slug });
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );
  const hotel = hotelData?.data
  const { data: faqsData, isLoading: faqsLoading, error: faqsError } = useGetData(
    ['hotel-faqs', params.slug],
    'api/hotels/faq',
    {
      enabled: !!params.slug,
      method: 'POST',
      body: {
        hotelId: null,
        hotelCode: params.slug.replaceAll('-', ' ')
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );

  const { data: selectionData, isLoading: selectionLoading } = useGetData(
    ['hotel-selection', params.slug],
    `api/hotels/hotelseletionpage/${params.slug.replaceAll('-', ' ')}`,
    {
      enabled: !!params.slug,
      onSuccess: (data) => {
        if (data?.data) {
          selectionStore.setSelection({ id: params.slug, ...data.data });
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );

  useEffect(() => {
    // const GetSession = async () => {
    //   const session = await getSession();
    //   if (session) setsessionData(session);
    //   else setsessionData(null);
    //   return session;
    // };

    // GetSession();
    resetSelectedCheckboxesFilter();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    if (params.slug) {
      // dispatch(fetchHotel({ id: params.slug, cb: hotelStore.setHotel }));

      // dispatch(
      //   fetchSelection({ id: params.slug, cb: selectionStore.setSelection })
       
      // );
      // dispatch(
      //   fetchHotelFaqs({
      //     hotelId: null,
      //     hotelCode: params.slug.replaceAll('-', ' ')
      //   })
      // );
    }
    // eslint-disable-next-line
  }, [ params.slug]);

  // const {
  //   hotel,
  //   loading: hotelLoading,
  //   mainLoading
  // } = useAppSelector(state => state.hotel);


  useEffect(() => {
    if (!hotel) return;
    const { countryInfo, regionInfo, placeInfo, name } = hotel;
    const countryName = countryInfo?.name?.replaceAll(' ', '-');
    const regionName = regionInfo?.name?.replaceAll(' ', '-');
    const placeName = placeInfo?.name?.replaceAll(' ', '-');

    setLinks([
      { title: countryInfo?.name, href: `/${countryName}` },
      { title: regionInfo?.name, href: `/${countryName}/${regionName}` },
      {
        title: placeInfo?.name,
        href: `/${countryName}/${regionName}/${placeName}`
      },
      {
        title: name,
        href: `/${countryName}/${regionName}/${placeName}/${name?.replaceAll(' ', '-')}`
      }
    ]);
    return () => {
      setLinks([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  useEffect(() => {
    if (!hotel) return;
    // dispatch(fetchPassngerCombination(hotel?.accommodationCode));
  }, [ hotel]);

  // const { selection: selectionData, loading: selectionLoading } =
  //   useAppSelector(state => state.selection);
  const selection = selectionData?.data?.id
    ? selectionData.data
    : selectionStore.selection?.id === searchParams.get('code') &&
      selectionStore.selection;
  // const {
  //   faqsData,
  //   loading: faqsLoading,
  //   error: faqsError
  // } = useAppSelector(state => state.getHotelFaqs);
  const scrollToSection = id => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ behavior: 'smooth', top: section.offsetTop });
    }
  };

  const scrollToBookingFilters = () => {
    if (bookingFiltersRef.current) {
      bookingFiltersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPriceSection = () => {
    scrollToSection('priceSection');
  };

  let facilityList = hotel?.facilityList;

  const categories = {
    Bathroom: [],
    'Room Amenities': [],
    'Living Area': [],
    General: []
  };

  facilityList?.forEach(facility => {
    if (categories[facility.category]) {
      categories[facility.category].push(facility.title);
    } else {
      categories.General.push(facility.title);
    }
  });

  const AddFav = async ({ favoriteDate, router }) => {
    // const response = await dispatch(
    //   AddFavorite({ favoriteDate: favoriteDate, router })
    // );
    // if (response?.error || response?.payload === 'fetch failed') {
    // } else if (response?.meta?.requestStatus === 'fulfilled') {
    //   dispatch(
    //     toggleFavouriteHotelPage({
    //       id: favoriteDate?.LinkedId,
    //       isFavouriteId: response?.payload?.id || 0
    //     })
    //   );
    // }
  };

  const DeleteFav = async hotel => {
    // const response = await dispatch(deleteFavorite(hotel?.isFavouriteId));
    // if (response?.error || response?.payload === 'fetch failed') {
    // } else if (response?.meta?.requestStatus === 'fulfilled') {
    //   dispatch(
    //     toggleRemoveFavouriteHotelPage({
    //       id: hotel?.id
    //     })
    //   );
    // }
  };
  const HandleFavorite = hotel => {
    const payload = {
      UserId: sessionData?.data?.id,
      LinkedTo: 'hotel',
      LinkedId: hotel?.hotelImage[0]?.hotelId,
      CreatedBy: hotel?.createdBy || null,
      CreatedDate: hotel?.createdDate || null,
      UpdatedDate: hotel?.updatedDate || null,
      DeletedDate: hotel?.deletedDate || null,
      DeletedBy: hotel?.deletedBy || null,
      IsActive: hotel?.hotelImage[0]?.isActive
    };
    AddFav({ favoriteDate: payload, router });
  };

  const DeleteFavorite = hotel => DeleteFav(hotel);

  // const selectedRoomTypeHotelRaw = localStorage.getItem(
  //   'selectedRoomTypeHotelOnly'
  // );
  const selectedRoomTypeHotelRaw = null
  let selectedRoomTypeHotel = null;
  if (selectedRoomTypeHotelRaw) {
    try {
      selectedRoomTypeHotel = JSON.parse(selectedRoomTypeHotelRaw);
    } catch (error) {
      console.error('Failed to parse selectedRoomTypeHotelOnly:', error);
    }
  }
  useEffect(() => {
    sendToDataLayer({
      event: 'view_item',
      ecommerce: {
        currency: 'EUR',
        value: hotel?.singlePrice,
        items: [
          {
            item_id: hotel?.accommodationCode,
            item_name: hotel?.name,
            price: hotel?.singlePrice,
            quantity: 1,
            item_category: hotel?.placeInfo?.name
          }
        ]
      }
    });
  }, [hotel, searchParams]);
console.log('hotel', hotel)
  return (
    <>
      {hotelLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px'
          }}
        >
          <ScreenLoader />
        </div>
      ) : (
        <>
          <HotelNavbar
            scrollToSection={scrollToSection}
            hotel={hotel}
            selection={selection}
          />
          {/* <BottomsStickyBanner /> */}

          <main className={'container'}>
            <div className="wrapper hotel-page">
              <Description
                hotel={hotel}
                DeleteFavorite={DeleteFavorite}
                HandleFavorite={HandleFavorite}
                scrollToBookingFilters={scrollToBookingFilters}
                sessionData={sessionData}
              />
              <div id="photosSection">
                <HotelImageSection hotel={hotel} />
              </div>
              <Overview
                hotel={hotel}
                scrollToPriceSection={scrollToPriceSection}
                categories={categories}
              />
              <div>
                <Divider />
              </div>
              {/* <SignInCard /> */}
              <div
                id="priceSection"
                style={{ position: 'relative' }}
                ref={bookingFiltersRef}
              >
                <BookingFilters
                  selectionLoading={!selection?.id && selectionLoading}
                  hotelLoading={hotelLoading}
                  token={token}
                  selection={selection}
                  setSelectedRoomType={setSelectedRoomType}
                  hotel={hotel}
                />
              </div>

              {!!faqsData?.data?.length && (
                <Accordion
                  data={faqsData.data}
                  loading={faqsLoading}
                  error={faqsError}
                  name={hotel?.name}
                  country={hotel?.countryInfo?.name}
                />
              )}
              <DetailsDescription
                hotelCode={params.slug.replaceAll('-', ' ')}
              />
              <RelatedHotels token={token?.value} hotelInner={true} />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default HotelInnerPage;

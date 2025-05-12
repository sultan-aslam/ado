import React from 'react';
import HotelInnerPage from '@/components/hotelInnerPage';
// import { PriceProvider } from '@/store/features/priceTable/PriceContext';

// import { cookies } from 'next/headers';

export async function generateMetadata({ params }) {
  const decodedParams = {
    country: decodeURIComponent(params.country),
    region: decodeURIComponent(params.region),
    destination: decodeURIComponent(params.destination),
    slug: decodeURIComponent(params.slug)
  };

  return {
    title: `${decodedParams.slug} in ${decodedParams.destination}. Boek nu goedkoop ${decodedParams.slug}`,
    description: `Boek nu uw vakantie goedkoop naar ${decodedParams.slug} bij Adotravel. ✔️ Laagste Prijs Garantie ✔️ Lid Garantiefonds ✔️ Al 15 jaar uw specialist`
  };
}

const HotelPage = ({ params }) => {
  const decodedParams = {
    country: decodeURIComponent(params.country),
    region: decodeURIComponent(params.region),
    destination: decodeURIComponent(params.destination),
    slug: decodeURIComponent(params.slug)
  };

  // const cookieStore = cookies();
  // const accessToken = cookieStore.get('auth');
  return (
    <div>
      {/* <PriceProvider> */}
      <HotelInnerPage params={decodedParams} />
      {/* </PriceProvider> */}
    </div>
  );
};

export default HotelPage;

import { memo } from 'react';
import parse from 'html-react-parser';
import { useGetData } from '@/hooks/useApi';

const DetailsDescription = ({ hotelCode }) => {
  const { data } = useGetData(
    ['hotel-description', hotelCode],
    `api/hotels/hotelDescription/${hotelCode}`,
    {
      enabled: !!hotelCode,
      select: (response) => response?.data?.localDescription,
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );

  return (
    <div id="details-description" className="font-poppins [&>*]:font-poppins">
      {data && typeof data === 'string' && data.trim() !== '' && parse(data)}
    </div>
  );
};

export default memo(DetailsDescription);

'use client';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ButtonContainer from '../button/Button';
import CardHeadingA from '../cardCommon/CardHeadingA';
import styles from './card.module.css';
import depIcon from '../../../../public/images/summaryICon/Group.svg';
import calender from '../../../../public/images/summaryICon/Vector.svg';
import {
  useHotelStore,
  usePackageFilterStore,
  useSelectionStore
} from '@/hooks/useZustandStore';
// import { useAppDispatch } from '@/store/reduxHooks';
// import { fetchSelection } from '@/store/features/selection/selectionSlice';

const CardA = ({ offer }) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  // const dispatch = useAppDispatch();
  const {
    name,
    region,
    startDate,
    daysCount,
    place,
    starRating,
    tripAdvisorRating,
    startingPrice,
    imagePath,
    tagLine,
    description
  } = offer;
  const router = useRouter();
  const { setHotel } = useHotelStore();
  const { setSelection } = useSelectionStore();
  const { packageFilter, resetPackageFilter } = usePackageFilterStore();
  const handleBookingClick = () => {
    resetPackageFilter(offer?.code);
    // dispatch(fetchSelection({ id: offer?.name, cb: setSelection }));
    setHotel({
      countryInfo: { name: offer?.country },
      regionInfo: { name: offer?.region },
      placeInfo: { name: offer?.place },
      hotelImage: [{ hotelId: offer?.id, imageName: offer?.imagePath }],
      ...offer
    });
    router.push(
      `/${offer?.country?.replaceAll(' ', '-')}/${offer?.region?.replaceAll(
        ' ',
        '-'
      )}/${offer?.place?.replaceAll(' ', '-')}/${offer?.name?.replaceAll(' ', '-')}`
    );
  };

  return (
    <div className={styles.cardAContainer}>
      <div className={styles.cardAImageContainer}>
        <div className={styles.cardAImage}>
          <div className={styles.discountTag}>{tagLine}</div>
          <Image
            fill
            src={`${baseUrl}/${imagePath}`}
            alt={name || 'Card Image'}
            className="objectCover"
          />
        </div>
      </div>

      <div className={styles.cardABody}>
        <CardHeadingA
          starRating={starRating}
          tripAdvisorRating={tripAdvisorRating}
          name={name}
          region={region}
          place={place}
        />
        <div
          className={
            description
              ? `${styles.cardABodySectionWrapper}`
              : `${styles.cardABodySectionWrapperBorderLess}`
          }
        >
          <div className={styles.cardABodySection}>{description || ''}</div>
        </div>
        <div className={styles.deparutrdetails}>
          <p className={styles.headingCol}> Heenvlucht</p>
          <p className={styles.headingCol}> Aantal dagen</p>
        </div>
        <div className={styles.deparutrSty}>
          <div>
            <Image src={depIcon} alt="departure" />
            <span
              className={styles.blColor}
            >{`${dayjs(startDate).format('DD-MM-YYYY')}`}</span>
          </div>
          <div>
            <Image src={calender} alt="departure" />
            <span className={styles.blColor}>{`${daysCount} dagen`}</span>
          </div>
        </div>
        <div className={styles.cardAFooterSection}>
          <div className={styles.cardAButton}>
            <div onClick={handleBookingClick}>
              <ButtonContainer className={styles.bookNow}>
                Bekijk deze deal
              </ButtonContainer>
            </div>
          </div>
          <div className={styles.cardAFooterPrice}>
            <span className={styles.from}>v.a</span>
            <span className={styles.cardATextBold}>
              €{startingPrice} <span className={styles.ppColor}>p.p</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardA;

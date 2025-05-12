import React from 'react';
import { Divider } from 'antd';
import styles from './overViewCard.module.css';
import ButtonContainer from '@/components/common/button/Button';
import { CalendarIcon } from '@/components/common/icons/CalendarIcon';
import { PlaneIcon } from '@/components/common/icons/PlaneIcon';
import Image from 'next/image';
import { LogiesSvg } from '@/components/common/svgs/Svgs';
import dayjs from 'dayjs';
import { FamilyIcon } from '@/components/common/icons/FamilyIcon';
import { Wifiicon } from '@/components/common/icons/Wifiicon';
import { ScoreIcon } from '@/components/common/icons/ScoreIcon';
import { FitnessIcon } from '@/components/common/icons/FitnessIcon';
import Miniclubkids from '../../../../public/miniclubKids.png'
import recommended from '../../../../public/recommended.png'
import animationAvailable from '../../../../public/animationAvailable.png'

const OverViewCard = ({ hotel, scrollToPriceSection }) => {
  const formattedDate = dayjs(hotel?.beginDate).format('DD MMMM');
  return (
    <div className={styles.hotelOverviewCard}>
      <div className={styles.p15}>
        <div className={styles.headingContainer}>
          <div className={styles.hotelOverviewCardHeading}>
            Per persoon v.a.
          </div>
          <div className={styles.hotelOverviewCardPrice}>
            €{hotel?.singlePrice}
          </div>
        </div>
        <div
          style={{ color: '#fff' }}
          className={styles.hotelOverviewCardSubHeading}
        >
          Excl. SGR (€ 5,00 pp) en Calamiteitenfonds (€ 2,50 per boeking),
          indien nodig. De kosten ter plaatse staan ​​vermeld in het overzicht.
        </div>
        {/* <div className={styles.propertyOverview}>Hoogtepunten van vastgoed</div>
        <div className={styles.propertyOverviewDesc}>
          <TopLocationIcon />
          <div className={styles.propertyOverviewContent}>
            Toplocatie: Hoog gewaardeerd door recente gasten
          </div>
        </div>
        {hotel?.isParkingAvailable && (
          <div className={styles.propertyOverviewDesc}>
            <ParkingSvg />
            <div className={styles.propertyOverviewContent}>
              Gratis privéparkeergelegenheid beschikbaar op het terrein
            </div>
          </div>
        )}*/}
        <div className={styles.amenitiesList}>
          {hotel?.isWifiAvailable && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
                <Wifiicon />
              </div>
              <div className={styles.amenitiesListContent}>Wifi</div>
            </div>

          )}
          {hotel?.aanrader && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
              <Image
                  src={recommended}
                  alt={'recommended'}
                  width={20}
                  height={20} />
              </div>
              <div className={styles.amenitiesListContent}>Aanrader</div>
            </div>
          )}
          {hotel?.isFamilyRoomAvailable && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
                <FamilyIcon />
              </div>
              <div className={styles.amenitiesListContent}>Familie kamers</div>
            </div>
          )}
          {hotel?.miniclubKids && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
                <Image
                  src={Miniclubkids}
                  alt={'isDiningAvailable'}
                  width={20}
                  height={20} />
              </div>
              <div className={styles.amenitiesListContent}>Miniclub Kids</div>
            </div>
          )}
          {hotel?.animatieAanwezig && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
                <Image
                  src={animationAvailable}
                  alt={'animationAvailable'}
                  width={20}
                  height={20} />
              </div>
              <div className={styles.amenitiesListContent}>
                Animatie Aanwezig
              </div>
            </div>
          )}
          {hotel?.isFitnessAvailable && (
            <div className={styles.hotelLocation}>
              <div className={styles.hotelLocationIcons}>
                <FitnessIcon />
              </div>
              <div className={styles.amenitiesListContent}>
                Fitness ruimte
              </div>
            </div>
          )}
        </div>
        <div className={styles.abc}>
          <Divider className={styles.divider} />
        </div>
        <div className='flex'>
          {hotel?.tripAdvisorRating ? (
            <>
              <ScoreIcon className={styles.scoreIcon} />
              <div className={styles.accomodationText}>
                {/* Deze accommodate heeft een score van{' '} */}
                {hotel?.tripAdvisorRating
                  ? hotel.tripAdvisorRating.replace(',', '.')
                  : null}
              </div>
            </>
          ) : (
            <div className={styles.accomodationText}>NIEUW</div>
          )}
        </div>
        <div className={styles.abc}>
          <Divider className={styles.divider} />
        </div>
        <div className={styles.propertyOverviewDesc}>
          <CalendarIcon />

          <div className={styles.calender}>
            {formattedDate} ({hotel?.duration} dagen)
          </div>
        </div>
        <div className={styles.propertyOverviewDesc}>
          <PlaneIcon />
          <div className={styles.plane}>
            Incl. vlucht vanaf {hotel?.departureAirport}
          </div>
        </div>
        <div className={`${styles.propertyOverviewDesc} ${styles.pb10}`}>
          <div style={{ marginLeft: '-10px' }}>
            <LogiesSvg />
          </div>
          <div className={styles.logies}>{hotel?.conceptName}</div>
        </div>
        <ButtonContainer
          style={{
            width: '100%',
            height: '36px',
            borderRadius: '2px',
            fontSize: '14px',
            fontWeight: '500'
          }}
          onClick={scrollToPriceSection}
        >
          Bekijk alle prijzen
        </ButtonContainer>
      </div>
    </div>
  );
};

export default OverViewCard;

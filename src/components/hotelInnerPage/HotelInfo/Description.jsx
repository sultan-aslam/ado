import { Modal, Rate } from 'antd';
import { CiHeart } from 'react-icons/ci';
import {  IoIosHeart } from 'react-icons/io';
import ReactPlayer from 'react-player';
import mapboxgl from 'mapbox-gl';
import { useRouter } from 'next/navigation';

import SocialShare from '../SocialShare/SocialShare';
import styles from '../hotelInnerPage.module.css';
import { memo, useEffect, useRef, useState } from 'react';
import { useHotelStore } from '@/hooks/useZustandStore';
import { LocationIcon } from '@/components/common/icons/LocationIcon';
import { ShareIcon } from '@/components/common/icons/ShareIcon';
import { TagIcon } from '@/components/common/icons/TagIcon';
const Description = ({
  DeleteFavorite,
  sessionData,
  scrollToBookingFilters,
  HandleFavorite,
  ...props
}) => {
  const hotelStore = useHotelStore();
  const hotel = props.hotel ?? hotelStore.hotel;
  const [showMapModal, setShowMapModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(
    hotel?.longitude ? parseFloat(hotel.longitude) : 79.3832
  );
  const [lat, setLat] = useState(
    hotel?.latitude ? parseFloat(hotel.latitude) : 43.6532
  );
  const [zoom, setZoom] = useState(9);
  const socialShareRef = useRef(null);
  const router = useRouter();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        socialShareRef.current &&
        !socialShareRef.current.contains(event.target) &&
        !event.target.closest('.share-button')
      ) {
        setShareOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [socialShareRef]);

  useEffect(() => {
    if (showMapModal) {
      if (map.current) return;

      // Validate coordinates before creating map
      const validLng = !isNaN(lng) ? lng : 79.3832;
      const validLat = !isNaN(lat) ? lat : 43.6532;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [validLng, validLat],
        zoom: zoom
      });

      const marker = new mapboxgl.Marker()
        .setLngLat([validLng, validLat])
        .addTo(map.current);
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom()?.toFixed(2));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMapModal]);

  const handleShareComplete = () => {
    setShareOpen(false);
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };


  return (
    <>
      <div className={styles.description}>
        <div className={styles.hotel_infoContainer}>
          <div className={styles.hotelInfoWrapper}>
            <div
              className={`${styles.hotelInfoDetails} ${styles.hotelInfoTitle}`}
            >
              <div className={styles.hotelName}>{hotel?.name}</div>
              <div className={styles.hotelRating}>
                <Rate
                  disabled
                  allowHalf={hotel?.starRating % 1 !== 0}
                  value={hotel?.starRating}
                  className={styles.rating}
                  // character={<IoIosStar size={18} className={styles.rating} />}
                />
                <div className={styles.hotelRatingText}>
                  {hotel?.conceptName?.toUpperCase()}
                </div>
              </div>
              <div
                className={`${styles.btnContainer} ${styles.hotelDescButton}`}
              >
                <button
                  className={styles.hotelViewPrices}
                  onClick={() => scrollToBookingFilters('bookingFilters')}
                >
                  Bekijk prijzen
                </button>
              </div>
            </div>

            <div className={styles.hotelDesc}>
              <div className={styles.hotelInfoDetails}>
                <div className={styles.hotelLocationText}>
                  {hotel?.countryInfo?.name} - {hotel?.regionInfo?.name} -{' '}
                  <span>
                    {hotel?.placeInfo?.name}
                  </span>
                </div>
                <div className={styles.hotelLocationIcons}>
                  <LocationIcon />
                  <div
                    className={styles.hotelLocationText}
                    onClick={openMapModal}
                    style={{ cursor: 'pointer' }}
                  >
                    Toon op kaart
                  </div>
                </div>
                <div
                  className={styles.videoText}
                  onClick={openVideoModal}
                  style={{ cursor: 'pointer' }}
                >
                  Video
                </div>
                <div
                  className={`${styles.hotelLocationIcons} share-button`}
                  onClick={() => setShareOpen(!shareOpen)}
                  style={{ position: 'relative' }}
                  ref={socialShareRef}
                >
                  <ShareIcon className={styles.shareIcon} />
                  {shareOpen && (
                    <SocialShare onShareComplete={handleShareComplete} />
                  )}
                  <div className={styles.hotelLocationText}>
                    Deel accomodatie
                  </div>
                </div>
                {sessionData?.data?.id && (
                  <div
                    // onClick={handleFavoriteClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* <FavotriteIcon /> */}
                    {hotel?.isFavourite ? (
                      <IoIosHeart
                        color='red'
                        size={30}
                        onClick={() => DeleteFavorite(hotel)}
                      />
                    ) : (
                      <CiHeart
                        size={30}
                        onClick={() => {
                          HandleFavorite(hotel);
                        }}
                      />
                    )}
                  </div>
                )}
                <div className={styles.desktopFavIcon}></div>
                <div
                  className={`${styles.hotelLocationIcons} ${styles.hotelDescButton}`}
                  style={{ marginLeft: 'auto' }}
                >
                  <TagIcon />
                  <div className={styles.hotelPriceMatch}>
                    Laagste prijs gegarandeerd
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Hotel Description */}
            <div className={styles.mobileHotelDesc}>
              <div className={styles.hotelInfoDetails}>
                <div className={styles.mobileViewFav}>
                  <div className={styles.hotelLocationText}>
                    {hotel?.countryInfo?.name} - {hotel?.regionInfo?.name} -{' '}
                    {hotel?.placeInfo?.name}
                  </div>
                  <div className={styles.mobileFavIcon}>
                    {sessionData?.data?.id && (
                      <div
                        // onClick={handleFavoriteClick}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* <FavotriteIcon /> */}
                        {hotel?.isFavourite ? (
                          <IoIosHeart
                            color='red'
                            size={30}
                            onClick={() => DeleteFavorite(hotel)}
                          />
                        ) : (
                          <CiHeart
                            size={30}
                            onClick={() => {
                              HandleFavorite(hotel);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.mobileViewMap}>
                  <div className={styles.hotelLocationIcons}>
                    <LocationIcon />
                    <div
                      className={styles.hotelLocationText}
                      onClick={openMapModal}
                      style={{ cursor: 'pointer' }}
                    >
                      Toon op kaart
                    </div>
                  </div>
                  <div
                    className={styles.videoText}
                    onClick={openVideoModal}
                    style={{ cursor: 'pointer' }}
                  >
                    Video
                  </div>
                  <div
                    className={`${styles.hotelLocationIcons} share-button`}
                    onClick={() => setShareOpen(!shareOpen)}
                    style={{ position: 'relative' }}
                    ref={socialShareRef}
                  >
                    <ShareIcon className={styles.shareIcon} />
                    {shareOpen && (
                      <SocialShare onShareComplete={handleShareComplete} />
                    )}
                    <div className={styles.hotelLocationText}>
                      Deel accomodatie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={styles.hotelDescButton}>
            <div className={styles.hotelInfoWrapperBtn}>
              <div className={styles.btnContainer}>
                <button
                  className={styles.hotelViewPrices}
                  onClick={() => scrollToBookingFilters('bookingFilters')}
                >
                  Bekijk prijzen
                </button>
              </div>
              <div className={styles.hotelLocationIcons}>
                <TagIcon />
                <div className={styles.hotelPriceMatch}>
                  Lowest Price Guaranteed
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Modal
        title='Map'
        open={showMapModal}
        onCancel={closeMapModal}
        footer={null}
        className={styles.mapContainer}
        centered
      >
        <div
          style={{ height: '600px', borderRadius: '20px' }}
          ref={mapContainer}
        />
      </Modal>
      <Modal
        title='Video'
        open={showVideoModal}
        onCancel={closeVideoModal}
        footer={null}
        className={styles.mapContainer}
        centered
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            background: '#000',
            borderRadius: '15px'
          }}
        >
          <ReactPlayer
            className={styles.reactPlayer}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '15px'
            }}
            width='100%'
            height='100%'
            controls={true}
            url={hotel?.videoURL}
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
};

export default memo(Description);

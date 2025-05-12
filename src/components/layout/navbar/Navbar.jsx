'use client';

import { Card, Modal, Popover, Tooltip, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useGetData } from '@/hooks/useApi';
import { isMobileOrTablet } from '@/lib/deviceType';
// import { logout } from '@/store/features/auth/authSlice';
// import { fetchDesktopNavLinks, fetchMobileNavLinks } from '@/store/features/navLinks/navLinksSlice';
// import { fetchHotelsCount } from '@/store/features/getHotelsCount/getHotelCountSlice';

// import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import Contact from '../../../../public/images/Contact.svg';
import Favourite from '../../../../public/images/Favourite.svg';
import FavoriteFilled from '../../../../public/images/FavoriteFilled.svg';
import logo from '../../../../public/images/logo.svg';
import NavUser from '../../../../public/images/NavUser.svg';
import Search from '../../../../public/images/Search.svg';
// import AuthModal from '../authModal/AuthModal';
// import SearchModal from '../searchModal/SearchModal';
import News from '../../../../public/images/Newsletter.svg';
import Arrow from '../../../../public/images/arrowdes.svg';
import styles from './navbar.module.css';
// import DestinationPopover from '../destinationPage/destinationPopover/DestinationPopover';
// import NewsletterModal from '../newsletterModal/NewsLetterModal';
// import { fetchPapoularHotels } from '@/store/features/getPapoulerHotel/getPapoulerHotel';
import LoadingStateLinks from './LoadingStateLinks';
// import { removeSession } from '@/lib/auth';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar = ({ session, isBookingPage }) => {
  const router = useRouter();
  const pathName = usePathname();
  // const isLoggedIn = session;
  // const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(isMobileOrTablet());
  // const { token } = useAppSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNewsletterModal, setOpenNewsletterModal] = useState(false);
  const searchParams = useSearchParams();
  const landingPage = searchParams.get('id');
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerVisibleThema, setIsDrawerVisibleThema] = useState(false);
  const [themaPopoverVisible, setThemaPopoverVisible] = useState(false);
  // const { desktopNavLinks, mobileNavLinks, loading } = useAppSelector(state => state.navLinks);
  // const auth = useAppSelector(state => state.auth);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'login' });
  const [loading, setLoading] = useState(true);
  const isLoggedIn = false;

  const { data: mobileNavLinks = [], isLoading: isLoadingMobileLinks } = useGetData(
    'mobile-nav-links',
    'api/landingpages/mobilelandingpages',
    {
      onSuccess: (data) => {
        const navLinks = data.map(link => ({
          ...link,
          link: `/Lijst/${link.title?.replaceAll(' ', '-')}`
        }));
        return [...staticMobileLinks, ...navLinks];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );
  
  const { data: desktopNavLinks = [], isLoading: isLoadingDesktopLinks } = useGetData(
    'desktop-nav-links',
    'api/commons/navlinks',
    {
      onSuccess: (data) => {
        const navLinks = data.map(link => ({
          ...link,
          link: `/Lijst/${link.title?.replaceAll(' ', '-')}`
        }));
        return [...staticLinks, ...navLinks];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );
  
  const { data: hotelCounts, isLoading: isLoadingHotelCounts } = useGetData(
    'hotel-counts',
    'api/hotels/hotel-counts',
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );
  
  const logoutHandler = () => {
    // removeSession();
    // dispatch(logout()).then(() => {
    //   message.success('Logout Successfully');

    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // });
  };
  useEffect(() => {
    const fetchLinks = () => {
      // if (isMobileOrTablet()) {
      //   dispatch(fetchMobileNavLinks());
      //   dispatch(fetchHotelsCount());
      // } else {
      //   dispatch(fetchDesktopNavLinks());
      //   dispatch(fetchHotelsCount());
      //   dispatch(fetchMobileNavLinks());
      // }
    };

    // fetchLinks();

    const handleResize = () => {
      const mobile = isMobileOrTablet();
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        // fetchLinks();
      }
    };

    // dispatch(fetchPapoularHotels());

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const links = isMobileOrTablet() ? mobileNavLinks : desktopNavLinks;
  const handleLinkClick = link => {
    setPopoverVisible(false);
    setMobileMenuOpen(false);
    if (link.link && link.link.includes('LandingPageId')) {
      const payload = { id: link?.id, destination: 'landingpages' };
      if (payload?.id && !!payload.destination) {
        // dispatch(fetchFiltersDestination(payload)).then(() => {
        router.push(`/Lijst/${link.title?.replaceAll(' ', '-')}`);
        // });
      }
    } else {
      router.push(link.link);
    }
  };

  useEffect(() => {
    if (pathName === '/favorite') {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [pathName]);

  const handleFavorite = () => {
    router.push('/favorite');
  };

  const handleDestinationClick = () => {
    setIsDrawerVisible(true);
    setMobileMenuOpen(false);
  };
  const handleThemaClick = () => {
    setIsDrawerVisibleThema(true);
    setMobileMenuOpen(false);
  };
  const redirectLogin = () => {
    setModal({ isOpen: true, type: 'login' });
    // localStorage.setItem('formState', 'false');
  };
  // const emailData = JSON.parse(localStorage.getItem('formDatamail'));

  const openWhatsAppChat = () => {
    const widget = document.querySelector('#chat_box');
    alert(widget);
    widget.click();
  };
  const handleRedirectToHome = () => {
    if (window.location.pathname === '/booking') {
      sessionStorage.setItem('redirectedFromBooking', 'true');
    }
    router.push('/');
  };
  return (
    <div id="navbar" className={styles.navbarContainer}>
      <div
        id="chat_box"
        className="elfsight-app-9cd4fea5-6de6-4331-86bb-4ac3266720fa"
        data-elfsight-app-lazy
        style={{ display: 'none !important' }}
      ></div>

      <li
        style={{ listStyle: 'none', cursor: 'pointer' }}
        onClick={handleRedirectToHome}
        className={isBookingPage ? `${styles.imageContainerBooking}` : `${styles.imageContainer}`}
      >
        <Image src={logo} fill alt="Adotravel" className={styles.customImage} quality={100} />
      </li>

      {!isBookingPage && (
        <>
          <div className={styles.linksContainer} id="navbarLi">
            {loading ? (
              <>
                {/* Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton.Button
                    key={i}
                    active
                    className={styles.skeletonLink}
                    size='large'
                  />
                )) */}
                <LoadingStateLinks
                  pathName={pathName}
                  setPopoverVisible={setPopoverVisible}
                  setThemaPopoverVisible={setThemaPopoverVisible}
                  themaPopoverVisible={themaPopoverVisible}
                  popoverVisible={popoverVisible}
                />
              </>
            ) : (
              links
                ?.slice(0, 8)
                ?.filter(link => link.title !== "Themas"  && link.title !== 'Halal hotels' && link.title !== 'Low Budget' && link.title !== 'PREMIUM TURKIJE')
                ?.map((link, i) => {
                  const isActive = pathName === link.link || landingPage === link.id;

                  if (link.title === 'Bestemmingen') {
                    return (
                      <Popover
                        key={i}
                        content={
                          <DestinationPopover onClosePopover={() => setPopoverVisible(false)} />
                        }
                        trigger="hover"
                        placement="bottomLeft"
                        open={popoverVisible}
                        onOpenChange={visible => setPopoverVisible(visible)}
                      >
                        <a className={`${styles.link} ${isActive ? styles.active : ''}`}>
                          {link.title}
                        </a>
                      </Popover>
                    );
                  }

                  if (link.title === 'Thema') {
                    return (
                      <Popover
                        key={i}
                        content={
                          <div className={styles.dropDownList}>
                            <Link
                              href="/Lijst/Adult-only-Turkije"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Adult only Turkije
                            </Link>

                            <Link
                              href="/Lijst/XL-gezin"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              XL gezin
                            </Link>
                            <Link
                              href="/Lijst/Kleinschalige-resorts"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Kleinschalige resort
                            </Link>
                            <Link
                              href="/Lijst/Halal-hotels"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Halal hotels
                            </Link>
                            <Link
                              href="/Lijst/Nieuwe-hotels-Turkije"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Nieuw hotel
                            </Link>
                            <Link
                              href="/Lijst/SWIM-UP-kamers-Turkije"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Swimup kamers
                            </Link>
                            <Link
                              href="/Lijst/Low-Budget"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              Low Budget
                            </Link>
                            <Link
                              href="/Lijst/Premium-Turkije"
                              onClick={() => setThemaPopoverVisible(false)}
                            >
                              PREMIUM TURKIJE
                            </Link>
                          </div>
                        }
                        trigger="hover"
                        placement="bottomLeft"
                        open={themaPopoverVisible}
                        onOpenChange={visible => setThemaPopoverVisible(visible)}
                      >
                        <a className={`${styles.link} ${isActive ? styles.active : ''}`}>
                          {link.title}
                        </a>
                      </Popover>
                    );
                  }
                  return (
                    <Link
                      href={link.id ? `/Lijst/${link.title?.replaceAll(' ', '-')}` : link.link}
                      key={i}
                      className={`${styles.link} ${isActive ? styles.active : ''}`}
                      onClick={() => handleLinkClick(link)}
                    >
                      {link.title}
                    </Link>
                  );
                })
            )}
          </div>
        </>
      )}

      <div className={styles.rightLinksContainer} id="navbarLis">
        {!isBookingPage && (
          <>
            <div
              className={`${styles.rightIcon} ${styles.searchIcon}`}
              onClick={() => setOpenSearchModal(!openSearchModal)}
            >
              <div className={`sm-d-none ${styles.rightIcon}`}>
                <Image src={Search} width={20} height={20} alt="Search" className={styles.icon} />
                <span className={styles.text}>Search</span>
              </div>
            </div>
            <div>
              <div className={`${styles.rightIcon}`}>
                <a
                  href="https://wa.me/message/KG7H5JXPXJUGH1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2>
                    {' '}
                    <FaWhatsapp size={23} style={{ color: 'green', marginTop: '10px' }} />
                  </h2>
                </a>
              </div>
            </div>

            <div className={styles.contactIcon} onClick={() => setOpenNewsletterModal(true)}>
              <div className={`${styles.rightIcon}`}>
                <Image src={News} width={20} height={20} alt="Newsletter" className={styles.icon} />
                <span className={`${styles.text}`}>Nieuwsbrief' </span>
              </div>
            </div>
            <Link className={styles.contactIcon} href="/contact">
              <div className={`${styles.rightIcon}`}>
                <Image
                  src={Contact}
                  width={20}
                  height={20}
                  alt="Favourite"
                  className={styles.icon}
                />
                <span className={`${styles.text}`}>Contact</span>
              </div>
            </Link>

            {isLoggedIn && (
              <Tooltip title={<span>Favourite Hotels</span>}>
                <div className={`${styles.rightIcon} ${styles.favoriteIcon}`}>
                  <Image
                    src={favorite ? FavoriteFilled : Favourite}
                    width={20}
                    height={20}
                    alt="Favourite"
                    className={styles.icon}
                    onClick={handleFavorite}
                  />
                  <span className={styles.text}>Favourite</span>
                </div>
              </Tooltip>
            )}
          </>
        )}

        {!isLoggedIn ? (
          <div
            className={styles.profileIconContainer}
            style={{ display: 'flex' }}
            onClick={() => {
              setModal({ isOpen: true, type: 'login' });
              // localStorage.setItem('formState', 'false');
            }}
          >
            <div className={styles.rightIcon}>
              <Image src={NavUser} width={20} height={20} alt="NavUser" className={styles.icon} />
              <span className={`${styles.text}`}>Login</span>
            </div>
            <span className={`${styles.text} ${styles.showTextLogin}`}>Login</span>
          </div>
        ) : (
          <div className={styles.profileIconContainer}>
            {/* <div className={`${styles.rightIcon} ${styles.profileIcon}`}> */}
            <div className={`${styles.rightIcon}`}>
              <Image src={NavUser} width={20} height={20} alt="Favourite" className={styles.icon} />
              <span className={styles.text}>Profile</span>
            </div>
            <span className={`${styles.text} ${styles.showText}`}>Profile</span>
            {/* </div> */}
            <div className={styles.dropDownOptions}>
              <Card className="card" title="" bordered={true}>
                <a
                  href={`https://admin.adotravel.nl/ConnectExternal/Index?token=${session?.data?.userName?.replaceAll(
                    '+',
                    '%2B'
                  )}&secToken=${session?.data?.secondaryToken}`}
                  target="_blank"
                >
                  <button
                    // onClick={() => {
                    //   router.push(
                    //     `https://admin.adotravel.nl/ConnectExternal/Index?token=${emailData.username?.replaceAll(
                    //       '+',
                    //       '%2B'
                    //     )}&secToken=${session?.data?.secondaryToken}`
                    //   );
                    // }}
                    className={`${styles.logoutBtn} ${styles.link}`}
                  >
                    Account
                  </button>
                </a>
                <form action={logoutHandler}>
                  <button type="submit" className={`${styles.logoutBtn} ${styles.link}`}>
                    Logout
                  </button>
                </form>
              </Card>
            </div>
          </div>
        )}
        {/* <div className={styles.rightIcon} onClick={() => openWhatsAppChat()}>
          <Image
            src={Message}
            width={20}
            height={20}
            alt='chatIcon'
            className={styles.icon}
            disabled={!isLoaded} 
          />
          <span className={styles.text}>Chat</span>
        </div> */}

        <div className={`${styles.contactIcon} ${styles.mobOptions}`}>
          <div className={styles.rightIcon} onClick={() => setMobileMenuOpen(prev => !prev)}>
            <GiHamburgerMenu className={styles.icon} />
            <span className={styles.text}>Menu</span>
          </div>

          {mobileMenuOpen && (
            <div className={styles.dropDownOptionsMob}>
              <Card title="" bordered={true}>
                <div className={styles.linksMobContainer}>
                  {mobileNavLinks?.map((link, i) => {
                    if (link.title === 'Bestemmingen') {
                      return (
                        <a
                          key={i}
                          className={`${styles.link} ${pathName === link.link && styles.active}`}
                          onClick={handleDestinationClick}
                        >
                          <span className="flex items-center">
                            {link.title} &nbsp;
                            <Image
                              src={Arrow}
                              width={20}
                              height={20}
                              alt="Destination"
                              className={[styles.icon, styles.iconArrow].join(' ')}
                            />
                          </span>
                        </a>
                      );
                    }
                    if (link.title === 'Thema') {
                      return (
                        <a
                          key={i}
                          className={`${styles.link} ${pathName === link.link && styles.active}`}
                          onClick={handleThemaClick}
                        >
                          <span className="flex items-center">
                            {link.title} &nbsp;
                            <Image
                              src={Arrow}
                              width={20}
                              height={20}
                              alt="Thema"
                              className={[styles.icon, styles.iconArrow].join(' ')}
                            />
                          </span>
                        </a>
                      );
                    }

                    if (link.id) {
                      return <></>;
                    }
                    return !isLoggedIn && link.title === 'Favorites' ? (
                      <React.Fragment></React.Fragment>
                    ) : (
                      <Link
                        key={i}
                        href={link.link}
                        className={`${styles.link} ${pathName === link.link && styles.active}`}
                        onClick={() => handleLinkClick(link)}
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact/veelgestelde-vragen"
                    className={`${styles.link} ${pathName === '/contact/veelgestelde-vragen' && styles.active}`}
                    onClick={() => handleLinkClick("/contact/veelgestelde-vragen")}
                  >
                    Veelgestelde vragen
                  </Link>
                  <Link
                    href="/OverOns"
                    className={`${styles.link} ${pathName === '/OverOns' && styles.active}`}
                    onClick={() => handleLinkClick("/OverOns")}
                  >
                    Over ons
                  </Link>
                  <Link
                    href="/contact"
                    className={`${styles.link} ${pathName === '/contact' && styles.active}`}
                    onClick={() => handleLinkClick("/contact")}
                  >
                    Contact
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Modal
        centered
        open={isDrawerVisible}
        onCancel={() => setIsDrawerVisible(false)}
        width={1000}
        footer={null}
        closable={true}
        className={styles.modalCotainer}
      >
        <div>Loading...</div>
        {/* <DestinationPopover onClosePopover={() => setIsDrawerVisible(false)} /> */}
      </Modal>
      <Modal
        centered
        open={isDrawerVisibleThema}
        onCancel={() => setIsDrawerVisibleThema(false)}
        width={1000}
        height={1000}
        footer={null}
        closable={true}
        className={styles.modalCotainer}
      >
        <div className={styles.dropDownList}>
          <h2>THEMA</h2>
          <hr />
          <Link href={`/Lijst/Adult-only-Turkije`} onClick={() => setIsDrawerVisibleThema(false)}>
            Adult only Turkije
          </Link>

          <Link href="/Lijst/XL-gezin" onClick={() => setIsDrawerVisibleThema(false)}>
            XL gezin
          </Link>
          <Link href="/Lijst/Kleinschalige-resorts" onClick={() => setIsDrawerVisibleThema(false)}>
            Kleinschalige resort
          </Link>
          <Link href="/Lijst/Halal-hotels" onClick={() => setIsDrawerVisibleThema(false)}>
            Halal hotels
          </Link>
          <Link href="/Lijst/Nieuwe-hotels-Turkije" onClick={() => setIsDrawerVisibleThema(false)}>
            Nieuwe hotels
          </Link>
          <Link href="/Lijst/SWIM-UP-kamers-Turkije" onClick={() => setIsDrawerVisibleThema(false)}>
            Swim up hotels
          </Link>
          <Link href="/Lijst/Low-Budget" onClick={() => setIsDrawerVisibleThema(false)}>
            Low Budget
          </Link>
          <Link href="/Lijst/Zomer-Turkije-2025" onClick={() => setIsDrawerVisibleThema(false)}>
            Zomer Turkije 2025
          </Link>
          <Link
            href="/Lijst/Premium-Turkije"
            onClick={() => setIsDrawerVisibleThema(false)}
          >
            PREMIUM TURKIJE
          </Link>
        </div>
      </Modal>

      {/* {openSearchModal && <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />}

      <AuthModal modal={modal} setModal={setModal} />
      <NewsletterModal open={openNewsletterModal} setOpen={setOpenNewsletterModal} /> */}
    </div>
  );
};

export default Navbar;

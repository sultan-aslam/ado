import { Popover } from 'antd';
import React from 'react';
import Link from 'next/link';

import styles from './navbar.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
// import DestinationPopover from '../destinationPage/destinationPopover/DestinationPopover';

const links = [
  { title: 'Home', link: '/' },
  { title: 'Bestemmingen', link: '/destination' },
  { title: 'Thema', link: '/thema' },
  { title: 'Adult Only Turkije', link: '/Lijst/Adult-Only-Turkije' },
  { title: 'Zomer Turkije 2025', link: '/Lijst/Black-Friday-Sale' },
  { title: 'Hotel Only Turkije', link: '/Lijst/Hotel-Only-Turkije' },
];
const LoadingStateLinks = ({
  setThemaPopoverVisible,
  themaPopoverVisible,
  popoverVisible,
  setPopoverVisible,
}) => {
  const searchParams = useSearchParams();
  const landingPage = searchParams.get('id');
  const pathName = usePathname();

  return links.map((link, i) => {
    const isActive = pathName === link.link || landingPage === link.id;

    if (link.title === 'Bestemmingen') {
      return (
        <Popover
          key={i}
          content={<div>Loading...</div>}
          // content={<DestinationPopover onClosePopover={() => setPopoverVisible(false)} />}
          trigger="hover"
          placement="bottomLeft"
          open={popoverVisible}
          onOpenChange={visible => setPopoverVisible(visible)}
        >
          <a className={`${styles.link} ${isActive ? styles.active : ''}`}>{link.title}</a>
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
                href={`/Lijst/Adult-only-Turkije`}
                onClick={() => setThemaPopoverVisible(false)}
              >
                Adult only Turkije
              </Link>

              <Link href={`/Lijst/XL-gezin`} onClick={() => setThemaPopoverVisible(false)}>
                XL gezin
              </Link>
              <Link
                href={`/Lijst/Kleinschalige-resorts`}
                onClick={() => setThemaPopoverVisible(false)}
              >
                Kleinschalige resort
              </Link>
              <Link href={`/Lijst/Halal-hotels`} onClick={() => setThemaPopoverVisible(false)}>
                Halal hotels
              </Link>
              <Link
                href={`/Lijst/Nieuwe-hotels-Turkije`}
                onClick={() => setThemaPopoverVisible(false)}
              >
                Nieuw hotels
              </Link>
              <Link
                href={`/Lijst/SWIM-UP-kamers-Turkije`}
                onClick={() => setThemaPopoverVisible(false)}
              >
                Swimup kamers
              </Link>
              <Link href={`/Lijst/Low-Budget`} onClick={() => setThemaPopoverVisible(false)}>
                Low Budget
              </Link>
            </div>
          }
          trigger="hover"
          placement="bottomLeft"
          open={themaPopoverVisible}
          onOpenChange={visible => setThemaPopoverVisible(visible)}
        >
          <a className={`${styles.link} ${isActive ? styles.active : ''}`}>{link.title}</a>
        </Popover>
      );
    }

    return (
      <Link href={link.link} key={i} className={`${styles.link} ${isActive ? styles.active : ''}`}>
        {link.title}
      </Link>
    );
  });
};

export default LoadingStateLinks;

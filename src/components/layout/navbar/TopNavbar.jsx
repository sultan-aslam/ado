'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './topNavbar.module.css';
import { IoIosStar } from 'react-icons/io';
import { Rate, Tooltip } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import paymentNew from '../../../../public/images/paymentNew.svg';
import tgr from '../../../../public/images/tgr.png';

// import NewsletterModal from '../newsletterModal/NewsLetterModal';
import Starss from '../../../../public/images/Starss.svg';
import { FaWhatsapp } from 'react-icons/fa';

const TopNavbar = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [openNewsletterModal, setOpenNewsletterModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div className={styles.topNavbarContainer} id='mainHeader' >
      
      <div className={styles.ratingContainer}>
       <a href="https://nl.trustpilot.com/review/www.adotravel.nl" target='_blank'>
       <IoIosStar size={'16'} />{' '}
        <span className={styles.text}>Trustpilot</span>
        {/* <Rate
          allowHalf
          disabled
          defaultValue={4.5}
          className={styles.rating}
          character={<IoIosStar />}
          size={"16"} 
        /> */}
        <Image
          src={Starss}
          style={{ marginTop: '3px', marginLeft: '4px' }}
          alt='Rating Stars'
        />
       </a>
      </div>
      <div className={styles.payments}>
        <a href="https://tgcr.nl/Member?s=adotravel&submit=ZoekenLeden" target='_blank'>
          <Image
            src={tgr}
            width={50}
            height={25}
            alt='tgr'
            style={{ marginRight: "13px" }}
          // className='objectCover'
          />
        </a>
        <Image
          src={paymentNew}
          width={170}
          height={25}
          alt='allPayments'
          className='objectCover'
        />
      </div>
      <div className={styles.links}>
        <Link
          href='#'
          className={styles.link}
          onClick={() => setOpenNewsletterModal(true)}
        >
          Nieuwsbrief
        </Link>
        <Link href='/vacatures' className={styles.link}>
          Vacatures
        </Link>

        <Link href='/contact' className={styles.link}>
          Contact
        </Link>
        <Link href='#' className={styles.link}
          onClick={() => setShowOverlay(true)}
        >
          <Tooltip
            title={
              <span>
                Vandaag  10:00 tot 16:00
              </span>
            }
          >
            WhatsApp Contact
          </Tooltip>
        </Link>

        {/* Overlay Modal */}
        {showOverlay && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent} ref={modalRef} onClick={(e) => e.stopPropagation()}>
              <a href="https://wa.me/message/KG7H5JXPXJUGH1" target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }} >
                <h2 style={{ textDecoration: "underline", cursor: "pointer" }}>Contact via WhatsApp</h2>
                <a href="https://wa.me/message/KG7H5JXPXJUGH1" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={35} style={{ color: "green", marginTop: "1px" }} /></a>
              </a>
              <p>Vragen? Stuur ons via <a href="https://wa.me/message/KG7H5JXPXJUGH1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>WhatsApp</a> een bericht en we koppelen z.s.m. terug</p>
              <ul>
                <li>Ma 10:00 – 16:00</li>
                <li>Di 10:00 – 16:00</li>
                <li>Wo 10:00 – 16:00</li>
                <li>Do 10:00 – 16:00</li>
                <li>Vr 10:00 – 16:00</li>
                <li>Za-Zo Gesloten</li>
              </ul>
              <button className={styles.closeButton} onClick={() => setShowOverlay(false)}>Venster sluiten.</button>
            </div>
          </div>
        )}



        <Link href='/contact/veelgestelde-vragen' className={styles.link}>
          Veelgestelde vragen
        </Link>
      </div>
      {/* <NewsletterModal
        open={openNewsletterModal}
        setOpen={setOpenNewsletterModal}
      /> */}
    </div>
  );
};

export default TopNavbar;

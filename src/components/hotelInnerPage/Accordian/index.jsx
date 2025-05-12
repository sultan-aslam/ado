'use client';

import React from 'react';
import { Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './accordian.module.css';

const Accordion = ({ bookingScreen, name, country, data }) => {
  const items = data?.slice(0, 6).map(item => ({
    key: item?.id?.toString(),
    label: item?.question,
    children: <p>{item?.answer}</p>
  }));

  return (
    <div className={styles.accordion}>
      <div className={styles.container}>
        <div
          className={
            bookingScreen ? `${styles.bookingSection}` : `${styles.leftSection}`
          }
        >
          <div className={styles.leftSectionContainer}>
            <div className={styles.content}>
              FAQs about {name} Hotel, {country}.
            </div>
            <div className={styles.whatsappChat}>
              Staat jouw vraag er niet bij? Stel je vraag aan ons.{' '}
              <a
                href="https://api.whatsapp.com/message/KG7H5JXPXJUGH1"
                target="_blank"
                style={{ textDecoration: 'underline' }}
              >
                Whatsapp chat
              </a>
            </div>
          </div>
        </div>
        <Collapse
          className={
            bookingScreen
              ? `${styles.rightSectionBooking}`
              : `${styles.rightSection}`
          }
          accordion
          items={items}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
        />
      </div>
    </div>
  );
};

export default Accordion;

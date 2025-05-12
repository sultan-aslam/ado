'use client';
import React from 'react';
import styles from './categories.module.css';
import Categories1 from '../../../../public/images/Categories1.svg';
import Categories3 from '../../../../public/images/Categories3.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const router = useRouter();
  const categoriesList = [
    {
      id: 1,
      label: 'All Inclusive Vliegvakanties Turkije',
      img: Categories3,
      img2: Categories1,
      subLabel: 'Vlucht + verblijf + transfers inbegrepen',
      link: '/Lijst/Zomer-Turkije-2025'
    },
    {
      id: 2,
      label: 'Hotel - only Turkije ',
      img: Categories1,
      subLabel: 'Los hotelverblijf boeken (zonder vlucht)',
      link: '/Lijst/Hotel-only-turkije'
    },
    {
      id: 3,
      label: 'Vliegtickets',
      img: Categories3,
      subLabel: 'Boek de voordeligste tickets op ',
      linkText: 'Ticketvoordeel.nl',
      link: 'https://ticketvoordeel.nl/vliegtickets'
    }
  ];
  const handleClick = id => {
    router.push(id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={`${styles.inclusive} font-reenie`}>Soort Vakantie</div>
        <div className={styles.heading}>
          Welke vakanties boek je bij adotravel?
        </div>
        <div className={styles.subHeading}>
          {`Een goedkope all inclusive vakantie naar o.a. Antalya, Alanya, Side, Kemer, Belek, Kusadasi, Bodrum, Marmaris, Fethiye en Didim boekt u bij adotravel. U boekt bij ons met de laagste prijsgarantie.`}
        </div>
      </div>

      <div className={styles.categoriesContainer}>
        {categoriesList.map(categories => (
          <div key={categories.id} className={styles.categoriesItems}>
            <div
              className={styles.categoriesImageContainer}
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(categories.link)}
            >
              <div>
                <Image
                  src={categories.img}
                  width={100}
                  alt={categories.label}
                  className={styles.categoriesImage}
                />
              </div>
              {categories.img2 && (
                <>
                  <div style={{ marginTop: '40px', fontSize: '18px' }}>+</div>
                  <div>
                    <Image
                      width={100}
                      src={categories.img2}
                      alt={categories.label}
                      className={styles.categoriesImage}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={styles.textAlign}>
              <a
                href={categories.link}
                target={categories.id === 3 ? '_blank' : '_self'}
                rel={categories.id === 3 ? 'noopener noreferrer' : ''}
                className={styles.categoriesLabel}
              >
                {categories.label}
              </a>
              <div className={styles.categoriesSubLabel}>
                {categories.subLabel}{' '}
                <a
                  href='https://www.Ticketvoordeel.nl'
                  target='_blank'
                  style={{ textDecoration: 'underline' }}
                >
                  {categories?.linkText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

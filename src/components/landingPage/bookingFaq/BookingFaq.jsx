import React from 'react';
import styles from './bookingFaq.module.css';
import { BsPatchCheckFill } from 'react-icons/bs';

const BookingFaq = () => {
  const list = [
    { id: 1, label: 'Al 21 jaar uw reisspecialist' },
    { id: 2, label: 'Altijd de goedkoopste DEALS' },
    { id: 3, label: 'Ledenkorting € 15' },
    { id: 4, label: 'Beste service (5x Reisgraag Consumenten Award gewonnen)' },
    { id: 5, label: 'Veilig op vakantie (Lid garantiefonds TGCR)' },
    { id: 6, label: '4 dagen bedenktijd' },
    { id: 7, label: 'Slechts 25% aanbetalen' }
  ];

  return (
    <>
      <div className={styles.heading}>Waarom boeken bij adotravel?</div>
      <div className={styles.listContainer}>
        {list.map((item) => (
          <div key={item.id} className={styles.item}>
            <div>
              <BsPatchCheckFill className={styles.icon} />
            </div>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingFaq;

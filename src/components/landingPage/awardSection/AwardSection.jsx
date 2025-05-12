'use client';
import React from 'react';
import styles from './awardSection.module.css';
import Award2022 from '../../../../public/images/Untitled-3.png';
import Award2 from '../../../../public/images/Award2.png';
import Award3 from '../../../../public/images/Award3.png';
import Award4 from '../../../../public/images/Award4.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AwardSection = () => {
  const router = useRouter();
  const awardList = [
    {
      id: 1,
      label: '6x winnaar',
      img: Award2022,
      subLabel: 'Beste Reisgezelschap in de categorie strandvakanties',
      url: '/contact/veelgestelde-vragen'
    },
    {
      id: 2,
      label: 'Laagste prijsgarantie',
      img: Award2,
      subLabel: 'U boekt bij ons altijd de beste deals.',
      url: '/contact/veelgestelde-vragen'
    },
    {
      id: 3,
      label: 'Veilig boeken & betalen',
      img: Award3,
      subLabel:
        'Wij zijn lid van de garantiefonds TGCR. U boekt dus veilig bij adotravel',
      url: '/contact/veelgestelde-vragen'
    },
    {
      id: 4,
      label: '4 dgn bedenktijd',
      img: Award4,
      subLabel:
        'Kosteloos annuleren of wijzigen binnen 4 dagen. NIET geldig mits u binnen 3 weken vertrekt. 1 x gebruik maken van de bedenktijd',
      url: '/contact/veelgestelde-vragen'
    }
  ];
  const handleclick = url => {
    router.push(url);
  };
  return (
    <div>
      <div className={`${styles.heading} font-reenie`}>
        6 x Winnaar Reisgraag Consumenten AWARD
      </div>
      <div className={styles.subHeading}>
        Al ruim 21 jaar uw reisspecialist{' '}
      </div>
      <div className={styles.awardContainer} style={{ cursor: 'pointer' }}>
        {awardList.map(award => (
          <div
            key={award.id}
            className={styles.awardItems}
            onClick={() => handleclick(award?.url)}
          >
            <div className={styles.awardImageContainer}>
              <Image
                src={award.img}
                alt={award.label}
                className={styles.awardImage}
                fill
                placeholder='blur'
                sizes='(max-width: 600px) 100vw, 
                       (max-width: 768px) 50vw, 
                       130px'
              />
            </div>
            <div>
              <div className={styles.awardLabel}>{award.label}</div>
              <div className={styles.awardSubLabel}>{award.subLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardSection;

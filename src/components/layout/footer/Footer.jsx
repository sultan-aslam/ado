'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PiPhoneCallFill } from 'react-icons/pi';
import WhatsAppChannels from '../../../../public/whatsappchannelicon.svg';
import styles from './footer.module.css';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import tgr from '../../../../public/images/tgr.png';

const Footer = () => {
  const router = useRouter();

  const bestemmingenData = [
    { id: 6, name: 'Turkije', category: 'countries', url: '/Turkije' },
    {
      id: 2,
      name: 'TURKSE RIVIERA',
      category: 'regions',
      url: '/Turkije/TURKSE-RIVIERA'
    },
    {
      id: 8,
      name: 'Belek',
      category: 'places',
      url: '/Turkije/TURKSE-RIVIERA/Belek'
    },
    {
      id: 11,
      name: 'Antalya',
      category: 'places',
      url: '/Turkije/TURKSE-RIVIERA/Antalya'
    },
    {
      id: 12,
      name: 'Kemer',
      category: 'places',
      url: '/Turkije/TURKSE-RIVIERA/Kemer'
    },
    {
      id: 14,
      name: 'Side',
      category: 'places',
      url: '/Turkije/TURKSE-RIVIERA/Side'
    },
    {
      id: 10,
      name: 'Alanya',
      category: 'places',
      url: '/Turkije/TURKSE-RIVIERA/Alanya'
    },
    {
      id: 13,
      name: 'Kusadasi',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Kusadasi'
    },
    {
      id: 15,
      name: 'Bodrum',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Bodrum'
    },
    {
      id: 16,
      name: 'Cesme',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Cesme'
    },
    {
      id: 17,
      name: 'Marmaris',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Marmaris'
    },
    {
      id: 18,
      name: 'Didim',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Didim'
    },
    {
      id: 19,
      name: 'Fethiye',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Fethiye'
    },
    {
      id: 20,
      name: 'Datca',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Datca'
    },
    {
      id: 21,
      name: 'Sarigerme',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Sarigerme'
    },
    {
      id: 23,
      name: 'Seferihisar',
      category: 'places',
      url: '/Turkije/EGEÏSCHE-KUST/Seferihisar'
    },
    {
      id: 3,
      name: 'Egeische Kust',
      category: 'regions',
      url: '/Turkije/EGEÏSCHE-KUST'
    }
  ];

  const soortVakantieData = [
    { id: 9, name: 'XL Gezin', category: 'landingpage' },
    {
      id: 29,
      name: 'Turkije Meivakantie All Inclusive',
      category: 'landingpage'
    },
    { id: 31, name: 'Aquapark resorts Turkije', category: 'landingpage' },
    { id: 32, name: 'Kleinschalige resorts', category: 'landingpage' },
    { id: 36, name: 'LASTMINUTES TURKIJE', category: 'landingpage' },
    { id: 37, name: 'Halal Hotels', category: 'landingpage' },
    { id: 38, name: 'Adult Only Turkije', category: 'landingpage' },
    { id: 39, name: 'Islamitische Hotels Turkije', category: 'landingpage' },
    { id: 41, name: 'Delphin Keten Turkije', category: 'landingpage' },
    { id: 42, name: 'Crystal Hotels Turkije', category: 'landingpage' },
    { id: 43, name: 'Royal Ketens Turkije', category: 'landingpage' },
    { id: 44, name: 'Nieuwe hotels Turkije', category: 'landingpage' },
    { id: 46, name: 'Eftalia Resorts Turkije', category: 'landingpage' },
    { id: 47, name: 'SWIM UP kamers Turkije', category: 'landingpage' },
    { id: 64, name: 'Zomer Turkije 2025', category: 'landingpage' }
  ];

  const handleLinkClick = link => {
    if (
      link.category === 'countries' ||
      link.category === 'regions' ||
      link.category === 'places'
    ) {
      router.push(link.url);
    } else if (link.category === 'landingpage') {
      router.push(`/Lijst/${link.name?.replaceAll(' ', '-')}`);
    } else {
    }
  };
  return (
    <div className='container' id='footer'>
      <div className={styles.footerContainer}>
        <div className={styles.leftLinks}>
          <div className={styles.singleRow}>
            <h4 className={styles.linkHeading}>Snel naar:</h4>
            <Link href='/Visum-Turkije'>
              <div className={styles.links}>Visum Turkije</div>
            </Link>
            <Link href={'/'}>
              <div className={styles.links}>Home</div>
            </Link>
            <Link href='/OverOns'>
              <div className={styles.links}>Over ons</div>
            </Link>
            <Link href={'/contact'}>
              <div className={styles.links}>Contact</div>
            </Link>
            <Link href={'/vacatures'}>
              <div className={styles.links}>Careers</div>
            </Link>
            <Link href='/contact/veelgestelde-vragen'>
              <div className={styles.links}>Veelgestelde vragen</div>
            </Link>
            <Link href='/precontractuele-reisinformatie'>
              <div className={styles.links}>
                Precontractuele (reis)informatie
              </div>
            </Link>
            <Link href='/algemene-voorwaarden'>
              <div className={styles.links}>Algemene voorwaarden</div>
            </Link>
            <Link href='/Disclaimer'>
              <div className={styles.links}>Disclaimer</div>
            </Link>
            <Link href='/Privacy-Verklaring'>
              <div className={styles.links}>Privacy Verklaring</div>
            </Link>
            <Link href='/vacatures'>
              <div className={styles.links}>Vacatures</div>
            </Link>
          </div>

          <div className={styles.doubleRow}>
            <h4 className={styles.linkHeading}>Soort vakantie:</h4>
            <div className={styles.both}>
              <div className={styles.bothLinks}>
                {soortVakantieData.map((link, i) => (
                  <div
                    className={styles.links}
                    key={i}
                    onClick={() => handleLinkClick(link)}
                  >
                    {link.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.singleRow}>
            <h4 className={styles.linkHeading}>Bestemmingen</h4>
            {bestemmingenData?.map((link, i) => (
              <div
                className={styles.links}
                key={i}
                onClick={() => handleLinkClick(link)}
              >
                {link.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightInfo}>
          <h4 className={styles.linkHeading}>
            All Inclusive vakanties naar Turkije?
          </h4>
          <div className={styles.footerDescription}>
            Een goedkope all inclusive vakantie naar Antalya, Alanya, Side,
            Kemer, Belek, Kusadasi, Bodrum, Marmaris en Didim boekt u bij
            adotravel. U boekt bij ons met de laagste prijsgarantie.
          </div>

          <div className={styles.contactContainer}>
            <div className={styles.phone}>
              <PiPhoneCallFill /> 0031-70-44 527 44
            </div>
            <div className={styles.email}>info@adotravel.nl</div>
            <div className={styles.email}>adotravel B.V. Nederland</div>
            <div className={styles.socialIcons}>
              <a
                href='https://tgcr.nl/Member?s=adotravel&submit=ZoekenLeden'
                target='_blank'
              >
                <Image
                  src={tgr}
                  width={50}
                  height={25}
                  alt='tgr'
                  style={{ marginRight: '13px' }}
                  // className='objectCover'
                />
              </a>
              <a
                href='https://www.youtube.com/channel/UC5OvwhKxTmtyUuPZPpUzPgw'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube />
              </a>
              <a
                href='https://www.instagram.com/adotravelnl/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram />
              </a>
              <a
                href='https://www.facebook.com/adotravelnl/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebook />
              </a>
              <a
                href='https://wa.me/message/KG7H5JXPXJUGH1'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaWhatsapp size={35} style={{ color: 'green' }} />
              </a>
              <a
                href='https://whatsapp.com/channel/0029VaxlRPY6LwHeqqnx6i3c'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  width={35}
                  src={WhatsAppChannels}
                  alt='WhatsAppChannels Icon'
                  style={{ objectFit: 'cover', fill: 'green' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

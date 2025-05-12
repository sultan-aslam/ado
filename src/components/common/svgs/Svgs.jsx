import Image from 'next/image';
import AirPort from '../../../../public/images/AirPort.svg';
import Calender from '../../../../public/images/Calender.svg';
import CalenderDate from '../../../../public/images/CalenderDate.svg';
import CheckMarkAuth from '../../../../public/images/CheckMarkAuth.svg';
import Clock from '../../../../public/images/Clock.svg';
import CollapseClose from '../../../../public/images/CollapseClose.svg';
import CollapseOpen from '../../../../public/images/CollapseOpen.svg';
import CrossIconTag from '../../../../public/images/CrossIconTag.svg';
import DrawerUpload from '../../../../public/images/DrawerUpload.svg';
import Dropdown from '../../../../public/images/Dropdown.svg';
import EmailShareIcon from '../../../../public/images/EmailShareIcon.svg';
import FacebookShareIcon from '../../../../public/images/FacebookShareIcon.svg';
import FavouriteGray from '../../../../public/images/FavouriteGray.svg';
import HalfPension from '../../../../public/images/HalfPension.svg';
import InstagramShareIcon from '../../../../public/images/InstagramShareIcon.svg';
import LeftArrowBarChart from '../../../../public/images/LeftArrowBarChart.svg';
import LinkUpward from '../../../../public/images/LinkUpward.svg';
import Logies from '../../../../public/images/Logies.svg';
import Minus from '../../../../public/images/Minus.svg';
import NavUser from '../../../../public/images/NavUser.svg';
import Parking from '../../../../public/images/Parking.svg';
import Person from '../../../../public/images/Person.svg';
import PlaneDestination from '../../../../public/images/PlaneDestination.svg';
import Plus from '../../../../public/images/Plus.svg';
import RightArrowBarChart from '../../../../public/images/RightArrowBarChart.svg';
import WhatsappShareIcon from '../../../../public/images/WhatsappShareIcon.svg';
import MailIcon from '../../../../public/images/MailIcon.svg';
import ContactIcon from '../../../../public/images/ContactIcon.svg';
import ChipCrossIcon from '../../../../public/images/chipCross.svg';
import ASR from '../../../../public/images/insurance_final.png';
import DownloadIns from '../../../../public/images/dow.svg';
import styles from './svgs.module.css';

export const MinusSvg = () => (
  <div className={styles.minusContainer}>
    <Image src={Minus} width={10} height={10} alt='Minus' />
  </div>
);

export const PlusSvg = () => (
  <div className={styles.plusContainer}>
    <Image src={Plus} width={10} height={10} alt='Plus' />
  </div>
);

export const PersonsSvg = () => (
  <div className={styles.commonStyle}>
    <Image src={Person} width={20} height={20} alt='Person' />
  </div>
);

export const DropdownSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={Dropdown} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const ClockSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={Clock} width={24} height={24} alt='svgIcons' />
    </div>
  );
};

export const UpArrowSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={LinkUpward} width={24} height={24} alt='svgIcons' />
    </div>
  );
};

export const NavUserSvg = () => {
  return (
    <div className={''} style={{ marginTop: '5px' }}>
      <Image src={NavUser} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const FacebookShareSvg = () => {
  return (
    <div className={''}>
      <Image src={FacebookShareIcon} width={16} height={16} alt='svgIcons' />
    </div>
  );
};

export const InstagramShareSvg = () => {
  return (
    <div className={''}>
      <Image src={InstagramShareIcon} width={16} height={16} alt='svgIcons' />
    </div>
  );
};

export const WhatsappShareSvg = () => {
  return (
    <div className={''}>
      <Image src={WhatsappShareIcon} width={16} height={16} alt='svgIcons' />
    </div>
  );
};

export const EmailShareSvg = () => {
  return (
    <div className={''}>
      <Image src={EmailShareIcon} width={16} height={16} alt='svgIcons' />
    </div>
  );
};

export const ParkingSvg = () => {
  return (
    <div className={''}>
      <Image src={Parking} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const LogiesSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={Logies} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const AirPortSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={AirPort} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const CalenderSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={Calender} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const CheckMarkAuthSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={CheckMarkAuth} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const CrossIconTagSvg = () => {
  return (
    <div className={styles.commonStyle}>
      <Image src={CrossIconTag} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const LeftArrowBarChartSvg = ({ className, onClick }) => {
  return (
    <div className={`${styles.commonStyle} ${className}`} onClick={onClick}>
      <Image src={LeftArrowBarChart} width={30} height={30} alt='svgIcons' />
    </div>
  );
};

export const RightArrowBarChartSvg = ({ className, onClick }) => {
  return (
    <div className={`${styles.commonStyleLeft} ${className}`} onClick={onClick}>
      <Image src={RightArrowBarChart} width={30} height={30} alt='svgIcons' />
    </div>
  );
};

export const CalenderDestinationSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={CalenderDate} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const PlaneDestinationSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={PlaneDestination} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const HalfPensionSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={HalfPension} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const FavouriteGraySvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={FavouriteGray} width={30} height={30} alt='svgIcons' />
    </div>
  );
};

export const CollapseOpenSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={CollapseOpen} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const CollapseCloseSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={CollapseClose} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const UploadCVSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={DrawerUpload} alt='svgIcons' />
    </div>
  );
};

export const MailSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={MailIcon} width={22} height={22} alt='svgIcons' />
    </div>
  );
};

export const ContactSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={ContactIcon} width={22} height={22} alt='svgIcons' />
    </div>
  );
};

export const ChipCrossSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={ChipCrossIcon} width={20} height={20} alt='svgIcons' />
    </div>
  );
};

export const ASRSvg = ({ className, onClick }) => {
  const isMobile = window.innerWidth < 600;
  return (
    !isMobile ? (
      <div
        className={`${className}`}
        onClick={onClick}
      >
        <Image
          src={ASR}
          width={500}
          height={65}
          alt="ASRSvg"
        />
      </div>
    )
      : (
        <div
          className={`${className}`}
          onClick={onClick}
        >
          <Image
            src={ASR}
            width={300}
            height={55}
            alt="ASRSvg"
          />
        </div>
      )

  );
};

export const DownloadInsSvg = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <Image src={DownloadIns} width={28} height={28} alt='svgIcons' />
    </div>
  );
};

const Svgs = () => {
  return <div>Svgs</div>;
};

export default Svgs;

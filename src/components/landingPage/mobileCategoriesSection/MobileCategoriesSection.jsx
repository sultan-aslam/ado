'use client';
import { fetchFooter } from '@/store/features/footer/footerSlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Collapse, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaBed, FaChessQueen, FaMagic } from 'react-icons/fa';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoMenu, IoStar } from 'react-icons/io5';
import { MdBathtub } from 'react-icons/md';
import { PiMoneyFill } from 'react-icons/pi';
import MobileCategoryItem from '../mobileCategoryItem/MobileCategoryItem';
import styles from './mobileCategoriesSection.module.css';

const MobileCategoriesSection = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    footerData,
    loading: footerDataLoading,
    error
  } = useAppSelector(state => state.footer);

  const { landingPageDetails } = footerData ?? {};

  useEffect(() => {
    if (footerData?.length === 0) {
      dispatch(fetchFooter());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const getIconForCategory = title => {
    switch (title) {
      case 'Zomer Turkije 2024':
        return <BiSolidPlaneAlt />;
      case 'Turkije Meivakantie All Inclusive':
        return <FaChessQueen />;
      case 'Low Budget':
        return <FaMagic />;
      case 'XL Gezin':
        return <HiMiniUserGroup />;
      case 'Nieuwe hotels Turkije':
        return <FaMagic />;
      case 'PREMIUM TURKIJE':
        return <IoStar />;
      case 'Only Hotel Turkey':
        return <FaBed />;
      case 'Halal Hotels':
        return <IoMenu />;
      case 'Adult Only Turkije':
        return <MdBathtub />;
      case 'SWIM UP kamers Turkije':
        return <PiMoneyFill />;
      default:
        return <DownOutlined />;
    }
  };

  if (loading) {
    return (
      <div>
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px'
            }}
          >
            <Spin
              indicator={
                <LoadingOutlined
                  className={styles.loader}
                  style={{ fontSize: 50, marginBottom: '100px' }}
                  spin
                />
              }
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={`${styles.inclusive} font-reenie`}>Soort Vakantie</div>
      </div>
      <div className={styles.menuContainer}>
        {!loading &&
          landingPageDetails?.map(category => (
            <MobileCategoryItem
              key={category.id}
              icon={getIconForCategory(category.title)}
              title={category.title}
              id={category.id}
              setLoading={setLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default MobileCategoriesSection;

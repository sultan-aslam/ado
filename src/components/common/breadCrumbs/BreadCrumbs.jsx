'use client';
import React from 'react';
import { Breadcrumb } from 'antd';
import { RiHome2Line } from 'react-icons/ri';
import { useParams, usePathname } from 'next/navigation';
import styles from './breadCrmbs.module.css';

const BreadCrumbs = () => {
  const paths = usePathname();
  const params = useParams();

  if (paths.includes('/booking') || params?.country) {
    return null;
  }

  const pathNames = paths.split('/').filter(path => path);
  const items = [
    {
      href: '/',
      title: <RiHome2Line />
    },
    ...pathNames.map((path, index) => ({
      href: `/${pathNames.slice(0, index + 1).join('/')}`,
      title:
        path === 'vacancies'
          ? 'Careers'
          : path === 'summary'
          ? 'Boekingsaanvraag' 
          : path.replaceAll('-', ' ').toUpperCase()
    }))
  ];
  return (
    <div id='breadcrumb' >
      <Breadcrumb items={items} className={styles.title} />
    </div>
  );
};

export default BreadCrumbs;

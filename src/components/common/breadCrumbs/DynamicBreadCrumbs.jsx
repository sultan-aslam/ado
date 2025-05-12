'use client';
import React from 'react';
import { Breadcrumb } from 'antd';
import { RiHome2Line } from 'react-icons/ri';

import styles from './breadCrmbs.module.css';
import { useBreadCrumbs } from '@/hooks/useZustandStore';
import Link from 'next/link';

const DynamicBreadCrumbs = () => {
  const { links } = useBreadCrumbs();
  const items = [
    { href: '/', title: <RiHome2Line /> },
    ...links.map(({ href, title }) => ({
      title: (
        <Link key={href} href={href}>
          {title?.toUpperCase()}
        </Link>
      )
    }))
  ];

  return <Breadcrumb items={items} className={styles.title} />;
};

export default DynamicBreadCrumbs;

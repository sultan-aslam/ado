'use client';

import AntdTheme from '@/theme/AntdTheme';
import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('./MainLayout'), {
  loading: () => <div>Loading...</div>
});

export default function ClientMainLayout({ children }) {
  return <AntdTheme><MainLayout>{children}</MainLayout></AntdTheme>;
} 
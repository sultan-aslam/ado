'use client';
import { ConfigProvider } from 'antd';
import React from 'react';

const AntdTheme = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f15a24'
        },

        components: {
          Button: {
            color: '#f15a24',
            fontWeight: 500
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdTheme;

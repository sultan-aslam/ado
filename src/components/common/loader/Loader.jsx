import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loader = ({ size = 'default' }) => {

  return (
    <Spin
      size={size}
      indicator={
        <LoadingOutlined 
          className="text-white overflow-hidden" 
          spin 
        />
      }
    />
  );
};

export default Loader;

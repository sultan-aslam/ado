'use client';
import React from 'react';
import { Button } from 'antd';

const ButtonContainer = ({ size = 'default', children, ...props }) => {
  return (
    <Button size={size} {...props} type='primary'>
      {children}
    </Button>
  );
};

export default ButtonContainer;

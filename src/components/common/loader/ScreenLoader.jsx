'use client'

import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const ScreenLoader = () => {
  return (
    <div className="h-screen w-full absolute top-0 left-0 bg-gray-500/30 flex justify-center items-center overflow-hidden">
      <Spin
        indicator={
          <LoadingOutlined 
            className="text-white overflow-hidden" 
            style={{ fontSize: 56 }}
            spin 
          />
        }
      />
    </div>
  )
}

export default ScreenLoader 
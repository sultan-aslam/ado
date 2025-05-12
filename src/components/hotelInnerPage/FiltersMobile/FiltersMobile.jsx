'use client';

import React, { memo, useState } from 'react';
import { Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './filtersMobile.module.css';
import { FilterSettingIcon } from '@/components/Icons/FilterSettingIcon';
import Filters from '../Filters/Filters';

const { Panel } = Collapse;

const FiltersMobile = ({
  selection,
  onDateChange,
  onPayloadChange,
  selectedDate,
  setSelectedDate
}) => {
  const [activeKey, setActiveKey] = useState(['1']); // default to expanded

  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };

  const isFilterOpen = activeKey.includes('1');
  return (
    <Collapse
      className={styles.filter}
      accordion
      activeKey={activeKey}
      onChange={handleCollapseChange}
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
    >
      <Panel
        header={
          <div className={styles.panelHeader}>
            <FilterSettingIcon />
            Filters (5)
          </div>
        }
        key="1"
      >
        <Filters
          selection={selection}
          onDateChange={onDateChange}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onPayloadChange={onPayloadChange}
          isFilterOpen={isFilterOpen}
        />
      </Panel>
    </Collapse>
  );
};

export default memo(FiltersMobile);

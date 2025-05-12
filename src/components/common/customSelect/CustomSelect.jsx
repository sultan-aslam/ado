'use client';
import React from 'react';
import { Select } from 'antd';
import styles from './customSelect.module.css';

const CustomSelect = ({
  option,
  defaultText,
  prefixIcon,
  hotelInner,
  customStyle,
  destination,
  travelCompany,
  children,
  hotelInnerPage,
  onDropdownVisibleChange,
  value,
  ...rest
}) => {
  const handleDropdownVisibleChange = open => {
    if (onDropdownVisibleChange) {
      onDropdownVisibleChange(open);
    }
  };

  return (
    <div
      className={`${styles.selectWrapper} ${
        customStyle ? styles.customStyleWrapper : ''
      }${hotelInner ? styles.hotelInnerWrapper : ''} ${
        destination ? styles.destinationPage : ''
      }
      ${travelCompany ? styles.customTravelCompany : ''}
      `}
    >
      {prefixIcon && (
        <div
          className={`${styles.prefixIconWrapper} ${
            customStyle ? styles.customPrefixIconWrapper : ''
          } ${hotelInner ? styles.iconInnerWrapper : ''}`}
        >
          {prefixIcon}
        </div>
      )}
      <Select
        virtual={false}
        className={styles.select}
        {...rest}
        defaultValue={defaultText}
        value={value}
        // value={defaultText !== null ? defaultText : value}
        dropdownRender={hotelInnerPage ? () => null : ''}
        popupClassName={hotelInnerPage ? `${styles.hiddenDropdown}` : ''}
        onDropdownVisibleChange={handleDropdownVisibleChange}
      >
        {children}
      </Select>
    </div>
  );
};

export default CustomSelect;

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
  value,
  ...rest
}) => {
  const jsonChildren = Array.isArray(children)
    ? children.map((child, index) => {
        // Ensure `child.props.children` is a string before trying to match
        const childText =
          typeof child?.props?.children === 'string'
            ? child.props.children
            : '';

        // Extract time from the child text (e.g., "06:10 09:00")
        const timeMatch = childText.match(/\d{2}:\d{2} \d{2}:\d{2}/);
        const time = timeMatch ? timeMatch[0] : '';

        // Split time into start and end time
        const [startTime, endTime] = time.split(' ');

        // Combine time with a hyphen in between
        const formattedTime = `${startTime} - ${endTime}`;

        // Classify based on time of day
        const hour = parseInt(startTime.split(':')[0], 10);
        let period = '';

        if (hour >= 5 && hour < 12) {
          period = 'Ochtend';
        } else if (hour >= 12 && hour < 17) {
          period = 'Middag';
        } else if (hour >= 17 && hour < 21) {
          period = 'Avond';
        } else {
          period = 'Nacht';
        }

        // Combine period and formatted time
        const combinedChildren = `${period} (${formattedTime})`;

        // Return React element format
        return React.createElement(
          'option', // This assumes you're rendering options for a <select> element
          {
            key: index,
            value: child?.props?.value,
            style: {
              backgroundColor:
                child?.props?.value === value ? '#f15a24' : 'transparent',
              color: child?.props?.value === value ? '#fff' : 'inherit'
            }
          },
          combinedChildren
        );
      })
    : [];

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
        className={styles.select}
        {...rest}
        defaultValue={defaultText}
        value={value}
        // value={defaultText !== null ? defaultText : value}
        dropdownRender={hotelInnerPage ? () => null : ''}
        popupClassName={hotelInnerPage ? `${styles.hiddenDropdown}` : ''}
      >
        {jsonChildren}
      </Select>
    </div>
  );
};

export default CustomSelect;

import React, { useEffect, useState } from 'react';
import { ConfigProvider, DatePicker } from 'antd';
import styles from './customDatePickerWithLabel.module.css';
import { DropdownSvg } from '../svgs/Svgs';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import '@/app/globals.css';

// Customize the locale to display full weekday names
const customNlLocale = {
  locale: 'nl',
  DatePicker: {
    lang: {
      locale: 'nl_NL',
      placeholder: 'Selecteer datum',
      rangePlaceholder: ['Startdatum', 'Einddatum'],
      today: 'Vandaag',
      now: 'Nu',
      backToToday: 'Terug naar vandaag',
      ok: 'OK',
      timeSelect: 'Tijd selecteren',
      dateSelect: 'Datum selecteren',
      yearFormat: 'YYYY',
      dateFormat: 'DD-MM-YYYY',
      dayFormat: 'DD',
      dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
      previousMonth: 'Vorige maand (PageUp)',
      nextMonth: 'Volgende maand (PageDown)',
      previousYear: 'Vorig jaar (Control + left)',
      nextYear: 'Volgend jaar (Control + right)',
      shortWeekDays: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
      shortMonths: [
        'Jan',
        'Feb',
        'Mrt',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'ei',
        'Dec'
      ]
    },
    timePickerLocale: {
      placeholder: 'Tijd selecteren'
    }
  }
};

const CustomDatePickerWithLabel = ({
  label,
  prefixIcon,
  landingPage,
  customStyle,
  customStyleNew,
  className,
  destination,
  disabledDate,
  ...rest

}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const popupStyle = {
    width: isMobile ? '230px' : '350px' // Set the width based on screen size
  };

  const handleDateChange = date => {
    const formattedDate = date.format('DD-MM-YYYY (ddd)');
   // Remove any unwanted period at the end of the weekday abbreviation
    const cleanedDate = formattedDate.replace(/\.$/, ''); // This removes the period from the end
    setSelectedDate(cleanedDate);
  };

  return (
    <ConfigProvider locale={customNlLocale}>
      <div
        className={`${styles.datePickerWrapper} ${
          customStyle ? styles.customStyleWrapper : ''
        } ${
          customStyleNew ? styles.customStyleWrapperS : ''
        }
         ${destination ? styles.datePickerWrapperDestination : ''}`}
      >
        {label && (
          <div
            className={
              landingPage ? `${styles.labelLandingPage}` : `${styles.label}`
            }
          >
            {label}
          </div>
        )}
        <div className={styles.datePickerInputWrapper}>
          {prefixIcon && (
            <span className={styles.prefixIcon}>{prefixIcon}</span>
          )}
          <DatePicker
            className={`${styles.datePicker} ${className}`}
            suffixIcon={<DropdownSvg />}
            disabledDate={disabledDate}
            allowClear
            inputReadOnly={true}
            format={'DD-MM-YYYY (dd)'} // Add (ddd) to show short weekday name
            popupStyle={popupStyle}
            dropdownClassName={styles.customDropdown}
            value={selectedDate ? dayjs(selectedDate, 'DD-MM-YYYY (dd)') : null}
            onChange={handleDateChange} // Update the selected date
            {...rest}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CustomDatePickerWithLabel;

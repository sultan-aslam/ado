import React, { useEffect, useState } from 'react';
import { Select, Row, Col, message, Input } from 'antd';
import dayjs from 'dayjs';
import styles from './customDatepicker.module.css';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const { Option } = Select;

const CustomDropdownDatePicker = ({
  label,
  onChange,
  passengerType,
  valueInitital,
  childAgeLimit,
  checkInDate,
  vacatures,
  vacaturesReset
}) => {
  const currentYear = dayjs().year();
  const minimumYear = currentYear - 100;
  const maxAge = localStorage.getItem('newMaxAge') || 16;
  const startYear = currentYear - maxAge;
  const generateYearOptions = () => {
    const years = [];
    if (vacatures) {
      for (let year = currentYear; year >= minimumYear; year--) {
        years.push(year);
      }
    } else {
      if (passengerType === 'BABY') {
        for (let year = currentYear; year >= currentYear - 2; year--) {
          years.push(year);
        }
      } else if (passengerType === 'CHILD') {
        for (
          let year = currentYear;
          year >= currentYear - (childAgeLimit + 1);
          year--
        ) {
          years.push(year);
        }
      } else if (passengerType === 'ADULT') {
        for (let year = startYear - 1; year >= minimumYear; year--) {
          years.push(year);
        }
      }
    }

    return years;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push(month);
    }
    return months;
  };

  const generateDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  const [selectedYear, setSelectedYear] = useState(
    valueInitital && valueInitital?.format('YYYY')
  );
  const [selectedMonth, setSelectedMonth] = useState(
    valueInitital && valueInitital?.format('MM')
  );
  const [selectedDay, setSelectedDay] = useState(
    valueInitital && valueInitital?.format('DD')
  );
  const [manualDate, setManualDate] = useState(
    valueInitital && valueInitital?.format('YYYY-MM-DD')
  );
  const handleManualDateChange = e => {
    const inputValue = e.target.value;
    setManualDate(inputValue);
    const parsedDate = dayjs(inputValue, 'YYYY-MM-DD', true);
    if (parsedDate.isValid()) {
      const newYear = parsedDate.year();
      const newMonth = parsedDate.month() + 1;
      const newDay = parsedDate.date();

      if (newYear.toString().length > 3) setSelectedYear(newYear);
      setSelectedMonth(newMonth);
      setSelectedDay(newDay);
      if (newYear.toString().length > 3) updateDate(newYear, newMonth, newDay);
    }
  };

  const handleYearChange = value => {
    setSelectedYear(value);
    updateDate(value, selectedMonth, selectedDay);
  };

  const handleMonthChange = value => {
    setSelectedMonth(value);
    updateDate(selectedYear, value, selectedDay);
  };

  const handleDayChange = value => {
    setSelectedDay(value);
    updateDate(selectedYear, selectedMonth, value);
  };

  const updateDate = (year, month, day) => {
    const today = new Date();
    if (year && month && day) {
      const newDate = dayjs(`${year}-${month}-${day}`).startOf('day');
      if (newDate >= today) {
        message.error("De geselecteerde datum kan niet in de toekomst liggen");
        return resetFields();
      }
      const referenceDate = checkInDate ? dayjs(checkInDate) : dayjs();
      const maxageAdult = Number(maxAge) + 1;
      const minimumValidDateForAdult = dayjs(referenceDate)
        .subtract(maxageAdult, 'years')
        .startOf('day');
      const maximumValidDateForChild = dayjs(referenceDate)
        .subtract(childAgeLimit + 1, 'years')
        .startOf('day');
      if (passengerType === 'ADULT') {
        if (newDate.isAfter(minimumValidDateForAdult)) {
          message.error(`Je moet minimaal zijn ${maxAge} jaar old.`);
          resetFields();
          return;
        }
      }

      if (passengerType === 'CHILD') {
        if (newDate.isSameOrBefore(maximumValidDateForChild)) {
          message.error(
            `Het kind mag niet ouder zijn dan ${childAgeLimit} jaar.`
          );
          resetFields();
          return;
        }
      }

      if (passengerType === 'BABY') {
        const currentDate = referenceDate;

        if (currentDate) {
          const formattedCurrentDate = dayjs(currentDate);
          const differenceInYears = newDate
            ? formattedCurrentDate.diff(newDate, 'year', true)
            : null;
          if (differenceInYears !== null && differenceInYears >= 3) {
            message.error(
              'Sorry, de geselecteerde baby is ouder dan 2 jaar op de vertrekdatum. Boek als kind of pas de vertrekdatum aan.'
            );
            resetFields();
            return;
          }
        }
      }

      onChange(newDate);
      setManualDate(newDate.format('YYYY-MM-DD'));
    }
  };

  const resetFields = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedDay(null);
    setManualDate(null);
  };
  useEffect(() => {
    if (vacaturesReset) {
      resetFields()
    }
  }, [vacaturesReset])
  // Format the selected date for display
  const formattedDate =
    selectedYear && selectedMonth && selectedDay
      ? dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).format(
        'D MMM YYYY'
      )
      : '';
  const handleDropdownVisibleChange = (open) => {
    const isMobile = window.innerWidth < 786;

    if (isMobile) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <label>{label}</label>
      <Input
        value={manualDate}
        onChange={handleManualDateChange}
        style={{
          width: '100%',
          ...(vacatures && { height: '50px' })
        }}
        type='date'
        placeholder='Enter date (D/MM/YYYY)'
        className={styles.noCalendar}
      />
      <Row gutter={8}>
        <Col span={8}>
          <Select
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={selectedDay}
            onChange={handleDayChange}
            style={{ width: '100%' }}
            placeholder='Day'
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            {generateDayOptions().map(day => (
              <Option key={day} value={day}>
                {day}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>
          <Select
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{ width: '100%' }}
            placeholder='Month'
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            {generateMonthOptions().map(month => (
              <Option key={month} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>
          <Select
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={selectedYear}
            onChange={handleYearChange}
            style={{ width: '100%' }}
            placeholder='Year'
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            {generateYearOptions().map(year => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      {formattedDate && (
        <div style={{ marginTop: '10px' }}>
          <strong>Geselecteerde datum: </strong> {formattedDate}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownDatePicker;

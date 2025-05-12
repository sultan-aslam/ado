"use client";
import React, { useEffect, useState ,memo } from "react";
import styles from "./timerCountdown.module.css";

const TimerCountdown = ({
  isHotelNavbar,
  setIsExpired,
  days,
  hours,
  minutes,
  seconds,
  hotelDiscount,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          setIsExpired(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        }

        if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        }

        if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        }

        if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        }

        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setIsExpired]);

  return (
    <>
      {isHotelNavbar ? (
        <div className={styles.timerContainer}>
          <div className={styles.hotelNavbarTimerRight}>
            <div className={styles.hotelTimerHeading}>TIME LEFT</div>

            <div style={{ display: "flex", gap: "8px" }}>
            <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(Math.floor(timeLeft.days)).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(Math.floor(timeLeft.hours / 10)).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.hotelOveriewScoreCard}>

          <div className={styles.hotelTimerLeft}>
            {/* Any additional content here */}
            <div className={styles.hotelTimerHeading}>Special DEAL</div>

            <div>
              {hotelDiscount}% OFF
            </div>
          </div>
          <div className={styles.hotelTimerRight}>
            {/* <div className={styles.hotelTimerHeading}>TIME LEFT</div> */}
            <div className={styles.timerContainer}>
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(days).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(hours).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(minutes).padStart(2, '0')}
              </span>
              :
              <span className={isHotelNavbar ? styles.hotelNavbar : styles.countdown}>
                {String(Math.floor(timeLeft.seconds)).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(TimerCountdown);

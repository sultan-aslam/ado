import React from "react";
import styles from "./cardHeadingA.module.css";
import { IoIosStar } from "react-icons/io";
import ReactCountryFlag from "react-country-flag";
import { Rate } from "antd";

const CardHeadingA = ({
  starRating,
  tripAdvisorRating,
  name,
  region,
  place,
}) => {
  const formattedRating = tripAdvisorRating?.replace(",", ".");
  const fullText = `${place} - ${name} - ${region}`;
  const truncatedText =
    fullText.length > 36 ? `${fullText.substring(0, 36)}...` : fullText;
  return (
    <div className={styles.cardAHeadingSection}>
      <div className={styles.cardAHeadingNameSection}>
        <div className={styles.cardATitleContainer}>
          <span
            className={styles.cardATitle}
            title={name.length > 15 ? name : ""}
          >
            {name}
            {/* {region} */}
            {/* {place} */}
          </span>
          <Rate disabled allowHalf defaultValue={starRating} className={styles.rating} />
        </div>
        <div className={styles.cardARating}>
          <IoIosStar className={styles.starsColor} />{" "}
          <span className={styles.cardARatingText}>{formattedRating}</span>
        </div>
      </div>
      <div className={styles.cardAHeadingPlace}>
        <ReactCountryFlag
          countryCode="TR"
          svg
          style={{
            width: "1.5em",
          }}
          title="Turkey"
        />
        {/* <div className={styles.cardAPaceName} title={fullText.length > 36 ? fullText : ""}>{truncatedText}</div> */}
        <div className={styles.cardAPaceName} title={fullText.length > 36 ? fullText : ""}>{place === "Lara" ? 'Antalya –' +place : place}</div>
      </div>
    </div>
  );
};

export default CardHeadingA;

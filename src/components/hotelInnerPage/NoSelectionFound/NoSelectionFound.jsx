import Image from "next/image";
import React from "react";
import styles from "./noSelectionFound.module.css";
import NoResults from "../../../../public/images/NoResults.png";
import { ContactSvg, MailSvg } from "@/components/common/svgs/Svgs";

const NoSelectionFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={NoResults}
          objectFit="contain"
          alt="No Results Found"
          className="objectCover"
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>
          Helaas geen beschikbaarheden gevonden voor deze selecties.
        </h1>
        <div className={styles.detailsContainer}>
          <p className={styles.details}>

            Pas s.v.p. uw selectie aan (vertrekdatum, reisduur, kamertype, luchthaven, reisduur)
            OF
            neem contact met ons op door een  <a href="https://wa.me/message/KG7H5JXPXJUGH1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" , fontWeight:"600" }}>WhatsApp</a>
            {""} bericht te sturen
          </p>
          <div className={styles.support}>
            <MailSvg />
            <p>info@adotravel.nl</p>
          </div>
          <div className={styles.support}>
            <ContactSvg />
            <p>0031-70-44 527 48</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSelectionFound;

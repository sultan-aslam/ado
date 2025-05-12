import React, { useMemo } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import logo from "../../../../public/images/logo.svg";
import { FiArrowUp } from "react-icons/fi";

const BottomFooter = () => {
  const getYear = useMemo(() => new Date()?.getFullYear(), []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container" id='bottomFooter'>
      <div className="wrapper">
        <div className={styles.bContainer}>
          <div className={styles.bImageContainer}>
            <Image src={logo} fill alt="Adotravel" />
          </div>
          <div className={styles.bCopyright}>
            <div>© {getYear} adotravel</div>
            <div href={"#navbar"} className={styles.upArrow} onClick={scrollToTop}>
              <FiArrowUp className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;

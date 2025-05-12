import React from "react";
import { Input } from "antd";
import styles from "./customInputWithLabel.module.css";

const CustomInputWithLabel = ({
  label,
  landingFiltersMobile,
  children,
  ...rest
}) => {
  return (
    <div className={styles.inputWrapper}>
      <div
        className={landingFiltersMobile ? `${styles.labelMobileFilters}` : `${styles.label}`}
      >
        {label}
      </div>
      <Input className={styles.input} {...rest}>
        {children}
      </Input>
    </div>
  );
};

export default CustomInputWithLabel;

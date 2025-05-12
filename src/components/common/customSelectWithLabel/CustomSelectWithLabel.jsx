import React, { forwardRef } from "react";
import { Select } from "antd";
import styles from "./customSelectWithLabel.module.css";
import { DropdownSvg } from "../svgs/Svgs";

const CustomSelectWithLabel = forwardRef(({
  label,
  mobileLanding,
  landingPage,
  children,
  travelCompany,
  value,
  handleDropdownVisibleChange,
  destination,
  ...rest
}, ref) => {
  return (
    <div className={`${styles.selectWrapper} ${destination ? styles.selectWrapperDestination : ''}`}>
      <div
        className={
          landingPage ? `${styles.landingPageLabel}` : `${styles.label}`
        }
      >
        {label}
      </div>
      {/* {prefixIcon && (
        <div
          className={styles.prefixIconWrapper}
        >
          {prefixIcon}
        </div>
      )} */}
      <Select
        ref={ref}
        className={`${destination ? styles.selectDestination : styles.select} ${
          mobileLanding ? styles.mobileLandingSelect : ""
        }`}
        {...rest}
        value={value}
        popupClassName={travelCompany ? `${styles.hiddenDropdown}` : ""}
        dropdownRender={travelCompany ? () => null : ""}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        suffixIcon={<DropdownSvg />}
      >
        {children}
      </Select>
    </div>
  );
});

CustomSelectWithLabel.displayName = 'CustomSelectWithLabel';

export default CustomSelectWithLabel;

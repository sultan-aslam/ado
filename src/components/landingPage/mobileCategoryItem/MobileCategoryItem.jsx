"use client";
import React, { useState } from "react";
import styles from "./mobileCategoryItem.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/reduxHooks";
import { fetchFiltersDestination } from "@/store/features/getFilters/getFiltersSlice";

const MobileCategoryItem = ({ key, id, title, icon, setLoading }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLinkClick = (id) => {
    setLoading(true);
    const payload = { id: id, destination: "landingpages" };
    if (payload?.id && !!payload.destination) {
      dispatch(fetchFiltersDestination(payload))
        .then(() => {
          setLoading(false);
          router.push(
            `/landing/?LandingPageName=${payload?.destination}&id=${payload?.id}`
          );
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className={styles.container} onClick={() => handleLinkClick(id)}>
      <div className={styles.firstSection}>
        {icon}
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div>
        <MdKeyboardArrowRight size={25} />
      </div>
    </div>
  );
};

export default MobileCategoryItem;

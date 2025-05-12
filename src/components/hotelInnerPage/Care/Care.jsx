"use client";

import React, { useState } from "react";
import styles from "./care.module.css";
import RoomTypeCard from "../RoomTypeCard/RoomTypeCard";
import { FiAlertCircle } from "react-icons/fi";
import CareCard from "../careCard/CareCard";

const careData = [
  {
    radioTitle: "Accommodatie",
    radioDescription:
      "This option only includes overnight accommodation. Meals and drinks are at your own expense.",
    cost: "CHEAPEST",
  },
  {
    radioTitle: "Accommodatie",
    radioDescription:
      "This option only includes overnight accommodation. Meals and drinks are at your own expense.",
    cost: "EXPENSIVE",
  },
];

const Care = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (index) => {
    setSelectedCard(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.careType}>
        <h1 className={styles.title}>Care</h1>
        <FiAlertCircle className={styles.icon} />
      </div>
      {careData.map((care, index) => (
        <CareCard
          key={index}
          cost={care.cost}
          radioTitle={care.radioTitle}
          radioDescription={care.radioDescription}
          onSelect={() => handleCardSelect(index)}
          selected={selectedCard === index}
          className={selectedCard === index ? styles.selectedCard : ""}
        />
      ))}
    </div>
  );
};

export default Care;

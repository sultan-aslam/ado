import { Card, Radio, Tag } from "antd";
import styles from "./careCard.module.css";
import { FiAlertCircle } from "react-icons/fi";

const CareCard = ({
  cost,
  radioDescription,
  radioTitle,
  onSelect,
  selected,
}) => {
  return (
    <div className={`${styles.containerTop}`}>
      <label
        className={`${styles.containerTop} ${selected ? styles.selected : ""}`}
        onClick={onSelect}
      >
        <Card
          className={`${styles.cardContainer} ${
            selected ? styles.selectedCard : ""
          }`}
        >
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <Radio checked={selected ? true : ""} className={styles.careType}>
                <div>
                  <h1 className={styles.radioTitle}>{radioTitle}</h1>
                  <p className={styles.radioDescription}>{radioDescription}</p>
                </div>
              </Radio>
            </div>

            <div className={styles.tags}>
              <Tag className={styles.tag}>{cost}</Tag>
            </div>
          </div>
        </Card>
      </label>
    </div>
  );
};

export default CareCard;

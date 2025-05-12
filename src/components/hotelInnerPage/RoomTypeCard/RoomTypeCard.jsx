import { Card, Radio, Tag, Tooltip } from 'antd';
import { FiAlertCircle } from 'react-icons/fi';

import styles from './roomTypeCard.module.css';

const RoomTypeCard = ({
  radioDescription,
  cost,
  onSelect,
  selected,
  roomCode,
  customLoader
}) => {
  return (
    <div className={`${styles.containerTop}`}>
      <label
        className={`${styles.containerTop} ${selected ? styles.selected : ''}`}
        onClick={onSelect}
      >
        <Card
          className={`${styles.cardContainer} ${selected ? styles.selectedCard : ''
            }`}
        >
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <Radio
                checked={selected ? true : ''}
                className={styles.roomType}
                disabled={customLoader}
              >
                {radioDescription}
              </Radio>

              {/* <Tooltip
                title={
                  <span>
                    Code: {roomCode} <br /> Name: {radioDescription}
                  </span>
                }
              >
                <FiAlertCircle className={styles.icon} />
              </Tooltip> */}
            </div>
           <div style={{display:"flex" , flexDirection:"column" , gap:"5px" , justifyContent:"end" , alignItems:"end"}}>
           {selected && <div className={styles.selectedTag}>Geselecteerde kamer</div> }
            {cost && (
              <div className={styles.tags}>
                <Tag className={styles.tag}>{cost}</Tag>
              </div>
            )}
           </div>
          </div>
        </Card>
      </label>
    </div>
  );
};

export default RoomTypeCard;

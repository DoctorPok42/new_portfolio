import React from 'react';

import styles from './style.module.scss';

interface InfoCardProps {
  title: string;
  value: string;
  color: "green" | "yellow" | "red";
}

const InfoCard = ({
  title,
  value,
  color,
}: InfoCardProps) => {
  const corespondingColor = {
    green: "var(--green)",
    yellow: "var(--yellow)",
    red: "var(--red)",
  };

  const putRightDate = (date: string) => {
    const dateToCompare = new Date(date);
    const dateNow = new Date();
    const diff = dateNow.getTime() - dateToCompare.getTime();
    const diffInYears = diff / (1000 * 3600 * 24 * 365.25);
    return Math.floor(diffInYears).toString() + "+";
  }

  return (
    <div className={styles.InfoCard_container} style={{
      backgroundColor: corespondingColor[color],
    }}>
      <div
        className={styles.value}
        style={{
          color: color === "yellow" ? "black" : "white",
        }}
      >
        {
          title === "Years Experience" ? putRightDate(value) : value
        }
      </div>

      <div
        className={styles.title}
        style={{
          color: color === "yellow" ? "black" : "white",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default InfoCard;

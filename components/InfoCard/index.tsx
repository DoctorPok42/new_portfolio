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
        {value}
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

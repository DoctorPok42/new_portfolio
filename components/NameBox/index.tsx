import React from 'react';

import styles from './style.module.scss';

interface NameBoxProps {
  title?: string;
  value: string;
}

const NameBox = ({
  title,
  value,
}: NameBoxProps) => {
  return (
    <div className={styles.NameBox_container}>
      {title && <div className={styles.NameBox_title}>{title} :</div>}
      <div className={styles.NameBox_value}>{value}</div>
    </div>
  );
};

export default NameBox;

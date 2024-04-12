import React from 'react';
import { Emoji } from 'emoji-picker-react';

import styles from './style.module.scss';

interface MainBoxProps {
  title: string;
  buttonLabel: string;
  children: React.ReactNode;
}

const MainBox = ({
  title,
  buttonLabel,
  children,
}: MainBoxProps) => {
  return (
    <div className={styles.MainBox_container}>
      <div className={styles.text}>
        <div className={styles.content}>
          <h1>{title}</h1>
          <button>{buttonLabel} <Emoji unified='1f44b' /></button>
        </div>
      </div>

      <div className={styles.info}>
        {children}
      </div>
    </div>
  );
};

export default MainBox;

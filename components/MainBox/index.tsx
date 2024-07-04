import React from 'react';
import { Emoji } from 'emoji-picker-react';

import styles from './style.module.scss';

interface MainBoxProps {
  title: string;
  buttonLabel: string;
  children: React.ReactNode;
  mail: string;
}

const MainBox = ({
  title,
  buttonLabel,
  children,
  mail,
}: MainBoxProps) => {
  return (
    <div className={styles.MainBox_container}>
      <div className={styles.text}>
        <div className={styles.content}>
          <h1>{title}</h1>
          <a href={`mailto:${mail}`}>
            {buttonLabel}
            <Emoji unified='1f44b' />
          </a>
        </div>
      </div>

      <div className={styles.info}>
        {children}
      </div>
    </div>
  );
};

export default MainBox;

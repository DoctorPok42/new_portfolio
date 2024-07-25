import React from 'react';

import styles from './style.module.scss';

interface LargeBoxProps {
  header: {
    title: string;
    subtitle: string;
  }
  size?: 'medium' | 'large';
  canExpand?: boolean;
  children?: React.ReactNode;
  setIsExpanded? (isExpanded: boolean): void;
}

const LargeBox = ({
  header,
  size = 'medium',
  canExpand,
  children,
  setIsExpanded,
}: LargeBoxProps) => {
  return (
    <div
      className={styles.LargeBox_container}
      style={{ width: size === 'medium' ? "40%" : "60%" }}
      id={canExpand ? "projects_container" : "about"}
    >
      <div className={styles.header}>
        <h1>{header.title}</h1>
        <h2
          onKeyUp={() => void 0}
          id={canExpand ? styles.expand : undefined}
          onClick={() => canExpand && setIsExpanded?.(true)}
        >
          {header.subtitle}
        </h2>
      </div>

      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
};

export default LargeBox;

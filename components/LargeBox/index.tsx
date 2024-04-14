import React, { useState } from 'react';

import styles from './style.module.scss';

interface LargeBoxProps {
  header: {
    title: string;
    subtitle: string;
  }
  size?: 'medium' | 'large';
  canExpand?: boolean;
  children?: React.ReactNode;
}

const LargeBox = ({
  header,
  size = 'medium',
  canExpand,
  children,
}: LargeBoxProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={styles.LargeBox_container} style={{ width: size === 'medium' ? "40%" : "60%" }}>
      <div className={styles.header}>
        <h1>{header.title}</h1>
        <h2
          id={canExpand ? styles.expand : undefined}
          onClick={() => canExpand && setIsExpanded(!isExpanded)}
        >
          {header.subtitle}
        </h2>
      </div>

      <div className={styles.children} style={{ display: isExpanded ? "none" : "" }}>
        {children}
      </div>
    </div>
  );
};

export default LargeBox;

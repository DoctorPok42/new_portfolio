import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from './style.module.scss';

interface MediaBoxProps {
  icons: { icon: IconDefinition, link: string, backgroundColor: string }[];
}

const MediaBox = ({
  icons,
}: MediaBoxProps) => {
  const [isHovered, setIsHovered] = useState<number>(-1);

  return (
    <div className={styles.MediaBox_container}>
      {icons.map((icon, index) => (
        <Link key={index + icon.link} href={icon.link} target="_blank" className={styles.MediaBox_link}>
          <div
            className={styles.icon}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(-1)}
            style={{
              backgroundColor: (isHovered === index || index === 0) ? icon.backgroundColor : 'rgba(155, 155, 155, 0.1)',
            }}
          >
            <FontAwesomeIcon icon={icon.icon} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MediaBox;

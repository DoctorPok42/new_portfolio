import React, { useState } from 'react';
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
        <div
          key={index + icon.link}
          role='feed'
          className={styles.icon}
          onClick={() => window.open(icon.link, '_blank')}
          onMouseEnter={() => setIsHovered(index)}
          onMouseLeave={() => setIsHovered(-1)}
          style={{
            backgroundColor: (isHovered === index || index === 0) ? icon.backgroundColor : 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <FontAwesomeIcon icon={icon.icon} />
        </div>
      ))}
    </div>
  );
};

export default MediaBox;

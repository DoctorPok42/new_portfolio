import React, { useRef } from 'react';
import { Emoji } from 'emoji-picker-react';
import CVButton from '../CVButton';
import VariableProximity from "../VariableProximity/VariableProximity";

import styles from './style.module.scss';

interface MainBoxProps {
  title: string;
  buttonLabel: string;
  children: React.ReactNode;
  mail: string;
  pathToResume: string;
}

const MainBox = ({
  title,
  buttonLabel,
  children,
  mail,
  pathToResume,
}: MainBoxProps) => {
  const containerRef = useRef(null);

  return (
    <div className={styles.MainBox_container}>
      <div className={styles.text}>
        <div className={styles.content}>
          <div ref={containerRef} className={styles.title} style={{position: 'relative'}}>
            <VariableProximity
              label={title}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 950, 'opsz' 9"
              toFontVariationSettings="'wght' 650, 'opsz' 40"
              containerRef={containerRef}
              radius={80}
              falloff='gaussian'
            />
          </div>
          <a href={`mailto:${mail}`}>
            {buttonLabel}
            <Emoji unified='1f44b' />
          </a>

          {pathToResume && <CVButton pathToResume={pathToResume} />}
        </div>
      </div>

      <div className={styles.info}>
        {children}
      </div>
    </div>
  );
};

export default MainBox;

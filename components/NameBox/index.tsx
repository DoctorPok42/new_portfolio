import React from 'react';
import Image from 'next/image';
import DecryptedText from '../DecryptedText/DecryptedText'

import styles from './style.module.scss';

interface NameBoxProps {
  title?: string;
  value: string;
  data?: {
    public_repos: number;
    followers: number;
  };
  img?: string;
}

const NameBox = ({
  title,
  value,
  data,
  img,
}: NameBoxProps) => {
  const isPseudo = !title;

  return (
    <div className={styles.NameBox_container} id={isPseudo ? 'pseudo' : ''}>
      {title && <div className={styles.NameBox_title}>{title} :</div>}
      <div className={styles.NameBox_infos}>
        {(isPseudo && img) && <div className={styles.NameBox_pseudo}>
          <Image src={img} alt="profil" width={65} height={65} />
        </div>}
        <div className={styles.NameBox_value}>
          <DecryptedText
            text={value}
            animateOn="hover"
            speed={65}
            revealDirection="start"
            sequential={true}
          />
        </div>
      </div>

      {data && (
        <div className={styles.NameBox_data}>
          <div className={styles.field}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill="#8d96a0">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <span>Repositories</span>
            <p>{data.public_repos}</p>
          </div>

          <div className={styles.field}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill="#8d96a0">
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
            </svg>
            <span>Followers</span>
            <p>{data.followers}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameBox;

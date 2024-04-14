import React from 'react';

import styles from './style.module.scss';

interface ProjectCardProps {
  imgUrl: string;
  smallLogoUrl: string;
}

const ProjectCard = ({
  imgUrl,
}: ProjectCardProps) => {
  return (
    <div className={styles.ProjectCard_container}>
    </div>
  );
};

export default ProjectCard;

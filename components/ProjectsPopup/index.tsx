import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faClose, faExternalLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { useClickAway } from '@uidotdev/usehooks';

import styles from './style.module.scss';
import Image from 'next/image';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface ProjectsPopupProps {
  projects: {
    title: string;
    imgs: string[];
    description: string;
    link?: string;
    logo: string;
    github?: string;
    tags: string[];
  }[];
  setIsExpanded(isExpanded: boolean): void;
  selectedProject: number | null;
}

const ProjectsPopup = ({
  projects,
  setIsExpanded,
  selectedProject,
}: ProjectsPopupProps) => {
  const ref = useClickAway(() => {
    setIsExpanded(false);
  }) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className={styles.ProjectsPopup_container}>
      <div ref={ref} className={styles.ProjectsPopup_content}>
        <div className={styles.header}>
          <h1>Projects</h1>
          <FontAwesomeIcon className={styles.header_img} icon={faClose} onClick={() => setIsExpanded(false)} width={30} height={30} />
        </div>

        <div className={styles.projects}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.project_img}>
                <img className={styles.bigimg} src={project.imgs[0]} alt="project" />

                <div className={styles.project_logo}>
                  <Image src={project.logo} alt="logo" width={30} height={30} />
                </div>
              </div>

              <div className={styles.project_text}>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                {project.tags && <p className={styles.project_tags}>
                  {project.tags?.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </p>}

                <div className={styles.project_links}>
                  {project.github && (
                    <a href={project.github} target="_blank">
                      <FontAwesomeIcon icon={faGithub} width={15} height={15} />
                    </a>
                  )}

                  {project.link && (
                    <a href={project.link} target="_blank">
                      <FontAwesomeIcon icon={faExternalLink} width={15} height={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPopup;

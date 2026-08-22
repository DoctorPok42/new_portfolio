import React, { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { useClickAway } from '@uidotdev/usehooks';
import Image from 'next/image';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './style.module.scss';

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
  setIsSelectedProject(selectedProject: number | null): void;
}

const ProjectsPopup = ({
  projects,
  setIsExpanded,
  selectedProject,
  setIsSelectedProject,
}: ProjectsPopupProps) => {
  const [projectsWithRotatingImages, setProjectsWithRotatingImages] = useState(projects);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRotation(r => r + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const handleColose = () => {
    setIsExpanded(false);
    setIsSelectedProject(null);
  }

  const ref = useClickAway(() => {
    handleColose();
  }) as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (selectedProject !== null) {
      const project = document.getElementById(`project-${selectedProject}`);
      if (project) {
        project.scrollIntoView();
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    const newProjects = projects;
    setProjectsWithRotatingImages(newProjects);
  }, [projects]);


  return (
    <div className={styles.ProjectsPopup_container}>
      <div ref={ref} className={styles.ProjectsPopup_content}>
        <div className={styles.header}>
          <h1>Projects</h1>
          <FontAwesomeIcon className={styles.header_img} icon={faClose} onClick={() => handleColose()} width={30} height={30} />
        </div>

        <div className={styles.projects}>
          {projectsWithRotatingImages.map((project, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imgs = useMemo(
              () => project.imgs.length > 1
                ? project.imgs.map((_, i) => project.imgs[(i + rotation) % project.imgs.length])
                : project.imgs,
              [project.imgs, rotation]
            );
            return (
            <div
              key={project.title}
              className={styles.project}
              id={`project-${index}`}
            >
              <div className={styles.project_img}>
                {imgs[2] ? <img className={styles.smallimg} src={imgs[2]} alt="project" decoding='async' loading='lazy' /> : <p></p>}
                <img className={styles.bigimg} src={imgs[0]} alt="project" decoding='async' loading='lazy' />
                {imgs[1] ? <img className={styles.smallimg} src={imgs[1]} alt="project" decoding='async' loading='lazy' /> : <p></p>}

                <div className={styles.project_logo}>
                  <Image src={project.logo} alt="logo" width={30} height={30} />
                </div>
              </div>

              <div className={styles.project_text}>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                {project.tags && <p className={styles.project_tags}>
                  {project.tags?.map((tag, index) => (
                    <span key={tag + index} className={styles.tag}>#{tag}</span>
                  ))}
                </p>}

                <div className={styles.project_links}>
                  {project.github && (
                    <a href={project.github} target="_blank">
                      <FontAwesomeIcon icon={faGithub} width={17} height={17} />
                      See on GitHub
                    </a>
                  )}

                  {project.link && (
                    <div className={styles.project_links}>
                      <a href={project.link} target="_blank">
                        <FontAwesomeIcon icon={faExternalLink} width={13} height={13} />
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPopup;

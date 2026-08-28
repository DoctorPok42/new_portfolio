import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { useClickAway } from '@uidotdev/usehooks';
import Image from 'next/image';
import Link from 'next/link';

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
    year?: number;
    status?: "live" | "archived" | "wip";
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
  const [selectedTag, setSelectedTag] = useState<string>("Tous");
  const [projectSelected, setProjectSelected] = useState<string | null>(
    selectedProject !== null ? projects[selectedProject].title : projects[0].title
  );

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

  let tags = [] as string[];

  projects.forEach(project => {
    if (project.tags) {
      project.tags.forEach(tag => {
        if (!tags.includes(tag) && projectsWithRotatingImages.filter(p => p.tags?.includes(tag)).length > 1) {
          tags.push(tag);
        }
      });
    }
  });

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);

    if (tag !== "Tous") {
      const firstProjectWithTag = projectsWithRotatingImages.findIndex(project => project.tags?.includes(tag));
      if (firstProjectWithTag !== -1 && projectsWithRotatingImages[firstProjectWithTag].title !== projectSelected) {
        setProjectSelected(projectsWithRotatingImages[firstProjectWithTag].title);
      }
    }
  }

  return (
    <div className={styles.ProjectsPopup_container}>
      <div ref={ref} className={styles.ProjectsPopup_content}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <h1>Projects</h1>
            <span>({projectsWithRotatingImages.length})</span>
          </div>

          <div className={styles.header_tags}>
            <span className={styles.tag} style={{
              backgroundColor: selectedTag === "Tous" ? "#00c39a" : "#292729",
              borderColor: selectedTag === "Tous" ? "#00c39a" : "#3a383a",
              color: selectedTag === "Tous" ? "#0f0f0f" : "#cfcbcf",
            }} onClick={() => handleSelectTag("Tous")}>Tous {projectsWithRotatingImages.length}</span>

            {tags.map((tag, index) => (
              <span key={tag + index} className={styles.tag} style={{
                backgroundColor: selectedTag === tag ? "#00c39a" : "#292729",
                borderColor: selectedTag === tag ? "#00c39a" : "#3a383a",
                color: selectedTag === tag ? "#0f0f0f" : "#cfcbcf",
              }} onClick={() => handleSelectTag(tag)}>
                {tag} {projectsWithRotatingImages.filter(project => project.tags?.includes(tag)).length}
              </span>
            ))}
            <div className={styles.tag_indicator}>
              <FontAwesomeIcon icon={faClose} onClick={() => handleColose()} size='xs' />
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <div className={styles.projets_col}>
            {projectsWithRotatingImages.filter(project => selectedTag === "Tous" || project.tags?.includes(selectedTag)).map((project, index) => (
              <div
                key={project.title + index}
                className={styles.project}
                id={`project-${index}`}
                onClick={() => setProjectSelected(project.title)}
                style={{
                  backgroundColor: projectSelected === project.title ? "#292729" : "transparent",
                  borderColor: projectSelected === project.title ? "#4c494c" : "transparent",
                }}
              >
                <div className={styles.project_logo}>
                  <Image src={project.logo} alt="logo" width={20} height={20} />
                </div>

                <div className={styles.project_text}>
                  <span className={styles.project_title}>{project.title}</span>
                  <span className={styles.project_year}>{project.year || "2190"} - {project.status || "rip"}</span>
                </div>

                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: project.status === "live" ? "#00c39a" : project.status === "archived" ? "#8a878a" : "#ffbf3c",
                  }}
                ></span>
              </div>
            ))}
          </div>

          <div className={styles.projet_details}>
            {projectSelected !== null && (() => {
              const project = projectsWithRotatingImages.find((p, index) => p.title === projectSelected && (selectedTag === "Tous" || p.tags?.includes(selectedTag)));
              if (!project) return null;

              const imgs = project.imgs.length > 1
                ? project.imgs.map((_, i) => project.imgs[(i + rotation) % project.imgs.length])
                : project.imgs

              return (
                <>
                  <div className={styles.project_img}>
                    {imgs[2] ? <img className={styles.smallimg} src={imgs[2]} alt="project" decoding='async' loading='lazy' /> : <p></p>}
                    <img className={styles.bigimg} src={imgs[0]} alt="project" decoding='async' loading='lazy' />
                    {imgs[1] ? <img className={styles.smallimg} src={imgs[1]} alt="project" decoding='async' loading='lazy' /> : <p></p>}
                    <div className={styles.overlay}></div>

                    {project.imgs.length > 1 && <div className={styles.project_imgs}>
                      {project.imgs.map((_, i) => (
                        <span key={i} className={styles.dot} style={{
                          backgroundColor: i === rotation % project.imgs.length ? "#fff" : "#6a6a6a",
                        }}></span>
                      ))}
                    </div>}
                  </div>

                  <div className={styles.project_text}>
                    <div className={styles.project_text_header}>
                      <h2>{project.title}</h2>

                      <div className={styles.project_status}>
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: project.status === "live" ? "#00c39a" : project.status === "archived" ? "#8a878a" : "#ffbf3c",
                          }}
                        ></span>
                        <span style={{
                          color: project.status === "live" ? "#00c39a" : project.status === "archived" ? "#8a878a" : "#ffbf3c",
                        }}>{project.status}</span>
                      </div>

                      <span className={styles.project_year}>
                        {project.year}
                      </span>
                    </div>

                    <div className={styles.project_description}>
                      {project.description}
                    </div>

                    <div className={styles.project_tags}>
                      {project.tags?.map((tag, index) => (
                        <span key={tag + index} className={styles.tag}>{tag}</span>
                      ))}
                    </div>

                    <div className={styles.project_links}>
                      {project.github && (
                        <Link href={project.github} className={styles.github} target="_blank">
                          See on GitHub
                        </Link>
                      )}

                      {project.link && (
                        <Link href={project.link} className={styles.link} target="_blank">
                          Visit Website
                          <FontAwesomeIcon icon={faExternalLink} width={13} height={13} />
                        </Link>
                      )}

                      <div className={styles.project_logo}>
                        <Image src={project.logo} alt="logo" width={30} height={30} />
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProjectsPopup;

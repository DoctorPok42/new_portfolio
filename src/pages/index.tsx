import React, { useEffect, useState } from "react";
import Head from "next/head";
import { InfoCard, LargeBox, MainBox, MediaBox, NameBox, ProjectsPopup } from "../../components";
import { faLinkedinIn, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import config from "@/../config.json";
import BlurText from "../../components/BlurText/BlurText";
import dynamic from "next/dynamic";

const MapBox = dynamic(() => import("../../components/MapBox"), {
  ssr: false,
  loading: () => <div className="mapSkeleton" />,
});

const Home = (props: { map_key: string, data: any }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 6600);
    return () => clearTimeout(t);
  }, []);

  const handleSelectedProject = (index: number) => {
    setSelectedProject(index);
    setIsExpanded(true);
  }

  return (
    <>
      <Head>
        <title>{config.name}</title>
        <meta name="description" content={`${config.name}'s personal website`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00c39a" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://doctorpok.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.name} />
        <meta property="og:description" content={`${config.name}'s personal website`} />
        <meta property="og:image" content="https://doctorpok.io/brand.png" />

        <meta property="twitter:title" content={config.name} />
        <meta property="twitter:description" content={`${config.name}'s personal website`} />
        <meta property="twitter:image:src" content="https://doctorpok.io/brand.png" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <main className="container">
        <p className="background"></p>
        <div className="content">
          <div className="head">
            <div className="partOne">
              <MainBox
                title={config.slogan}
                buttonLabel={config.contactButton}
                mail={config.mail}
                pathToResume={config.pathToResume}
              >
                {config.infoCard.map((card, index) => (
                  <InfoCard key={"info-card-" + index} title={card.title} value={card.value} color={card.color as "green" | "yellow" | "red"} index={index} />
                ))}
              </MainBox>
            </div>

            <div className="partTwo">
              <NameBox title="Status" value={config.uptime} data={props.data} {...config.uptime && { uptime: config.uptime, url: config.uptimeUrl }} />

              <div className="profil">
                <div className="profilPicture">
                  <Image src={config.imgUrl} alt="profil" width={350} height={200} quality={100} priority sizes="(max-width: 1090px) 90vw, 20vw" style={{
                    objectFit: "cover", objectPosition: "center 15%",
                  }} />
                </div>

                <div className="otherInfos">
                  <NameBox title="Name" value={config.name} />
                  <MapBox map_key={props.map_key} />
                  <MediaBox
                    icons={[
                      { icon: faLinkedinIn, link: "https://www.linkedin.com/in/remi-mazat/", backgroundColor: "#0077B5" },
                      { icon: faGithub, link: "https://github.com/DoctorPok42", backgroundColor: "#333" },
                      { icon: faAt, link: `mailto:${config.mail}`, backgroundColor: "#D14836" },
                      { icon: faDiscord, link: "https://discord.com/users/492386299190444034", backgroundColor: "#5865F2" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="about">
            <div className="projectsBox">
              <LargeBox header={{ title: "Projects", subtitle: "See all" }} canExpand size="large" setIsExpanded={setIsExpanded}>
                <div className="projects">
                  {config.projects.slice(0, 3).map((project, index) => {
                    return <div key={project.title + index} className="project" style={{
                      ["--index" as any]: index,
                    }} onClick={() => handleSelectedProject(index)}>
                      <Image
                        src={project.imgs[0]}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1090px) 90vw, 20vw"
                        quality={70}
                        priority
                      />
                      <h2>Read More</h2>
                    </div>
                  })}
                </div>
              </LargeBox>
            </div>

            <div className="aboutBox">
              <LargeBox header={{ title: "About Me", subtitle: config.about.subtitle }}>
                <h3 id="test">
                  <BlurText text={config.about.content} delay={25} animateBy="words" start={introDone} />
                </h3>
              </LargeBox>
            </div>
          </div>

          {isExpanded && <ProjectsPopup projects={config.projects} setIsExpanded={setIsExpanded} selectedProject={selectedProject} setIsSelectedProject={setSelectedProject} />}
        </div>
      </main>
    </>
  );
}

export default Home;

export const getStaticProps = async () => {
  const map_key = process.env.MAP_BOX_API_KEY || "";

  let infos = await fetch(config.github, {
    method: "GET",
    headers: {
      "Authorization": `token ${process.env.GIT_TOKEN}`,
    },
    next: {
      revalidate: 3600
    },
  });

  let data = await infos.json();


  return {
    props: {
      map_key,
      data,
    }
  }
}

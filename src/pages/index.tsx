import Head from "next/head";
import { InfoCard, LargeBox, MainBox, MapBox, MediaBox, NameBox } from "../../components";
import { faLinkedinIn, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import config from "@/../config.json";

const Home = (props: { map_key: string }) => {
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

        <div className="content">
          <div className="head">
            <div className="partOne">
              <MainBox
                title={config.slogan}
                buttonLabel={config.contactButton}
              >
                {config.infoCard.map((card, index) => (
                  <InfoCard key={index} title={card.title} value={card.value} color={card.color as "green" | "yellow" | "red"} />
                ))}
              </MainBox>
            </div>

            <div className="partTwo">
              <NameBox value={config.pseudo} />

              <div className="profil">
                <div className="profilPicture">
                  <Image src={config.imgUrl} alt="profil" fill sizes="526px" />
                </div>

                <div className="otherInfos">
                  <NameBox title="Name" value={config.name} />
                  <MapBox map_key={props.map_key}/>
                  <MediaBox
                    icons={[
                      { icon: faLinkedinIn, link: "https://www.linkedin.com/in/remi-mazat/", backgroundColor: "#0077B5" },
                      { icon: faGithub, link: "https://github.com/DoctorPok42", backgroundColor: "#333" },
                      { icon: faAt, link: "mailto:mazatremi@gmail.com", backgroundColor: "#D14836" },
                      { icon: faDiscord, link: "https://discord.com/users/492386299190444034", backgroundColor: "#5865F2" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="about">
            <LargeBox header={{ title: "Projects", subtitle: "See all" }} canExpand size="large">
              <div className="projects">
                {config.projects.map((project, index) => (
                  <div key={index} className="project">
                    <Image src={project.imgs[0]} alt={project.title} fill sizes="2048px" />
                    <h2>Read More</h2>
                  </div>
                ))}
              </div>
            </LargeBox>
            <LargeBox header={{ title: "About Me", subtitle: config.about.subtitle }}>
              <h3>
                {config.about.content}
              </h3>
            </LargeBox>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

export const getServerSideProps = async () => {
  const map_key = process.env.MAP_BOX_API_KEY;

  return {
    props: {
      map_key,
    }
  }
}

import Head from "next/head";
import { InfoCard, LargeBox, MainBox, MapBox, MediaBox, NameBox } from "../../components";
import { faLinkedinIn, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import config from "../../config.json";

const Home = (props: { map_key: string }) => {
  return (
    <>
      <Head>
        <title>{config.name}</title>
        <meta name="description" content={`${config.name}'s personal website`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            <LargeBox header={{ title: "Projects", subtitle: "See all" }} canExpand size="large" />
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

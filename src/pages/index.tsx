import Head from "next/head";
import { InfoCard, LargeBox, MainBox, MapBox, MediaBox, NameBox } from "../../components";
import { faLinkedinIn, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Home = (props: { map_key: string }) => {
  return (
    <>
      <Head>
        <title>Rémi M</title>
        <meta name="description" content="Rémi M's personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">

        <div className="content">
          <div className="head">
            <div className="partOne">
              <MainBox
                title="Bringing your ideas to life through web dev"
                buttonLabel="Contact Me"
              >
                <InfoCard title="Years Experience" value="6+" color="green" />
                <InfoCard title="Handled Project" value="30+" color="yellow" />
                <InfoCard title="Strength" value="Front" color="red" />
              </MainBox>
            </div>

            <div className="partTwo">
              <NameBox value="DoctorPok" />

              <div className="profil">
                <div className="profilPicture">
                  <Image src="/profil.png" alt="profil" fill sizes="526px" />
                </div>

                <div className="otherInfos">
                  <NameBox title="Name" value="Rémi M" />
                  <MapBox map_key={props.map_key}/>
                  <MediaBox
                    icons={[
                      { icon: faLinkedinIn, link: "https://www.linkedin.com/in/remi-mazat/", backgroundColor: "#0077B5" },
                      { icon: faGithub, link: "https://github.com/DoctorPok42", backgroundColor: "#333" },
                      { icon: faAt, link: "mailto:mazatremi@gmail.com", backgroundColor: "#D14836" },
                      { icon: faDiscord, link: "https://discord.com/users/492386299190444034", backgroundColor: "#7289DA" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="about">
            <LargeBox header={{ title: "Projects", subtitle: "See all" }} canExpand size="large" />
            <LargeBox header={{ title: "About Me", subtitle: "Who am I?" }}>
              <h3>
                I&apos;m Rémi, a web developer based in France. I have been working in the web development industry for over 6 years. I have worked on a wide range of projects, from small websites to large web applications. I am passionate about creating beautiful and functional websites that help businesses grow. I am always looking for new challenges and opportunities to learn and grow as a developer.
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

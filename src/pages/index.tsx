import Head from "next/head";
import { InfoCard, LargeBox, MainBox, MapBox, MediaBox, NameBox } from "../../components";
import { faLinkedinIn, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Home() {
const Home = (props: { map_key: string }) => {
  return (
    <>
      <Head>
        <title>Rémi Mazat</title>
        <meta name="description" content="Rémi Mazat's personal website" />
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
                  <Image src="/profil.png" alt="profil" fill />
                </div>

                <div className="otherInfos">
                  <NameBox title="Name" value="Rémi Mazat" />
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
          <div className="about"></div>
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

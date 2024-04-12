import Head from "next/head";
import { InfoCard, MainBox } from "../../components";

export default function Home() {
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
          <div className="profil">
            <MainBox
              title="Bringing your ideas to life through web dev"
              buttonLabel="Contact Me"
            >
              <InfoCard title="Years Experience" value="6+" color="green" />
              <InfoCard title="Handled Project" value="30+" color="yellow" />
              <InfoCard title="Strength" value="Front" color="red" />
            </MainBox>
          </div>
          <div className="about"></div>
        </div>
      </main>
    </>
  );
}

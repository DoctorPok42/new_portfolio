import "@/styles/globals.scss";
import { Nunito } from "next/font/google";
import type { AppProps } from "next/app";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={nunito.variable}>
      <Component {...pageProps} />
    </main>
  );
}

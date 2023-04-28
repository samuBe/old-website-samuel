import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Animation from "@/components/animation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Samuel Berton</title>
        <meta name="description" content="Samuel Berton's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hosted on{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Animation />
        </div>

        <div className={styles.grid}>
          <Link href="/about" className={styles.card}>
            <h2>
              About <span>-&gt;</span>
            </h2>
            <p>Here you can find my contact information and bio!</p>
          </Link>

          <Link href="/projects" className={styles.card}>
            <h2>
              Projects <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about some of the things I'm working on.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}

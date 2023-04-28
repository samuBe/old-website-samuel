import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import ProjectCard from "@/components/projectCard";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Projects = () => {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <Head>
          <title>Projects</title>
        </Head>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Projects</h1>
          <section className={utilStyles.headingMd}>
            <p>These are some of my projects that I'm most proud of.</p>
            <div margin="3rem 0 0">
              <Link href="/">← Back to home</Link>
            </div>
          </section>
        </div>
        <div></div>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className={styles.grid}>
          <ProjectCard
            title={"Thesis"}
            image="/images/profile.jpg"
            description="My masterthesis about Laser-powered drones."
            link="/thesis"
          />
          <ProjectCard
            title={"BrainBrowsR"}
            image="/images/profile.jpg"
            description="A brain-computer interface for Instagram."
            link="/projects/brainbrowsr"
          />
          <ProjectCard
            title={"Marketing@AFT"}
            image="/images/profile.jpg"
            description="My masterthesis about Laser-powered drones."
            link="/projects/aft"
          />
        </div>
      </main>
    </>
  );
};

export default Projects;

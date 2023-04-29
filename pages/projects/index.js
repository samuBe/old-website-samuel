import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import ProjectCard from "@/components/projectCard";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const projects = {
  projects: [
    {
      title: "Thesis",
      image: "/images/drone.svg",
      description: "My masterthesis about Laser-powered drones.",
      link: "/thesis",
    },
    {
      title: "BrainBrowsR",
      image: "/images/brain.svg",
      description: "A brain-computer interface for Instagram.",
      link: "/projects/brainbrowsr",
    },
    {
      title: "Marketing@AFT",
      image: "/images/marketing.svg",
      description: "My experience as part of the marketing team at AFT Leuven.",
      link: "/projects/aft",
    },
  ],
};

const Projects = () => {
  return (
    <>
      <Layout>
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
            <p>These are my projects that I am most proud of.</p>
          </section>
        </div>
        <div className={styles.grid}>
          {projects.projects.map((val) => (
            <ProjectCard
              key={val.title}
              title={val.title}
              image={val.image}
              description={val.description}
              link={val.link}
            />
          ))}
        </div>
        <div margin="3rem 0 0">
          <Link href="/">← Back to home</Link>
        </div>
      </Layout>
    </>
  );
};

export default Projects;

import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import styles from "@/styles/Home.module.css";
import ProjectCard from "@/components/projectCard";

const BrainBrowsR = () => {
  return (
    <Layout>
      <Head>
        <title>BrainBrowsR</title>
      </Head>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>BrainBrowsR</h1>
        <Image
          priority
          src="/images/BrainBrowsR.png"
          width={320}
          height={140}
          alt=""
        />
      </div>
      <section className={utilStyles.headingMd}>
        <p>
          BrainBrowsR is a project I did for the NeuroTech Leuven. We created a
          brain computer interface to control Instagram with.
        </p>
        <h2>Relevance</h2>
        <p></p>
        <h2>Implementation</h2>
        <p></p>
      </section>
      <div className={styles.grid}>
        <ProjectCard
          title="Check it out on github!"
          image="/images/profile.jpg"
          description=""
          link="/projects/brainbrowsr"
        />
      </div>
      <div margin="3rem 0 0">
        <Link href="/">← Back to home</Link>
      </div>
    </Layout>
  );
};

export default BrainBrowsR;

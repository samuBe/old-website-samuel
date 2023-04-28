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
        <p>
          Around the world people are living with conditions such as ALS and
          locked-in syndrome, which inhibits them from using their hands, mouth
          and legs. This makes them unable to communicate with the people around
          them.
        </p>
        <h2>Implementation</h2>
        <p>
          The Implementation of BrainBrowsR was created in JavaScript and
          Python. More information on the project can be found on our GitHub.
        </p>
      </section>
      <div className={styles.grid}>
        <Link
          href={"https://github.com/NeuroTech-Leuven/BrainBrowsR"}
          className={styles.card}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              priority
              src="/images/github.svg"
              alt=""
              width={50}
              height={50}
              className={styles.vercelLogo}
            />
            <h2 style={{ marginLeft: "10px", marginBottom: "0" }}>
              {"Check it out on GitHub!"}
            </h2>
          </div>
        </Link>
      </div>
      <div margin="3rem 0 0">
        <Link href="/projects">← Back to projects</Link>
      </div>
    </Layout>
  );
};

export default BrainBrowsR;

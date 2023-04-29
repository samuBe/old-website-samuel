import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import styles from "@/styles/Home.module.css";
import ImageComponent from "@/components/imageComponent.js";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>Thesis</title>
      </Head>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Control of laser-powered drones</h1>
        <Image
          priority
          src="/images/drone.svg"
          height={144}
          width={144}
          alt=""
          className={styles.projectIcon}
        />
      </div>
      <section className={utilStyles.headingMd}>
        <p>
          For my master in Mathematical Engineering I wrote a thesis on the
          control of laser-powered drones.
        </p>
        <h2>Problem Statement</h2>
        <p>
          Implement control strategies for drone and ground station in order to
          charge a drone while it is following a path. In this thesis, two
          different cases are discussed:
        </p>
        <ol style={{ listStylePosition: "inside" }}>
          <li>
            Deliver power to a single drone while it follows a path, deciding
            inputs to both drone and path,
          </li>
          <li>
            Multiple drones with hindered line-of-sight of one the leader drone.
          </li>
        </ol>
        <h2>Applications</h2>
        <p>Longer battery life could help in a variety of applications:</p>
        <ol style={{ listStylePosition: "inside" }}>
          <li>Aerial surveillance: allows for continuous observation,</li>
          <li>
            Monitoring: perform monitoring tasks in an abbreviated time, without
            taxiing and recharging,
          </li>
          <li>Delivery: flying longer distances without recharging.</li>
        </ol>
        <h2>Approach</h2>
        <h3>Single drone</h3>
        <ImageComponent name="/images/thesis/approach_1" />
        <p>Control a single drone so that it tracks a given path.</p>
        <p>Goals:</p>
        <ol style={{ listStylePosition: "inside" }}>
          <li>Build simulation system,</li>
          <li>Familiarize with MPC,</li>
          <li>Use as benchmark.</li>
        </ol>

        <h3>Decoupled</h3>
        <ImageComponent name="/images/thesis/approach_2" />
        <p>Track a drone using the laser to deliver power.</p>
        <p>Goals:</p>
        <ol style={{ listStylePosition: "inside" }}>
          <li>Introduce the ground station,</li>
          <li>Improve this by coupling.</li>
        </ol>

        <h3>Coupled</h3>
        <ImageComponent name="/images/thesis/approach_3" />
        <p>
          In the coupled approach, the expected future position of the drone is
          used in calculating the control action of the ground station. This
          should improve the charging.
        </p>

        <h3>Multi drone</h3>
        <ImageComponent name="/images/thesis/approach_4" />
        <p>
          When there is no direct line-of-sight, one drone is used to reflect
          the laser onto another to charge it with a mirror.
        </p>
      </section>
      <div margin="3rem 0 0">
        <Link href="/projects">← Back to projects</Link>
      </div>
    </Layout>
  );
};

export default About;

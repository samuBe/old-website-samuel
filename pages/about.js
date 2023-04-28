import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import ContactGrid from "@/components/contactgrid";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginBottom: "30px",
        }}
      >
        <h1>About Samuel Berton</h1>
        <Image
          priority
          src="/images/profile.jpg"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt=""
        />
        <ContactGrid />
      </div>
      <section className={utilStyles.headingMd}>
        <p>
          Hello I'm Samuel. I'm studying Mathematical Engineering at KU Leuven.
          Feel free to contact me about anything!
        </p>
      </section>
      <div margin="3rem 0 0">
        <Link href="/">← Back to home</Link>
      </div>
    </Layout>
  );
};

export default About;

import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";

const AFT = () => {
  return (
    <Layout>
      <Head>
        <title>Marketing@AFT</title>
      </Head>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Marketing@AFT</h1>
        <div>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            width={144}
            height={144}
            alt=""
          />
        </div>
      </div>
      <section className={utilStyles.headingMd}>
        <h2>What is marketing?</h2>
        <p>
          As a marketing member of AFT, I worked close with all the teams to
          create a strategy for their event. We drafted various strategies and
          executed them.
        </p>
        <h2>Skills learned</h2>
        <p>
          At AFT, I learned a variety of skills, such as planning and
          organisation. Moreover, I also learned to work with the Adobe Suite,
          programs such as Illustrator and PhotoShop have become my second
          nature.
        </p>
      </section>
      <div margin="3rem 0 0">
        <Link href="/projects">← Back to projects</Link>
      </div>
    </Layout>
  );
};

export default AFT;

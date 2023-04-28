import styles from "@/styles/Home.module.css";
import Link from "next/link";
import gridStyle from "./contactGrid.module.css";
import Image from "next/image";

const ContactGrid = () => {
  const handleClick = () => {
    window.location.href = "mailto:samuelberton.sb@gmail.com";
  };

  return (
    <div className={gridStyle.grid}>
      <Link
        href="https://www.linkedin.com/in/samuel-berton/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        <Image
          priority
          src="images/linkedin.svg"
          alt=""
          width={50}
          height={50}
        />
      </Link>
      <button className={styles.card} onClick={handleClick}>
        <Image priority src="images/email.svg" alt="" width={50} height={50} />
      </button>
    </div>
  );
};

export default ContactGrid;

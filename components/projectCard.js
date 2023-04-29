import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const ProjectCard = ({ image, title, description, link }) => {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          priority
          src={image}
          alt=""
          width={50}
          height={50}
          className={styles.projectIcon}
        />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;

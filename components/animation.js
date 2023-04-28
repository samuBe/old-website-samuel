import styles from "@/styles/Animation.module.css";
import { useEffect, useState } from "react";

const roles = ["Designer", "Engineer", "Developer", "Strategist"];

const time = 2;

export default function Animation() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(
        (currentRoleIndex) => (currentRoleIndex + 1) % roles.length
      );
    }, time * 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.large}>Hi, my name is Samuel!</h1>
      <h1 className={styles.large}>{`${roles[currentRoleIndex]}`}</h1>
    </div>
  );
}

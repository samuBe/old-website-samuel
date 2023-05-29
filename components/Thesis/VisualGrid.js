import ProjectCard from "../projectCard";
import styles from "@/styles/Home.module.css";

export const VisualGrid = ({ strategy = "mpc" }) => {
  const scenes = ["solarpark", "windturbine", "checkpoints"];
  const descriptions = {
    solarpark: "Inspecting a number of solar panels one by one.",
    windturbine: "Flying in a helical shape around a windturbine.",
    checkpoints: "Drone flying to different checkpoints without logic.",
  };

  return (
    <div className={styles.grid3}>
      {scenes.map((scene) => (
        <ProjectCard
          key={`${strategy}_${scene}`}
          title={scene.charAt(0).toUpperCase() + scene.slice(1)}
          description={descriptions[scene]}
          image={`/images/thesis/${scene}.svg`}
          link={`/thesis/${scene}/${strategy}`}
          target={"_blank"}
        />
      ))}
    </div>
  );
};

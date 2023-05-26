import { useRouter } from "next/router";
import css from "@/styles/Home.module.css";
import { Visual } from "@/components/Thesis/loadVisualByJson";
import { WindTurbine } from "@/components/Thesis/windturbine";
import { SolarPanel, SolarPark } from "@/components/Thesis/SolarPark";

const DataPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // render the data
  return (
    <div className={css.scene}>
      {id && (
        <Visual json={`/json/windturbine/${id}.json`}>
          <SolarPark />
          <WindTurbine actualHeight={120} positionX={30} />
        </Visual>
      )}
    </div>
  );
};

export default DataPage;

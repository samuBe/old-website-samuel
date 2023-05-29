import { useRouter } from "next/router";
import css from "@/styles/Home.module.css";
import { Visual } from "@/components/Thesis/loadVisualByJson";
import { SolarPark } from "@/components/Thesis/SolarPark";
import { Suspense } from "react";

const DataPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // render the data
  return (
    <div className={css.scene}>
      {id && (
        <Visual json={`/json/solarpark/${id}.json`}>
          <Suspense>
            <SolarPark />
          </Suspense>
        </Visual>
      )}
    </div>
  );
};

export default DataPage;

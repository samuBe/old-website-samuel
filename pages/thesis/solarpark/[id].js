import { useRouter } from "next/router";
import css from "@/styles/Home.module.css";
import { Visual } from "@/components/Thesis/loadVisualByJson";
import { WindTurbine } from "@/components/Thesis/windturbine";
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
            <WindTurbine actualHeight={120} positionX={30} />
          </Suspense>
        </Visual>
      )}
    </div>
  );
};

export default DataPage;

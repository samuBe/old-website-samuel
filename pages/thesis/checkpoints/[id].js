import { useRouter } from "next/router";
import css from "@/styles/Home.module.css";
import { Visual } from "@/components/Thesis/loadVisualByJson";

const DataPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // render the data
  return (
    <div className={css.scene}>
      {id && <Visual json={`/json/checkpoints/${id}.json`} />}
    </div>
  );
};

export default DataPage;

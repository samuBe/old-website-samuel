import Scene from "@/components/Thesis/Scene";
import { useState, useEffect } from "react";
import css from "@/styles/Home.module.css";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/json/checkpoints/twoDrone.json");
        const dat = await response.json();
        setData(dat);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className={css.scene}>
        {data ? <Scene data={data} /> : <div></div>}
      </div>
    </>
  );
}

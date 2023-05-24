import Scene from "@/components/Scene";
import { useState, useEffect } from "react";

export function Visual({ json }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(json);
        const dat = await response.json();
        setData(dat);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [json]);

  return <>{data ? <Scene data={data} /> : <div></div>}</>;
}

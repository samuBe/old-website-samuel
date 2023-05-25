import Scene from "@/components/Thesis/Scene";
import { useState, useEffect } from "react";

export function Visual({ json, children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (json) {
          const response = await fetch(json);
          const dat = await response.json();
          setData(dat);
        }
      } catch (error) {
        console.log(json);
        console.log(error);
      }
    })();
  }, [json]);

  return <>{data ? <Scene data={data}>{children}</Scene> : <div></div>}</>;
}

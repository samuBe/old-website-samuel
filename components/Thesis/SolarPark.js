import { useRef } from "react";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3 } from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

export function SolarPanel({ posX = 0, posY = 0 }) {
  const mesh = useRef();

  const gltf = useLoader(GLTFLoader, "/solarPanel.glb");

  const model = useMemo(() => {
    const model = gltf.scene.clone();

    let box = new Box3().setFromObject(model);
    let modelWidth = box.max.x - box.min.x;
    let modelDepth = box.max.z - box.min.z;

    let scaleX = 1 / modelWidth;
    let scaleZ = 2 / modelDepth;

    let scale = Math.min(scaleX, scaleZ);

    model.scale.set(scale, scale, scale);

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return model;
  }, [gltf]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.x = posY;
      mesh.current.position.z = posX;
    }
  });

  return <>{model ? <primitive ref={mesh} object={model} /> : null}</>;
}

export const SolarPark = ({
  nx = 20,
  ny = 20,
  dX = 1,
  dY = 2,
  start = [0, 0],
}) => {
  let path = [start];
  let [x, y] = start;

  for (let i = 1; i < ny; i++) {
    // go to the next point in the y direction
    let nextPoint = [x, y + dY * i];
    path.push(nextPoint);
  }

  for (let j = 1; j < nx; j++) {
    // go to the next point in the x direction
    let nextPoint = [x + dX * j, y + (j % 2) * dY * (ny - 1)];
    path.push(nextPoint);

    for (let i = 1; i < ny; i++) {
      // go to the next point in the y direction
      nextPoint = [x + dX * j, y + (j % 2) * dY * (ny - 1) - dY * i];
      path.push(nextPoint);
    }

    // Reverse the direction in y-axis for the next column of x points
    dY *= -1;
  }
  return (
    <>
      {path.map((coor) => (
        <SolarPanel key={coor} posX={coor[0]} posY={coor[1]} />
      ))}
    </>
  );
};

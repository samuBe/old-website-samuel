import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Box3 } from "three";
import { useRef } from "react";
import { GLTFLoader } from "three-stdlib";

export const WindTurbine = ({
  actualHeight = 100,
  positionX = 20,
  positionY = 0,
}) => {
  const mesh = useRef();

  const gltf = useLoader(GLTFLoader, "/wind_turbine.glb");

  const model = useMemo(() => {
    const model = gltf.scene.clone();

    let box = new Box3().setFromObject(model);
    let height = box.max.y - box.min.y;

    let scaleZ = actualHeight / height;

    let scale = scaleZ;

    model.scale.set(scale, scale, scale);
    model.castShadow = true;

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
      if (object.isObject3D) {
        object.castShadow = true;
      }
    });

    console.log(model);

    return model;
  }, [gltf, actualHeight]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.z = positionX;
      mesh.current.position.x = positionY;

      mesh.current.rotation.y = Math.PI;
    }
  });

  return <>{model ? <primitive ref={mesh} object={model} /> : null}</>;
};

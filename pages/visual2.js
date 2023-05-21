// pages/index.js
import React, { Suspense, use, useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Plane,
  Sphere,
  useTexture,
} from "@react-three/drei";
import myJson from "@/public/debug.json";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping, NearestFilter, DoubleSide } from "three";
import css from "@/styles/Home.module.css";
import Telemetry from "@/components/telemetry";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const IndContext = React.createContext({ ind: 0, setInd: () => {} });

function Drone({ index }) {
  const mesh = useRef();
  const [model, setModel] = useState();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/scene.gltf", (gltf) => {
      const model = gltf.scene;

      let box = new THREE.Box3().setFromObject(model);
      let modelWidth = box.max.x - box.min.x;
      let modelHeight = box.max.y - box.min.y;
      let modelDepth = box.max.z - box.min.z;

      let scaleX = 0.3 / modelWidth;
      let scaleY = 0.3 / modelHeight;
      let scaleZ = 0.3 / modelDepth;

      let scale = Math.min(scaleX, scaleY, scaleZ);

      model.scale.set(scale, scale, scale);

      setModel(model);
      setModel(gltf.scene);
    });
  }, []);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.x = myJson.results[index].drone.states[0];
      mesh.current.position.y = myJson.results[index].drone.states[1];
      mesh.current.position.z = myJson.results[index].drone.states[2];
    }
  }, [index]);

  return model ? <primitive ref={mesh} object={model} /> : null;
}

function Ground() {
  const texture = useTexture("/textures/grass.png");
  const planeSize = 8000;
  const repeats = planeSize / 2;

  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeats, repeats);
  texture.magFilter = NearestFilter;

  return (
    <Plane rotation-x={Math.PI * -0.5} args={[planeSize, planeSize]}>
      <meshPhongMaterial map={texture} side={DoubleSide} />
    </Plane>
  );
}

const Players = () => {
  const { ind, setInd } = useContext(IndContext);
  let elapsedTime = useRef(0);

  useFrame((state, delta) => {
    elapsedTime.current += delta;

    if (elapsedTime.current > myJson.timeStep) {
      let newInd = ind + 1;

      // Ensure the index stays within the bounds of the array
      if (newInd >= myJson.results.length) {
        newInd = 0;
      }

      setInd(newInd);
      elapsedTime.current = 0;
    }
  });

  return <></>;
};

const Scene = () => {
  return null;
};

export default function Home() {
  const res = myJson.results;

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/debug.json");
        const dat = await response.json();
        console.log("this");
        setData(dat);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [ind, setInd] = useState(0);

  return (
    <>
      <div className={css.scene}>
        <IndContext.Provider value={{ ind, setInd }}>
          <Telemetry current={res[ind]} />
          <Canvas>
            <color attach="background" args={["#87ceeb"]} />
            <Ground />
            <Players />
            <Drone index={ind} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <perspectiveCamera position={[0, 10, 20]} fov={45} />
          </Canvas>
        </IndContext.Provider>
      </div>
    </>
  );
}

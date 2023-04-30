// pages/index.js
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, Sphere, useTexture } from "@react-three/drei";
import myJson from "@/public/debug.json";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping, NearestFilter, DoubleSide } from "three";
import css from "@/styles/Home.module.css";
import Telemetry from "@/components/telemetry";
import { useState } from "react";

function Drone() {
  const mesh = useRef();
  let ind = useRef(0);
  let elapsedTime = useRef(0);

  useFrame((state, delta) => {
    elapsedTime.current += delta;

    if (elapsedTime.current > myJson.timeStep) {
      ind.current += 1;

      // Ensure the index stays within the bounds of the array
      if (ind.current >= myJson.results.length) {
        ind.current = 0;
      }

      elapsedTime.current = 0;
      mesh.current.position.x = myJson.results[ind.current].drone.states[0];
      mesh.current.position.y = myJson.results[ind.current].drone.states[1];
      mesh.current.position.z = myJson.results[ind.current].drone.states[2];
    }
  });

  return (
    <Sphere ref={mesh} args={[0.3, 64, 64]}>
      <meshStandardMaterial color="#00ff83" />
    </Sphere>
  );
}

function Ground() {
  const texture = useTexture(
    "https://threejs.org/manual/examples/resources/images/checker.png"
  );
  const planeSize = 40;
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

export default function Home() {
  console.log(myJson);

  const [animationTime, setAnimationTime] = useState(0);
  const droneRef = useRef({ x: 0, y: 0, z: 0 });
  const cameraRef = useRef();

  const handleTimeUpdate = (time) => {
    setAnimationTime(time);
  };

  return (
    <div className={css.scene}>
      <Canvas>
        <color attach="background" args={["#000"]} />
        <Suspense fallback={null}>
          <Drone />
          <Ground />
        </Suspense>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <pointLight intensity={1} position={[0, 10, 10]} distance={100} />
        <perspectiveCamera position={[0, 10, 20]} fov={45} />
      </Canvas>
    </div>
  );
}

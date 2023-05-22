// pages/index.js
import React, { Suspense, use, useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Plane,
  Sphere,
  useTexture,
  Line,
  Bounds,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping, NearestFilter, DoubleSide } from "three";
import css from "@/styles/Home.module.css";
import Telemetry from "@/components/telemetry";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { zip } from "lodash";

const IndContext = React.createContext({ ind: 0, setInd: () => {} });

function limitedPush(arr, element, maxSize) {
  arr.push(element);
  return arr.slice(Math.max(arr.length - maxSize, 0));
}

function Drone({ states, color }) {
  const mesh = useRef();
  const [model, setModel] = useState();
  const points = useRef([]);

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
    const displacement = Math.sqrt(
      (points.current[points.current.length - 1] ?? states).reduce(
        (sum, value, index) => sum + (value - states[index]) ** 2,
        0
      )
    );
    if (displacement > 1) {
      points.current = [];
    }
    points.current = limitedPush(points.current, states.slice(0, 3), 20);
    if (mesh.current) {
      mesh.current.position.x = states[0];
      mesh.current.position.y = states[1];
      mesh.current.position.z = states[2];
      mesh.current.rotation._x = states[6];
      mesh.current.rotation._y = states[7];
      mesh.current.rotation._z = states[8];
    }
  }, [states]);

  return (
    <>
      <Line
        points={
          points.current.length < 2
            ? [
                [0, 0, 0],
                [0, 0, 0],
              ]
            : points.current
        }
        color={color ?? "blue"}
        lineWidth={2}
      />
      {model ? <primitive ref={mesh} object={model} /> : null}
    </>
  );
}

const Reference = ({ color, position }) => {
  const mesh = useRef();

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.x = position[0];
      mesh.current.position.y = position[1];
      mesh.current.position.z = position[2];
    }
  });

  return (
    <Sphere ref={mesh} args={[0.1, 64, 64]}>
      <meshBasicMaterial color={color ?? "#00ff83"} />
    </Sphere>
  );
};

const Laser = ({ angles }) => {
  const mesh = useRef();
  const end = useRef([5, 0, 0]);
  const begin = [0, 0, 0];

  useEffect(() => {
    if (mesh.current) {
      //update the direction
      let theta = angles[0];
      let phi = angles[1];
      let direction = Array(3);
      direction[0] = Math.sin(phi) * Math.cos(theta);
      direction[1] = Math.sin(phi) * Math.sin(theta);
      direction[2] = Math.cos(phi);
      end.current = direction.map((el) => 10 * el);
    }
  }, [angles]);

  return (
    <Line ref={mesh} points={[begin, end.current]} color="red" lineWidth={2} />
  );
};

function Ground() {
  const texture = useTexture("/textures/grass.png");
  const planeSize = 5000;
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

const Players = ({ speed, isPaused, max, timeStep }) => {
  const { ind, setInd } = useContext(IndContext);
  let elapsedTime = useRef(0);

  useFrame((state, delta) => {
    elapsedTime.current += delta;

    if (elapsedTime.current * Math.abs(speed) > timeStep) {
      let newInd = isPaused ? ind : ind + Math.sign(speed);

      // Ensure the index stays within the bounds of the array
      if (newInd >= max) {
        newInd = 0;
      }

      if (newInd < 0) {
        newInd = max - 1;
      }

      setInd(newInd);
      elapsedTime.current = 0;
    }
  });

  return <></>;
};

const Scene = ({ data }) => {
  const [ind, setInd] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const camera = useRef();

  const refIndex = () => {
    const refInd = ind + speed;
    if (refInd < 0) {
      return 0;
    }
    if (refInd >= data.results.length) {
      return ind;
    }
    return refInd;
  };

  const initPlayer = (playerName) => {
    switch (playerName) {
      case "drone":
        return (
          <Drone key={playerName} states={data.results[ind].drone.states} />
        );
      case "station":
        return (
          <>
            <Reference color="black" position={[0, 0, 0]} />
            <Laser angles={data.results[ind].station.states} />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <IndContext.Provider value={{ ind, setInd }}>
      <Telemetry
        current={data.results[ind]}
        setIsPaused={setIsPaused}
        setSpeed={setSpeed}
        isPaused={isPaused}
      />
      <Canvas
        camera={{
          position: [-10, 10, 5],
          fov: 45,
          rotation: [Math.PI / 4, Math.PI / 4, 0],
        }}
      >
        <color attach="background" args={["#87ceeb"]} />
        <Ground />
        <Players
          speed={speed}
          isPaused={isPaused}
          max={data.results.length}
          timeStep={data.timeStep}
        />
        <Bounds fit clip observe margin={1.1}>
          <>{data.players.map((element) => initPlayer(element))}</>
          <Reference position={data.results[refIndex()].reference} />
        </Bounds>
        <OrbitControls makeDefault={true} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </IndContext.Provider>
  );
};

const Camera = ({ position }) => {
  const { camera, set } = useThree();

  useEffect(() => {
    console.log(position);
    if (camera.current) {
      camera.position.x = position.x;
      camera.position.y = position.y;
      camera.position.z = position.z;
      set({ target: center, position: camera.position });
    }
  }, [position, camera, set]);

  return <></>;
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/json/checkpoints/coupled.json");
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

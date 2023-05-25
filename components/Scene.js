// pages/index.js
import React, { useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Plane,
  Sphere,
  useTexture,
  Line,
  Bounds,
  GizmoViewport,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping, NearestFilter, DoubleSide } from "three";
import Telemetry from "@/components/telemetry";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SpacebarTogglePause from "@/components/SpaceBarToggle";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Box3 } from "three";
import { GizmoHelper, GizmoViewcube } from "@react-three/drei";

const IndContext = React.createContext({ ind: 0, setInd: () => {} });

function limitedPush(arr, element, maxSize) {
  arr.push(element);
  return arr.slice(Math.max(arr.length - maxSize, 0));
}

function switchXYZ(variable) {
  return [variable[1], variable[2], variable[0]];
}

function Drone({ states, color }) {
  const mesh = useRef();
  const points = useRef([]);

  const gltf = useLoader(GLTFLoader, "/scene.gltf");

  const model = useMemo(() => {
    const model = gltf.scene.clone();

    let box = new Box3().setFromObject(model);
    let modelWidth = box.max.x - box.min.x;
    let modelHeight = box.max.y - box.min.y;
    let modelDepth = box.max.z - box.min.z;

    let scaleX = 0.3 / modelWidth;
    let scaleY = 0.3 / modelHeight;
    let scaleZ = 0.3 / modelDepth;

    let scale = Math.min(scaleX, scaleY, scaleZ);

    model.scale.set(scale, scale, scale);

    return model;
  }, [gltf]);

  useEffect(() => {
    const pos = switchXYZ(states.slice(0, 3));
    const displacement = Math.sqrt(
      (points.current[points.current.length - 1] ?? pos).reduce(
        (sum, value, index) => sum + (value - pos[index]) ** 2,
        0
      )
    );
    if (displacement > 1) {
      // Avoid teleportation
      points.current = [];
    }
    points.current = limitedPush(points.current, pos, 20);
    if (mesh.current) {
      mesh.current.position.x = pos[0];
      mesh.current.position.y = pos[1];
      mesh.current.position.z = pos[2];
      const rot = switchXYZ(states.slice(6, 9));
      mesh.current.rotation._x = rot[0];
      mesh.current.rotation._y = rot[1];
      mesh.current.rotation._z = rot[2];
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
      const pos = switchXYZ(position);
      mesh.current.position.x = pos[0];
      mesh.current.position.y = pos[1];
      mesh.current.position.z = pos[2];
    }
  }, [position]);

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
      direction = switchXYZ(direction);
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
      case "leader":
        return (
          <Drone
            key={playerName}
            states={data.results[ind].leader.states}
            color={"red"}
          />
        );
      case "reflector":
        return (
          <Drone
            key={playerName}
            states={data.results[ind].reflector.states}
            color={"blue"}
          />
        );
      case "station":
        return (
          <>
            <Reference color="black" position={[0, 0, 0]} />
            <Line
              points={[
                [0, 0, 0],
                [1, 0, 0],
              ]}
              lineWidth={2}
              color={"red"}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 0, 1],
              ]}
              lineWidth={2}
              color={"blue"}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 1, 0],
              ]}
              lineWidth={2}
              color={"green"}
            />
            <Laser angles={data.results[ind].station.states} />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <IndContext.Provider value={{ ind, setInd }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Telemetry
          current={data.results[ind]}
          setIsPaused={setIsPaused}
          setSpeed={setSpeed}
          isPaused={isPaused}
        />
        <SpacebarTogglePause setIsPaused={setIsPaused} />
        <Canvas
          camera={{
            position: [-10, 10, 5],
            fov: 45,
            rotation: [Math.PI / 4, Math.PI / 4, 0],
          }}
          style={{ alignSelf: "center" }}
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
          <GizmoHelper
            alignment={"bottom-right"} // alignment according to viewport
            margin={[80, 80]} // margin from edges
            onUpdate={() => true} // make GizmoHelper always visible
            controls="OrbitControls"
          >
            <GizmoViewcube faces={["+Y", "-Y", "+Z", "-Z", "+X", "-X"]} />
          </GizmoHelper>
          <OrbitControls makeDefault={true} />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
    </IndContext.Provider>
  );
};

export default Scene;

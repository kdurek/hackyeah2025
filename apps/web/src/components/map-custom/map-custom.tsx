// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ACTOR_TYPES_COLORS } from "@/const/const";
// import { useEffect, useState } from "react";
import { orpc } from "@/utils/orpc";
import styles from "./map-custom.module.scss";

const Marker = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <div
    className={styles.marker}
    style={{
      border: `3px solid ${color}`,
      left: `${x}%`,
      bottom: `${y}%`,
    }}
  />
);

const MapCustom = () => {
  const actors = useQuery(
    orpc.actor.getAll.queryOptions({
      refetchInterval: 1000,
    })
  );
  //   const [state, setState] = useState<[number, number]>([0, 100]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setState(([x, y]) => {
  //         if (x >= 100) {
  //           return [0, 0];
  //         }
  //         return [x + 5, y - 5];
  //       });
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapCustom}>
        {/* <div
          className={styles.marker}
          style={{
            transform: `translate(${state[0] * 10}%, ${state[1] * 10}%)`,
            left: 0,
            bottom: 0,
          }}
        /> */}
        {actors.data?.map((actor) => (
          <Marker
            color={ACTOR_TYPES_COLORS[actor.alignment]}
            key={actor.id}
            x={actor.localPosition.x}
            y={actor.localPosition.z}
          />
        ))}
        {/* <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "white",
            background: "black",
            padding: "5px",
          }}
        >
          X: {state[0]}, Y: {state[1]}
        </div> */}
      </div>
    </div>
  );
};

export { MapCustom };

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import type { useSimulatedActorsReturnType } from "@/hooks/useSimulatedActors";
import { useIsMock } from "@/pages/index";
import { orpc } from "@/utils/orpc";
import type { ActorType } from "../../../../server/prisma/generated/client";
import styles from "./map-custom.module.scss";

/**
 *
 * TODO
 * 1. Add rotation to the markers
 * 2. Add actor type to the markers, eg, tank
 */

// type MarkerData = {
//   id: string;
//   x: number;
//   y: number;
//   color: string;
// };

const Marker = ({
  x,
  y,
  color,
  rotation,
  actorType,
}: {
  x: number;
  y: number;
  color: string;
  rotation: { x: number; y: number; z: number };
  actorType: ActorType;
}) => (
  <div
    className={styles.markerWrapper}
    style={{
      left: `${x}%`,
      bottom: `${y}%`,
      transform: "translate(-50%, 50%)",
      ...(actorType !== "DRONE" && {
        filter: "none",
      }),
    }}
  >
    <div
      className={styles.marker}
      style={{
        border: `3px solid ${color}`,
        backgroundColor: color,
        transform: `rotate(${rotation.y}deg)`,
        // ROMB
        ...(actorType === "DRONE" && {
          width: 25,
          height: 25,
          clipPath: "polygon(50% 0%, 85% 50%, 50% 100%, 15% 50%)",
          filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))",
        }),
        // SQUARE
        ...(actorType === "ARMOR" && {
          width: 20,
          height: 20,
        }),
        // CIRCLE
        ...(actorType === "INFANTRY" && {
          width: 20,
          height: 20,
          borderRadius: "100%",
        }),
      }}
    >
      {/* {rotation.x} , {rotation.y} , {rotation.z} */}
    </div>
  </div>
);

// function useSimulatedMarkers(spawnIntervalMs: number): MarkerData[] {
//   const [simulatedMarkers, setSimulatedMarkers] = useState<MarkerData[]>([]);

//   useEffect(() => {
//     const colors = Object.values(ACTOR_TYPES_COLORS);
//     const interval = setInterval(() => {
//       const newMarker: MarkerData = {
//         id: `simulated-${Date.now()}-${Math.random()}`,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       };
//       setSimulatedMarkers((prev) => [...prev, newMarker]);
//     }, spawnIntervalMs);

//     return () => clearInterval(interval);
//   }, [spawnIntervalMs]);

//   return simulatedMarkers;
// }

const MapCustom = ({ actors }: { actors: useSimulatedActorsReturnType }) => {
  const isMock = useIsMock();

  const actorsQ = useQuery(
    orpc.actor.getAll.queryOptions({
      refetchInterval: 1000,
      enabled: !isMock,
    })
  );

  if (!isMock) {
    actors = actorsQ;
  }

  //   const simulatedMarkers = useSimulatedMarkers(2000);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapCustom}>
        {actors.data?.map((actor) => (
          <Marker
            actorType={actor.type}
            color={ACTOR_TYPES_COLORS[actor.alignment]}
            key={actor.id}
            rotation={actor.rotation}
            x={actor.localPosition.x}
            y={actor.localPosition.z}
          />
        ))}
        {/* {simulatedMarkers.map((marker) => (
          <Marker
            color={marker.color}
            key={marker.id}
            x={marker.x}
            y={marker.y}
          />
        ))}  */}
      </div>
    </div>
  );
};

export { MapCustom };

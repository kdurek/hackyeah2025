import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import type { useSimulatedActorsReturnType } from "@/hooks/useSimulatedActors";
import { orpc } from "@/utils/orpc";
import type { Actor } from "../../../../server/prisma/generated/client";
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
  //   const actors = useQuery(
  //     orpc.actor.getAll.queryOptions({
  //       refetchInterval: 1000,
  //     })
  //   );

  //   const simulatedMarkers = useSimulatedMarkers(2000);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapCustom}>
        {actors.data?.map((actor) => (
          <Marker
            color={ACTOR_TYPES_COLORS[actor.alignment]}
            key={actor.id}
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

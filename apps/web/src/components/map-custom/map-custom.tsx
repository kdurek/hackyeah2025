import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import { orpc } from "@/utils/orpc";
import styles from "./map-custom.module.scss";

type MarkerData = {
  id: string;
  x: number;
  y: number;
  color: string;
};

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

  const [simulatedMarkers, setSimulatedMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const colors = Object.values(ACTOR_TYPES_COLORS);

    const interval = setInterval(() => {
      const newMarker: MarkerData = {
        id: `simulated-${Date.now()}-${Math.random()}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSimulatedMarkers((prev) => [...prev, newMarker]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
        {simulatedMarkers.map((marker) => (
          <Marker
            color={marker.color}
            key={marker.id}
            x={marker.x}
            y={marker.y}
          />
        ))}
      </div>
    </div>
  );
};

export { MapCustom };

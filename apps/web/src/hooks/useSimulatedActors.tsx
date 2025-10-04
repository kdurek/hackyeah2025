import { useEffect, useState } from "react";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import type { Actor } from "@/types/actor";

type AlignmentKey = keyof typeof ACTOR_TYPES_COLORS;

export type useSimulatedActorsReturnType = {
  data: Actor[];
};

export function useSimulatedActors(
  spawnIntervalMs: number
): useSimulatedActorsReturnType {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    const alignmentKeys = Object.keys(ACTOR_TYPES_COLORS) as AlignmentKey[];

    const interval = setInterval(() => {
      const alignment =
        alignmentKeys[Math.floor(Math.random() * alignmentKeys.length)];

      const types = ["DRONE", "ARMOR", "INFANTRY"] as const;
      const type = types[Math.floor(Math.random() * types.length)];

      const newActor: Actor = {
        id: `sim-actor-${Date.now()}-${Math.random()}`,
        mapCoords: { lat: 0, lon: 0 },
        localPosition: {
          x: Math.random() * 100,
          y: 0,
          z: Math.random() * 100,
        },
        rotation: { x: 0, y: 0, z: 0 },
        type,
        alignment,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setActors((prev) => [...prev, newActor]);
    }, spawnIntervalMs);

    return () => clearInterval(interval);
  }, [spawnIntervalMs]);

  return { data: actors };
}

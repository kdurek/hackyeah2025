import { useQuery } from "@tanstack/react-query";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import type { useSimulatedActorsReturnType } from "@/hooks/useSimulatedActors";
import { orpc } from "@/utils/orpc";
import styles from "./grid.module.scss";

const Grid = ({ actors }: { actors: useSimulatedActorsReturnType }) => {
  // const actors = useQuery(orpc.actor.getAll.queryOptions());
  // const actors = {
  //   data: Array.from({ length: 6 })
  //     .fill(null)
  //     .map(() => ({
  //       id: "01K6QPS3TMRBYGXS22ZVY0MH87",
  //       externalId: "ASDSADSA",
  //       mapCoords: { lat: 12_335_213, lon: 355 },
  //       localPosition: { x: -5, y: 12 },
  //       type: "DRONE",
  //     })),
  // };

  if (!actors.data) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {actors.data.map((item) => (
        <div className={styles.gridItem} key={item.id}>
          <div
            className={styles.avatar}
            style={{ color: ACTOR_TYPES_COLORS[item.alignment] }}
          >
            WG
          </div>
          <div className={styles.middle}>{item.type}</div>
          <div className={styles.actions}>actions</div>
        </div>
      ))}
    </div>
  );
};

export { Grid };

import { Grid } from "@/components/grid/grid";
import { MapCustom } from "@/components/map-custom/map-custom";
import { useSimulatedActors } from "@/hooks/useSimulatedActors";
import styles from "./index.module.scss";

const IndexPage = () => {
  const simulatedActors = useSimulatedActors(2000);

  return (
    <div className={styles.index}>
      <MapCustom actors={simulatedActors} />

      <Grid actors={simulatedActors} />
    </div>
  );
};

export { IndexPage };

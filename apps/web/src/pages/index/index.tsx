import { Grid } from "@/components/grid/grid";
import { MapCustom } from "@/components/map-custom/map-custom";
import styles from "./index.module.scss";

const IndexPage = () => (
  <div className={styles.index}>
    <MapCustom />

    <Grid />
  </div>
);

export { IndexPage };

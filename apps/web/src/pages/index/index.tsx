import { createContext, useContext, useState } from "react";
import { CameraFeed } from "@/components/camera-feed/camera-feed";
import { Grid } from "@/components/grid/grid";
import { MapCustom } from "@/components/map-custom/map-custom";
import { useSimulatedActors } from "@/hooks/useSimulatedActors";
import styles from "./index.module.scss";

const MockContext = createContext(false);

export const useIsMock = () => useContext(MockContext);

const IndexPage = () => {
  const simulatedActors = useSimulatedActors(1000);

  const [selected, setSelected] = useState(null);

  const [isMock, setIsMock] = useState(false);

  return (
    <MockContext.Provider value={isMock}>
      {/* <button
        onClick={() => {
          setIsMock((m) => !m);
          simulatedActors.reset();
        }}
        type="button"
      >
        Toggle Mock Data: {isMock ? "Mock" : "Real"}
      </button> */}

      <div className={styles.index}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <MapCustom
              actors={simulatedActors}
              selected={selected}
              setSelected={setSelected}
            />

            <Grid
              actors={simulatedActors}
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          <div className={styles.right}>
            <CameraFeed />
          </div>
        </div>
      </div>
    </MockContext.Provider>
  );
};

export { IndexPage };

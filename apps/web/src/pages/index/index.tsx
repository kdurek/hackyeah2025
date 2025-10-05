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

  const [isMock, setIsMock] = useState(true);

  return (
    <MockContext.Provider value={isMock}>
      <button
        onClick={() => {
          setIsMock((m) => !m);
          simulatedActors.reset();
        }}
        type="button"
      >
        Toggle Mock Data: {isMock ? "Mock" : "Real"}
      </button>

      <div className={styles.index}>
        <div className={styles.wrapper}>
          <MapCustom actors={simulatedActors} />
          <CameraFeed />
        </div>

        <Grid actors={simulatedActors} />
      </div>
    </MockContext.Provider>
  );
};

export { IndexPage };

import { lazy, Suspense } from "react";
import { Grid } from "@/components/grid/grid";
import styles from "./index.module.scss";

// Lazy load the entire map to prevent server-side imports
const LazyMap = lazy(async () => {
  const { MapContainer, Marker, Popup, TileLayer } = await import(
    "react-leaflet"
  );

  const Mapp = () => (
    <MapContainer
      center={[50.069, 19.99]}
      scrollWheelZoom={false}
      style={{ width: 540, height: 400, margin: "auto", marginBottom: 16 }}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=4A4HauLUfRocfgCMLMaR"
        // url="https://api.maptiler.com/maps/0199aebd-a373-7fa6-8584-01105666390f/{z}/{x}/{y}.png?key=4A4HauLUfRocfgCMLMaR"
        // url="https://api.maptiler.com/maps/0199aebd-a373-7fa6-8584-01105666390f/?key=4A4HauLUfRocfgCMLMaR#1.0/0.00000/0.00000"
        // url="https://api.maptiler.com/maps/0199aebd-a373-7fa6-8584-01105666390f/12.66/50.05947/19.94658?key=4A4HauLUfRocfgCMLMaR"
      />
      <Marker position={[50.069, 19.99]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );

  return { default: Mapp };
});

const IndexPage = () => (
  <div className={styles.index}>
    <h1>Hello World</h1>

    <Suspense fallback={<div>Loading map...</div>}>
      <LazyMap />
    </Suspense>

    <Grid />
  </div>
);

export { IndexPage };

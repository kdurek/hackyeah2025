import { lazy, Suspense } from "react";
import styles from "./index.module.scss";

// Lazy load the entire map to prevent server-side imports
const LazyMap = lazy(async () => {
  const { MapContainer, Marker, Popup, TileLayer } = await import(
    "react-leaflet"
  );

  const Mapp = () => (
    <MapContainer
      center={[50.069_876_974_647_805, 19.990_273_459_696_13]}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=4A4HauLUfRocfgCMLMaR"
      />
      <Marker position={[50.069_876_974_647_805, 19.990_273_459_696_13]}>
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
  </div>
);

export { IndexPage };

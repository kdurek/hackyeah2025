import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import styles from "./index.module.scss";

const IndexPage = () => (
  <div className={styles.index}>
    <h1>Hello World</h1>

    <MapContainer center={[51.505, -0.09]} scrollWheelZoom={false} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
);

export { IndexPage };

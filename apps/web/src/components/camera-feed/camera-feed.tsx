import useWebSocket from "react-use-websocket";
import styles from "./camera-feed.module.scss";

const socketUrl = "ws://localhost:3000/ws";

const CameraFeed = () => {
  const { lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent) => true,
  });

  if (!lastMessage) {
    return <div className={styles.cameraFeed} />;
  }

  return (
    <picture className={styles.cameraFeed}>
      <source srcSet={`data:image/jpg;base64,${lastMessage?.data}`} />
      <img
        alt="Stream"
        height="100%"
        src={`data:image/jpg;base64,${lastMessage?.data}`}
        width="100%"
      />
    </picture>
  );
};

export { CameraFeed };

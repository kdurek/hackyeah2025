import useWebSocket from "react-use-websocket";
import styles from "./camera-feed.module.scss";

const socketUrl = "ws://antelope-chief-catfish.ngrok-free.app/ws";

const CameraFeed = () => {
  const { lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent) => true,
  });

  if (!lastMessage) {
    return (
      <div className={styles.cameraFeedWrapper}>
        <div className={styles.cameraFeed} />
      </div>
    );
  }

  return (
    <div className={styles.cameraFeedWrapper}>
      <picture className={styles.cameraFeed}>
        <source srcSet={`data:image/jpg;base64,${lastMessage?.data}`} />
        <img
          alt="Stream"
          className={styles.cameraImage}
          height="100%"
          src={`data:image/jpg;base64,${lastMessage?.data}`}
          width="100%"
        />
      </picture>
    </div>
  );
};

export { CameraFeed };

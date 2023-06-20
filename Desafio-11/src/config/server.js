import configureServerSocket from "../Dao/socketConfig/socketConfig.js";
import config from "./config.js";

const PORT = config.server.port;

function configureServer(app) {
  /*  const server = http.createServer(app); */
  const { server } = configureServerSocket(app);
  configureServerSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
  });

  return server;
}

export default configureServer;

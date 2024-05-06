/*
 * Title: Uptime Monitoring Application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Author: Ashis Kumar Paul
 * Date: 05/05/2024
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// App Object - module scaffolding
const app = {};

// Configuration
app.config = {
  port: 3000,
};

// Create a server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Server is running on port ${app.config.port}`);
  });
};

// Handle Request Response
app.handleReqRes = handleReqRes;

// Start the server
app.createServer();

const express = require("express");
const config = require("config");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketServ = require("socket.io");
const io = socketServ(server);

let usersData = [
  {
    id: "8001",
    description: {
      timestamp: 1688034738,
      initial_time: 1688034738,
      name: "test",
      PosX: 100,
      PosY: -100,
      PosZ: 150,
      RFID: 123456789,
      Batt: 75,
      title: "string",
      Stat: 1,
    },
  },
  {
    id: "8102",
    description: {
      timestamp: 1688035849,
      initial_time: 1688034738,
      name: "test",
      PosX: 100,
      PosY: -150,
      PosZ: 150,
      RFID: 123456789,
      Batt: 75,
      title: "string",
      Stat: 1,
    },
  },
];

io.on("connection", (socket) => {
  socket.emit("id", socket.id);
  socket.emit("users", usersData);
  console.log(usersData);

  socket.on("random", (socket) => {
    for (const index of usersData.keys()) {
      usersData[index].description.PosX = Math.random() * 160;
      usersData[index].description.PosY = Math.random() * 160 * -1;
    }
    io.emit("users", usersData);
    console.log("RANDOM!", usersData);
  });
});

const port = process.env.PORT || config.port;
server.listen(port, () => console.log(`Listening on port:${port}...`));

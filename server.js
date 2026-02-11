require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseroutes");
const settlementRoutes = require("./routes/settlementRoutes"); 
const ratingRoutes = require("./routes/ratingRoutes");


connectDB();

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/settlements", settlementRoutes); 
app.use("/api/ratings", ratingRoutes);


io.on("connection", (socket) => {
  socket.on("join-group", (groupId) => {
    socket.join(groupId);
  });
});

app.set("io", io);

server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connection } = require("./Config/db");
const userRoutes = require("./Routes/user.routes");
const chatRoutes = require("./Routes/chat.routes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json()); //  to accept json data

dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the server successfully");
  } catch (err) {
    console.log("Failed to connect to the server");
    console.log(err);
  }
  console.log(`listening on Port :  ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
const trainerRouter = require("./routes/trainer.routes");
const memberRouter = require("./routes/member.routes.js");

const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*"
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Gym App");
});

app.use("/api/users", userRouter);
app.use("/api/trainers", trainerRouter);
app.use("/api/members", memberRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.PORT}`);
});
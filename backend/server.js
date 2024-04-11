const dotenv = require("dotenv");
dotenv.config();

const generic = require("generic-logs");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


app.use(express.json());
app.use(cors());

const leaderboardRoutes = require("./routes/leaderboard.js")
const sentencesRoutes = require("./routes/sentences.js")

app.use('/api/sentences', sentencesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

mongoose
  .connect(process.env.MONGO, {})
  .then(() =>
    generic.custom({
      title: "DB",
      message: "Base de dades connectada",
      color: "green",
    })
  )
  .catch((err) => generic.error(err));

app.listen(process.env.PORT, () => {
  generic.info(`Servidor obert al port ${process.env.PORT}`);
});

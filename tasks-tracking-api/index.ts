import express from "express";
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static("public"));

const run = async () => {
  if (!config.database) {
    throw new Error(
      "DATABASE_URL is not defined in the environment variables.",
    );
  }

  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`started on ${port} port`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

import path from "path";
import { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const rootPath = __dirname;

const corsWhiteList = process.env.CORS_WHITELIST?.split(",") || [];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error(`Not Allowed by CORS`));
    }
  },
};

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  corsOptions,
  database: process.env.DATABASE_URL,
};

export default config;

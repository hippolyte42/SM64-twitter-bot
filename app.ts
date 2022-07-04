import Twitter from "twitter-api-v2";
require("dotenv").config();

const {
  API_KEY: appKey,
  API_SECRET_KEY: appSecret,
  ACCESS_TOKEN: accessToken,
  ACCESS_TOKEN_SECRET: accessSecret,
} = process.env;

const client = new Twitter({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

client.v1.tweet("Hello, world!");

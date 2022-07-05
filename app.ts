import dotenv from "dotenv";
import Twitter from "twitter-api-v2";
import {
  categories,
  getCategory,
  getPlayerName,
  initData,
  ISO8601durationToString,
} from "./speedrunApiUtils";
dotenv.config();

const main = async () => {
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

  const data = await initData();

  client.v1.tweet(`I am deployed 👏👏👏`);

  setInterval(() => {
    console.log("Interval poke");
    Object.keys(categories).map(async (category) => {
      const categoryData = await getCategory(categories[category]);

      const top1Name = await getPlayerName(
        categoryData.data[0].runs[0].run.players[0].id
      );
      const top1Time = ISO8601durationToString(
        categoryData.data[0].runs[0].run.times.realtime
      );

      if (
        data[category].top1.name !== top1Name ||
        data[category].top1.time !== top1Time
      ) {
        // new WR!
        data[category].top1.name = top1Name;
        data[category].top1.time = top1Time;
        client.v1.tweet(
          `New Super Mario 64 ${category} world record! Congratulation to ${top1Name} for finishing the game in ${top1Time} 👏👏👏`
        );
      }
    });
  }, 5000); // 5 seconds interval
};

main();

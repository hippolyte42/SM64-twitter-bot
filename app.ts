import dotenv from "dotenv";
import Twitter from "twitter-api-v2";
import {
  categories,
  getCategory,
  getPlayerName,
  getPlayerTwitter,
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

  // pick tweet template
  // client.v1.tweet(`I just got updated - ${new Date().toISOString()}`);
  client.v1.tweet(`I just got updated - changelog:
    - now display link to WR run
    - now display runner twitter if they have one
  `);

  setInterval(() => {
    console.log("Interval poke");
    Object.keys(categories).map(async (category) => {
      const categoryData = await getCategory(categories[category]);
      const top1Id = (categoryData as any).data[0].runs[0].run.players[0].id;

      const top1Name = await getPlayerName(top1Id);
      const top1Time = ISO8601durationToString(
        (categoryData as any).data[0].runs[0].run.times.realtime
      );
      const top1RunLink = (categoryData as any).data[0].runs[0].run.weblink;
      const top1Twitter = await getPlayerTwitter(top1Id);

      if (
        data[category].top1.name !== top1Name ||
        data[category].top1.time !== top1Time
      ) {
        // new WR!
        data[category].top1.name = top1Name;
        data[category].top1.time = top1Time;
        client.v1.tweet(
          `New Super Mario 64 ${category} world record! Congratulation to ${
            top1Twitter || top1Name
          } for finishing the game in ${top1Time} 👏👏👏
          Full run is available here: ${top1RunLink}`
        );
      }
    });
  }, 5000); // 5 seconds interval
};

main();

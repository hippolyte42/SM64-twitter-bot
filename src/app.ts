import dotenv from "dotenv";
import { categories, Category, DB, initDb } from "./init";
import { ISO8601durationToString } from "./utils/formatUtils";
import {
  getCategory,
  getPlayerName,
  getPlayerTwitter,
} from "./utils/speedrunApiUtils";
import {
  sendNewReleaseTweet,
  sendNewWorldRecordTweet,
} from "./utils/tweetUtils";

dotenv.config();

const main = async () => {
  const db: DB = await initDb();

  sendNewReleaseTweet();

  setInterval(() => {
    console.log("new interval start");

    Object.keys(categories).map(async (category: Category) => {
      const categoryData = await getCategory(categories[category]);
      const top1RunData = (categoryData as any).data[0].runs[0].run;
      const top1Id = top1RunData.players[0].id;

      const top1Name = await getPlayerName(top1Id);
      const top1Time = ISO8601durationToString(top1RunData.times.realtime);
      const isRunVerified = top1RunData.status.status === "verified";
      // new WR!
      if (
        isRunVerified &&
        (db[category].top1Name !== top1Name ||
          db[category].top1Time !== top1Time)
      ) {
        console.log("New world record!", isRunVerified, top1Name, top1Time);
        // update data
        db[category].top1Name = top1Name;
        db[category].top1Time = top1Time;

        const top1RunLink = top1RunData.weblink;
        const top1Twitter = await getPlayerTwitter(top1Id);

        sendNewWorldRecordTweet(
          category,
          top1Name,
          top1Time,
          top1RunLink,
          top1Twitter
        );
      }
    });
  }, 5000); // 5 seconds interval
};

main();

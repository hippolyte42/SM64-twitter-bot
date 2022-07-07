import dotenv from "dotenv";
import { categories, initData } from "./init";
import { ISO8601durationToString } from "./utils/formatUtils";
import {
  getCategory,
  getPlayerName,
  getPlayerTwitter,
} from "./utils/speedrunApiUtils";
import {
  sendNewWorldRecordTweet,
  sendNewReleaseTweet,
} from "./utils/tweetUtils";

dotenv.config();

const main = async () => {
  const data = await initData();

  // new release tweet
  sendNewReleaseTweet();

  setInterval(() => {
    console.log("new interval start");

    Object.keys(categories).map(async (category) => {
      const categoryData = await getCategory(categories[category]);
      const top1Id = (categoryData as any).data[0].runs[0].run.players[0].id;

      const top1Name = await getPlayerName(top1Id);
      const top1Time = ISO8601durationToString(
        (categoryData as any).data[0].runs[0].run.times.realtime
      );
      // new WR!
      if (
        data[category].top1.name !== top1Name ||
        data[category].top1.time !== top1Time
      ) {
        // update data
        data[category].top1.name = top1Name;
        data[category].top1.time = top1Time;

        const top1RunLink = (categoryData as any).data[0].runs[0].run.weblink;
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

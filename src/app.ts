import { sleepSecs } from "twitter-api-v2/dist/v1/media-helpers.v1";
import { categories, DB, initDb } from "./init";
import { ISO8601durationToPretty } from "./utils/formatUtils";
import {
  getCategory,
  getNewNoteworthyRuns,
  getPlayerName,
  getPlayerTwitter,
} from "./utils/speedrunApiUtils";
import {
  sendNewNoteworthyRunTweet,
  sendNewReleaseTweet,
  sendNewWorldRecordTweet,
} from "./utils/tweetUtils";

const main = async () => {
  const db: DB = await initDb();

  // await sendNewReleaseTweet();

  while (true) {
    console.log("new interval start", new Date().toISOString());

    for (let category of Object.keys(categories)) {
      // newNoteworthyRuns section
      const newNoteworthyRuns = await getNewNoteworthyRuns(
        categories[category],
        db.noteworthyRunsTable[category]
      );
      for (let newNoteworthyRun of newNoteworthyRuns) {
        console.log(
          "newNoteworthyRun",
          newNoteworthyRun,
          new Date().toISOString()
        );
        // update data
        db.noteworthyRunsTable[category].push(newNoteworthyRun);
        const runnerTwitter = await getPlayerTwitter(newNoteworthyRun.runnerId);
        await sendNewNoteworthyRunTweet(
          category,
          newNoteworthyRun.runnerName,
          newNoteworthyRun.runnerTime,
          newNoteworthyRun.runWeblink,
          newNoteworthyRun.runPlatform,
          runnerTwitter
        );
      }

      // WR section
      const categoryData = await getCategory(categories[category].id);
      const top1RunData = (categoryData as any).data[0].runs[0].run;
      const top1Id = top1RunData.players[0].id;

      const top1Name = await getPlayerName(top1Id);
      const top1Time = ISO8601durationToPretty(top1RunData.times.realtime);
      const isRunVerified = top1RunData.status.status === "verified";
      // new WR!
      if (
        isRunVerified &&
        (db.wrTable[category].top1Name !== top1Name ||
          db.wrTable[category].top1Time !== top1Time)
      ) {
        console.log(
          "New world record!",
          isRunVerified,
          top1Name,
          top1Time,
          new Date().toISOString()
        );
        // update data
        db.wrTable[category] = { top1Name, top1Time };

        const top1RunLink = top1RunData.weblink;
        const top1Twitter = await getPlayerTwitter(top1Id);

        await sendNewWorldRecordTweet(
          category,
          top1Name,
          top1Time,
          top1RunLink,
          top1Twitter
        );
      }
    }
    await sleepSecs(30);
  }
};

main();

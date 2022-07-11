import Twitter from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const {
  API_KEY: appKey,
  API_SECRET_KEY: appSecret,
  ACCESS_TOKEN: accessToken,
  ACCESS_TOKEN_SECRET: accessSecret,
} = process.env;

const isTwitterActivated = process.env.IS_TWITTER_ACTIVATED === "true";

const client =
  isTwitterActivated &&
  new Twitter({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });

export const sendNewWorldRecordTweet = async (
  category: string,
  top1Name: string,
  top1Time: string,
  top1RunLink: string,
  top1Twitter: string | undefined
) => {
  if (isTwitterActivated) {
    console.log(`Super Mario 64 ${category} World Record! Congratulation to ${
      top1Twitter || top1Name
    } for finishing the game in ${top1Time} ✨🏰🥇
        Full run available ${top1RunLink}`);
    await client.v1.tweet(
      `Super Mario 64 ${category} World Record! Congratulation to ${
        top1Twitter || top1Name
      } for finishing the game in ${top1Time} ✨🏰🥇
        Full run available ${top1RunLink}`
    );
  }
};

export const sendNewNoteworthyRunTweet = async (
  category: string,
  runnerName: string,
  runnerTime: string,
  runWeblink: string,
  runPlatform: string,
  runnerTwitter: string | undefined
) => {
  if (isTwitterActivated) {
    console.log(
      `Noteworthy Super Mario 64 ${category} run on ${runPlatform}. Well done to ${
        runnerTwitter || runnerName
      } for finishing the game in ${runnerTime}! 🍑🎂 Full run available ${runWeblink}`
    );
    await client.v1.tweet(
      `Noteworthy Super Mario 64 ${category} run on ${runPlatform}. Well done to ${
        runnerTwitter || runnerName
      } for finishing the game in ${runnerTime}! 🍑🎂 Full run available ${runWeblink}`
    );
  }
};

export const sendNewReleaseTweet = async () => {
  if (isTwitterActivated) {
    console.log(`I just got updated: 🤖
    - now tweet new noteworthy runs from selected platforms & categories
  `);
    await client.v1.tweet(`I just got updated: 🤖
    - now tweet new noteworthy runs from selected platforms & categories
  `);
  }
};

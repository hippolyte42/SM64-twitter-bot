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
    await client.v1.tweet(
      `New Super Mario 64 ${category} world record! Congratulation to ${
        top1Twitter || top1Name
      } for finishing the game in ${top1Time} 👏👏👏
        Full run is available here: ${top1RunLink}`
    );
  }
};

export const sendNewReleaseTweet = async () => {
  if (isTwitterActivated) {
    await client.v1.tweet(`I just got updated: 🤖
    - now display link to WR run
    - now display new WR runner twitter handle
    
    note to devs:
    - readMe with requirements & getting started
    - 8 new issues on GitHub, including 2 good first issue
    - discord collaborators group chat created
  `);
  }
};

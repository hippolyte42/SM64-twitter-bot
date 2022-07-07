import Twitter from "twitter-api-v2";

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

export const sendNewWorldRecordTweet = (
  category: string,
  top1Name: string,
  top1Time: string,
  top1RunLink: string,
  top1Twitter: string | undefined
) => {
  client.v1.tweet(
    `New Super Mario 64 ${category} world record! Congratulation to ${
      top1Twitter || top1Name
    } for finishing the game in ${top1Time} 👏👏👏
        Full run is available here: ${top1RunLink}`
  );
};

export const sendNewReleaseTweet = () => {
  client.v1.tweet(`I just got updated! - changelog:
    - now display link to WR run
    - now display runner twitter from speedrun.com
    
    note to devs:
    - now have a readMe on GitHub with requirements & getting started
    - 7 new issues available GitHub, including 1 good first issue
    - discord collaborators group chat created
  `);
};

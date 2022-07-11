import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { CategoryInfo, NoteworthyRunsData } from "../init";
import {
  getTwitterSlugFromUri,
  ISO8601durationToDigital,
  ISO8601durationToPretty,
} from "./formatUtils";
import { isShorterDuration } from "./timeUtils";

export const getPlayerName = async (playerId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/users/${playerId}`
  );
  return ((await response.json()) as any).data.names.international;
};

export const getPlayerTwitter = async (playerId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/users/${playerId}`
  );
  const twitterUri: string | undefined = ((await response.json()) as any).data
    .twitter?.uri;
  return twitterUri ? getTwitterSlugFromUri(twitterUri) : undefined;
};

export const getCategory = async (categoryId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/categories/${categoryId}/records?status=verified&${uuidv4()}`
  );
  const categoryData = await response.json();

  return categoryData;
};

const getPlatformName = async (platformId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/platforms/${platformId}`
  );
  const platformName = (await response.json()).data.name;

  return platformName;
};

export const getNewNoteworthyRuns = async (
  categoryInfo: CategoryInfo,
  NoteworthyRunsData: NoteworthyRunsData[]
): Promise<NoteworthyRunsData[]> => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/runs?category=${categoryInfo.id}&orderby=verify-date&direction=desc`
  );
  const categoryNewVerifiedRunsData = (await response.json()).data;

  const newNoteworthyRuns: NoteworthyRunsData[] = [];

  for (let newVerifiedRuns of categoryNewVerifiedRunsData) {
    if (newVerifiedRuns.status.status === "verified") {
      const runnerTime: string | undefined =
        newVerifiedRuns.times.realtime &&
        ISO8601durationToDigital(newVerifiedRuns.times.realtime);
      if (
        runnerTime &&
        isShorterDuration(runnerTime, categoryInfo.noteworthyTime) &&
        !NoteworthyRunsData.some(
          async (v) =>
            v.runnerName ===
              (await getPlayerName(newVerifiedRuns.players[0].id)) &&
            v.runnerTime === runnerTime
        )
      ) {
        newNoteworthyRuns.push({
          runnerName: await getPlayerName(newVerifiedRuns.players[0].id),
          runnerTime,
          runnerId: newVerifiedRuns.players[0].id,
          runWeblink: newVerifiedRuns.weblink,
          runPlatform: await getPlatformName(newVerifiedRuns.system.platform),
        });
      }
    }
  }

  return newNoteworthyRuns;
};

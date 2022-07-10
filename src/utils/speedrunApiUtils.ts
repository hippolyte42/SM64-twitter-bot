import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { CategoryInfo, NoteworthyRunsData } from "../init";
import {
  getTwitterSlugFromUri,
  ISO8601durationToString,
  ISO8601durationToStringShort,
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

export const getNewNoteworthyRuns = async (
  categoryInfo: CategoryInfo,
  NoteworthyRunsData: NoteworthyRunsData[]
): Promise<NoteworthyRunsData[]> => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/runs?category=${categoryInfo.id}&orderby=verify-date&direction=desc`
  );
  const categoryNewVerifiedRunsData = (await response.json()).data;

  const newNoteworthyRuns: NoteworthyRunsData[] = [];
  Promise.all(
    categoryNewVerifiedRunsData.map(async (element) => {
      if (
        element.status.status === "verified" &&
        !(element.system.emulated === true) &&
        element.system.platform === "w89rwelk"
      ) {
        const runnerTime: string | undefined =
          element.times.realtime &&
          ISO8601durationToStringShort(element.times.realtime);
        if (
          runnerTime &&
          isShorterDuration(runnerTime, categoryInfo.noteworthyTime) &&
          !NoteworthyRunsData.some(
            async (v) =>
              v.runnerName === (await getPlayerName(element.players[0].id)) &&
              v.runnerTime === runnerTime
          )
        ) {
          newNoteworthyRuns.push({
            runnerName: await getPlayerName(element.players[0].id),
            runnerTime,
            runnerId: element.players[0].id,
            runWeblink: element.weblink,
            runnerPrettyTime: ISO8601durationToString(element.times.realtime),
          });
        }
      }
    })
  );
  return newNoteworthyRuns;
};

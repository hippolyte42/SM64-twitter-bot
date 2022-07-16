import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { CategoryInfo, NoteworthyRun } from "../../init";
import { ISO8601durationToDigital } from "../formatUtils";
import { isShorterDuration } from "../timeUtils";
import { getPlatformName } from "./getPlatformName";
import { getPlayerName } from "./getPlayerName";

export const getNewNoteworthyRuns = async (
  categoryInfo: CategoryInfo,
  NoteworthyRunsData: NoteworthyRun[]
): Promise<NoteworthyRun[]> => {
  const url = `https://www.speedrun.com/api/v1/runs?status=verified&category=${
    categoryInfo.id
  }&orderby=verify-date&direction=desc&${uuidv4()}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Request returned ${response.status} from ${url}`, response);
    return;
  }
  const categoryNewVerifiedRunsData = (await response.json()).data;

  const newNoteworthyRuns: NoteworthyRun[] = [];

  for (let newVerifiedRun of categoryNewVerifiedRunsData) {
    const runnerTime: string | undefined =
      newVerifiedRun.times.realtime &&
      ISO8601durationToDigital(newVerifiedRun.times.realtime);
    if (
      runnerTime &&
      isShorterDuration(runnerTime, categoryInfo.noteworthyTime) &&
      !NoteworthyRunsData.some(
        async (v) =>
          v.runnerName ===
            (await getPlayerName(newVerifiedRun.players[0].id)) &&
          v.runnerTime === runnerTime
      )
    ) {
      newNoteworthyRuns.push({
        runnerName: await getPlayerName(newVerifiedRun.players[0].id),
        runnerTime,
        runnerId: newVerifiedRun.players[0].id,
        runWeblink: newVerifiedRun.weblink,
        runPlatform: await getPlatformName(newVerifiedRun.system.platform),
      });
    }
  }

  return newNoteworthyRuns;
};

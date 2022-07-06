import { ISO8601durationToString } from "./formatUtils";
import { getCategory, getPlayerName } from "./speedrunApiUtils";

const data = {
  "120 Star": {
    top1: { name: "", time: "" },
  },
  "70 Star": {
    top1: { name: "", time: "" },
  },
  "16 Star": {
    top1: { name: "", time: "" },
  },
  "1 Star": {
    top1: { name: "", time: "" },
  },
  "0 Star": {
    top1: { name: "", time: "" },
  },
};

export const categories = {
  "120 Star": "wkpoo02r", // match category with speedrun.com category id
  "70 Star": "7dgrrxk4",
  "16 Star": "n2y55mko",
  "1 Star": "7kjpp4k3",
  "0 Star": "xk9gg6d0",
};

export const initData = async () => {
  await Promise.all(
    Object.keys(categories).map(async (category) => {
      if (categories[category]) {
        const categoryData = await getCategory(categories[category]);

        const top1Name = await getPlayerName(
          (categoryData as any).data[0].runs[0].run.players[0].id
        );

        const top1Time = (categoryData as any).data[0].runs[0].run.times
          .realtime;

        data[category].top1.name = top1Name;
        data[category].top1.time = ISO8601durationToString(top1Time);
      }
    })
  );

  return data;
};

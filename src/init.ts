import { ISO8601durationToString } from "./utils/formatUtils";
import { getCategory, getPlayerName } from "./utils/speedrunApiUtils";

export type Category = "120 Star" | "70 Star" | "16 Star" | "1 Star" | "0 Star";

export type CategoryData = {
  top1Name: string;
  top1Time: string;
};

export type Data = {
  [name in Category]: CategoryData;
};

const data: Data = {
  "120 Star": {
    top1Name: "",
    top1Time: "",
  },
  "70 Star": {
    top1Name: "",
    top1Time: "",
  },
  "16 Star": {
    top1Name: "",
    top1Time: "",
  },
  "1 Star": {
    top1Name: "",
    top1Time: "",
  },
  "0 Star": {
    top1Name: "",
    top1Time: "",
  },
};

export type Categories = {
  [name in Category]: string;
};

export const categories: Categories = {
  "120 Star": "wkpoo02r", // match category with speedrun.com category id
  "70 Star": "7dgrrxk4",
  "16 Star": "n2y55mko",
  "1 Star": "7kjpp4k3",
  "0 Star": "xk9gg6d0",
};

export const initData = async () => {
  await Promise.all(
    Object.keys(categories).map(async (category: Category) => {
      if (categories[category]) {
        const categoryData = await getCategory(categories[category]);

        const top1Name = await getPlayerName(
          (categoryData as any).data[0].runs[0].run.players[0].id
        );

        const top1Time = (categoryData as any).data[0].runs[0].run.times
          .realtime;

        data[category].top1Name = top1Name;
        data[category].top1Time = ISO8601durationToString(top1Time);
      }
    })
  );

  console.log(data);

  return data;
};

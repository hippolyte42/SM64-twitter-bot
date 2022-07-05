import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const data = {
  "120 stars": {
    top1: { name: "", time: "" },
  },
  "70 stars": {
    top1: { name: "", time: "" },
  },
  "16 stars": {
    top1: { name: "", time: "" },
  },
  "1 star": {
    top1: { name: "", time: "" },
  },
  "0 star": {
    top1: { name: "", time: "" },
  },
};

export const categories = {
  "120 stars": "wkpoo02r",
  "70 stars": "7dgrrxk4",
  "16 stars": "n2y55mko",
  "1 star": "7kjpp4k3",
  "0 star": "xk9gg6d0",
};

export const getPlayerName = async (playerId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/users/${playerId}`
  );
  return ((await response.json()) as any).data.names.international;
};

export const getCategory = async (categoryId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/categories/${categoryId}/records?${uuidv4()}`
  );
  const categoryData = response.json();

  return categoryData;
};

export const ISO8601durationToString = (ISO8601duration: string) => {
  const result = [];

  ISO8601duration.split("").map((c) => {
    if (c === "P" || c === "T") {
    } else if (c === "H") {
      result.push(" hours ");
    } else if (c === "M") {
      result.push(" minutes ");
    } else if (c === "S") {
      result.push(" seconds");
    } else {
      result.push(c);
    }
  });

  return result.join("");
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

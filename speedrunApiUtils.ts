import fetch from "node-fetch";

const data = {
  "120 stars": {
    top1: { name: "", time: "" },
    // top2: { name: "", time: "" },
    // top3: { name: "", time: "" },
  },
  "70 stars": {
    top1: { name: "", time: "" },
    // top2: { name: "", time: "" },
    // top3: { name: "", time: "" },
  },
  "16 stars": {
    top1: { name: "", time: "" },
    // top2: { name: "", time: "" },
    // top3: { name: "", time: "" },
  },
  "1 star": {
    top1: { name: "", time: "" },
    // top2: { name: "", time: "" },
    // top3: { name: "", time: "" },
  },
  "0 star": {
    top1: { name: "", time: "" },
    // top2: { name: "", time: "" },
    // top3: { name: "", time: "" },
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
  return (
    await fetch(`https://www.speedrun.com/api/v1/users/${playerId}`).then(
      async (res) => await res.json()
    )
  ).data.names.international;
};

export const getCategory = async (categoryId: string) => {
  const categoryData = await fetch(
    `https://www.speedrun.com/api/v1/categories/${categoryId}/records`
  ).then(async (res) => await res.json());

  return categoryData;
};

export const ISO8601durationToString = (ISO8601duration: string) => {
  const result = [];

  ISO8601duration.split("").map((c) => {
    if (c === "P" || c === "T" || c === "S") {
    } else if (c === "H") {
      result.push(" hours ");
    } else if (c === "M") {
      result.push(" minutes ");
    } else {
      result.push(c);
    }
  });
  result.push(" seconds");

  return result.join("");
};

export const initData = async () => {
  await Promise.all(
    Object.keys(categories).map(async (category) => {
      if (categories[category]) {
        const categoryData = await getCategory(categories[category]);

        const top1Name = await getPlayerName(
          categoryData.data[0].runs[0].run.players[0].id
        );
        // const top2Name = await getPlayerName(
        //   categoryData.data[0].runs[1].run.players[0].id
        // );
        // const top3Name = await getPlayerName(
        //   categoryData.data[0].runs[2].run.players[0].id
        // );

        const top1Time = categoryData.data[0].runs[0].run.times.realtime;
        // const top2Time = categoryData.data[0].runs[1].run.times.realtime;
        // const top3Time = categoryData.data[0].runs[2].run.times.realtime;

        data[category].top1.name = top1Name;
        data[category].top1.time = ISO8601durationToString(top1Time);

        // data[category].top2.name = top2Name;
        // data[category].top2.time = ISO8601durationToString(top2Time);

        // data[category].top3.name = top3Name;
        // data[category].top3.time = ISO8601durationToString(top3Time);
      }
    })
  );

  return data;
};

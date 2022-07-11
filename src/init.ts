import { ISO8601durationToString } from "./utils/formatUtils";
import {
  getCategory,
  getNewNoteworthyRuns,
  getPlayerName,
} from "./utils/speedrunApiUtils";

export type Category = "120 Star" | "70 Star" | "16 Star" | "1 Star" | "0 Star";

export type CategoryData = {
  top1Name: string;
  top1Time: string;
};

export type WRTable = {
  [name in Category]: CategoryData;
};

export type DB = {
  wrTable: WRTable;
  noteworthyRunsTable: NoteworthyRunsTable;
};

const wrTable: WRTable = {
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

export type NoteworthyRunsTable = {
  [name in Category]: NoteworthyRunsData[];
};

export type NoteworthyRunsData = {
  runnerTime: string;
  runnerName: string;
  runnerId: string;
  runWeblink: string;
  runnerPrettyTime: string;
  runPlatform: string;
};

const noteworthyRunsTable: NoteworthyRunsTable = {
  "120 Star": [],
  "70 Star": [],
  "16 Star": [],
  "1 Star": [],
  "0 Star": [],
};

export type CategoryInfo = {
  id: string;
  noteworthyTime: string;
};

export type Categories = {
  [name in Category]: CategoryInfo;
};

export const categories: Categories = {
  "120 Star": {
    id: "wkpoo02r", // match category with speedrun.com category id
    noteworthyTime: "01:49:59",
  },
  "70 Star": { id: "7dgrrxk4", noteworthyTime: "50:59" },
  "16 Star": { id: "n2y55mko", noteworthyTime: "15:59" },
  "1 Star": { id: "7kjpp4k3", noteworthyTime: "07:39" },
  "0 Star": { id: "xk9gg6d0", noteworthyTime: "06:59" },
};

const db: DB = { wrTable, noteworthyRunsTable };

export const initDb = async () => {
  for (let category of Object.keys(categories)) {
    // init and set noteworthyRunsTable
    const newNoteworthyRuns = await getNewNoteworthyRuns(
      categories[category],
      db.noteworthyRunsTable[category]
    );
    db.noteworthyRunsTable[category] = newNoteworthyRuns;
    console.log(
      "db.noteworthyRunsTable[category]",
      db.noteworthyRunsTable[category]
    );

    // init and set wrTable
    const categoryData = await getCategory(categories[category].id);
    if (
      (categoryData as any).data[0].runs[0].run.status.status === "verified"
    ) {
      const top1Id = (categoryData as any).data[0].runs[0].run.players[0].id;
      const top1Name = await getPlayerName(top1Id);
      const top1Time = (categoryData as any).data[0].runs[0].run.times.realtime;

      db.wrTable[category] = {
        top1Name,
        top1Time: ISO8601durationToString(top1Time),
      };
      console.log("db.wrTable[category]", db.wrTable[category]);
    }
  }

  console.log("db", db);

  return db;
};

import { getCategory } from "./utils/apiUtils/getCategory";
import { getNewNoteworthyRuns } from "./utils/apiUtils/getNewNoteworthyRuns";
import { getPlayerName } from "./utils/apiUtils/getPlayerName";
import { ISO8601durationToPretty } from "./utils/formatUtils";

export type Category = "120 Star" | "70 Star" | "16 Star" | "1 Star" | "0 Star";

export type CategoryData = {
  top1Name: string;
  top1Time: string;
};

const wrRuns = new Map<Category, CategoryData>();
wrRuns.set("120 Star", {
  top1Name: "",
  top1Time: "",
});
wrRuns.set("70 Star", {
  top1Name: "",
  top1Time: "",
});
wrRuns.set("16 Star", {
  top1Name: "",
  top1Time: "",
});
wrRuns.set("1 Star", {
  top1Name: "",
  top1Time: "",
});
wrRuns.set("0 Star", {
  top1Name: "",
  top1Time: "",
});

export type NoteworthyRun = {
  runnerTime: string;
  runnerName: string;
  runnerId: string;
  runWeblink: string;
  runPlatform: string;
};

const noteworthyRuns = new Map<Category, NoteworthyRun[]>();
noteworthyRuns.set("120 Star", []);
noteworthyRuns.set("70 Star", []);
noteworthyRuns.set("16 Star", []);
noteworthyRuns.set("1 Star", []);
noteworthyRuns.set("0 Star", []);

export type CategoryInfo = {
  id: string;
  noteworthyTime: string;
};

export const categories = new Map<Category, CategoryInfo>();
categories.set("120 Star", {
  id: "wkpoo02r", // match category with speedrun.com category id
  noteworthyTime: "01:49:59",
});
categories.set("70 Star", { id: "7dgrrxk4", noteworthyTime: "50:59" });
categories.set("16 Star", { id: "n2y55mko", noteworthyTime: "15:59" });
categories.set("1 Star", { id: "7kjpp4k3", noteworthyTime: "07:39" });
categories.set("0 Star", { id: "xk9gg6d0", noteworthyTime: "06:59" });

export type DB = {
  wrRuns: Map<Category, CategoryData>;
  noteworthyRuns: Map<Category, NoteworthyRun[]>;
};

const db: DB = { wrRuns, noteworthyRuns };

export const initDb = async () => {
  for (let category of categories.keys()) {
    // init and set noteworthyRuns
    const newNoteworthyRuns = await getNewNoteworthyRuns(
      categories.get(category),
      db.noteworthyRuns.get(category)
    );
    db.noteworthyRuns.set(category, newNoteworthyRuns);
    console.log(
      "db.noteworthyRuns.get(category)",
      db.noteworthyRuns.get(category)
    );

    // init and set wrTable
    const categoryData = await getCategory(categories.get(category).id);
    if (
      (categoryData as any).data[0].runs[0].run.status.status === "verified"
    ) {
      const top1Id = (categoryData as any).data[0].runs[0].run.players[0].id;
      const top1Name = await getPlayerName(top1Id);
      const top1Time = (categoryData as any).data[0].runs[0].run.times.realtime;

      db.wrRuns.set(category, {
        top1Name,
        top1Time: ISO8601durationToPretty(top1Time),
      });
      console.log("db.wrRuns.get(category)", db.wrRuns.get(category));
    }
  }

  console.log("db", db);

  return db;
};

export const ISO8601durationToString = (ISO8601duration: string) => {
  const result = [];

  // format HH hours MM minutes SSS seconds
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

export const ISO8601durationToStringShort = (ISO8601duration: string) => {
  const result = [];

  // format HH:MM:SS
  const charArray = ISO8601duration.split("");
  charArray.map((c) => {
    if (c === "P" || c === "T" || c === "S") {
    } else if (c === "H") {
      result.push(":");
    } else if (c === "M") {
      result.push(":");
    } else {
      result.push(c);
    }
  });

  if (!charArray.includes("M")) {
    result.splice(result.indexOf(":"), 0, ":00");
  }

  return result.join("");
};

export const getTwitterSlugFromUri = (uri: string): string => {
  return uri.replace("https://www.twitter.com/", "@");
};

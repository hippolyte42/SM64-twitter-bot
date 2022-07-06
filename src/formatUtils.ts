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

export const getTwitterSlugFromUri = (uri: string): string => {
  return uri.replace("https://www.twitter.com/", "@");
};

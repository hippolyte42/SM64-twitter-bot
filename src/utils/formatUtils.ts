export const ISO8601durationToPretty = (ISO8601duration: string) => {
  const result = [];

  // format HH hours MM minutes SS.SSS seconds
  ISO8601duration.split("").map((c) => {
    if (c === "P" || c === "T") {
    } else if (c === "H") {
      result.push(" hours ");
    } else if (c === "M") {
      result.push(" minutes & ");
    } else if (c === "S") {
      result.push(" seconds");
    } else {
      result.push(c);
    }
  });

  return result.join("");
};

export const ISO8601durationToDigital = (ISO8601duration: string) => {
  const result = [];

  // format HH:MM:SS
  const charArray = ISO8601duration.split("");
  charArray.map((c, i) => {
    if (c === "P" || c === "T" || c === "S") {
    } else if (c === "H") {
      if (result.length === 3) {
        // handle single digit minutes in hour long duration, add H:0M:SS
        result.splice(0, 0, "0");
      }
      result.push(":");
    } else if (c === "M") {
      result.push(":");
    } else {
      if (
        (result.length === 5 || result.length === 3) &&
        charArray.indexOf("S") === charArray.indexOf("M") + 2
      ) {
        // handles handle single digit seconds in duration, add H:MM:0S
        result.push("0");
      }
      result.push(c);
    }
  });

  if (!charArray.includes("M")) {
    // handle missing minutes in hour long duration, add :00
    result.splice(result.indexOf(":"), 0, ":00");
  }

  return result.join("");
};

export const getTwitterSlugFromUri = (uri: string): string => {
  return uri.replace("https://www.twitter.com/", "@");
};

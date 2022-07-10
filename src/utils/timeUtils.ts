const isShorterSegment = (
  segment1: number,
  segment2: number
): boolean | undefined => {
  if (segment1 > segment2) {
    return false;
  } else if (segment1 < segment2) {
    return true;
  }
  return undefined;
};

const isDurationInHour = (duration: string): boolean => {
  return duration.split(":").length === 3;
};

export const isShorterDuration = (
  duration1: string,
  duration2: string
): boolean => {
  if (isDurationInHour(duration1) && !isDurationInHour(duration2)) {
    return false;
  } else if (isDurationInHour(duration2)) {
    const segment1Hours = parseInt(
      duration1.slice(0, duration1.indexOf(":")),
      10
    );
    const segment2Hours = parseInt(
      duration2.slice(0, duration2.indexOf(":")),
      10
    );
    const isShorterHour =
      isShorterSegment(segment1Hours, segment2Hours) ||
      !isDurationInHour(duration1);
    if (isShorterHour) {
      return true;
    }
  }

  const segment1Minutes = parseInt(
    isDurationInHour(duration2)
      ? duration1.slice(
          duration1.indexOf(":"),
          duration1.indexOf(":", duration1.indexOf(":") + 1)
        )
      : duration1.slice(0, duration1.indexOf(":")),
    10
  );
  const segment2Minutes = parseInt(
    isDurationInHour(duration2)
      ? duration2[3] + duration2[4]
      : duration2[0] + duration2[1],
    10
  );

  const isShorterMinute = isShorterSegment(segment1Minutes, segment2Minutes);
  if (isShorterMinute) {
    return true;
  } else if (!isShorterMinute) {
    return false;
  }
  const duration1Seconds = parseInt(
    duration1.slice(duration1.indexOf(":", duration1.indexOf(":") + 1)),
    10
  );
  const duration2Seconds = parseInt(
    isDurationInHour(duration2)
      ? duration2[6] + duration2[7]
      : duration2[3] + duration2[4],
    10
  );

  const isShorterSeconds = isShorterSegment(duration1Seconds, duration2Seconds);
  if (isShorterSeconds) {
    return true;
  }

  return false;
};
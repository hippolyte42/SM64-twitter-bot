import fetch from "node-fetch";

export const getPlatformName = async (platformId: string) => {
  const url = `https://www.speedrun.com/api/v1/platforms/${platformId}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Request returned ${response.status} from ${url}`, response);
    return;
  }

  const platformName = (await response.json()).data.name;

  return platformName;
};

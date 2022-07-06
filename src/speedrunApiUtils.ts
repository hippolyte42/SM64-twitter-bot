import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { getTwitterSlugFromUri } from "./formatUtils";

export const getPlayerName = async (playerId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/users/${playerId}`
  );
  return ((await response.json()) as any).data.names.international;
};

export const getPlayerTwitter = async (playerId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/users/${playerId}`
  );
  const twitterUri: string | undefined = ((await response.json()) as any).data
    .twitter?.uri;
  return twitterUri ? getTwitterSlugFromUri(twitterUri) : undefined;
};

export const getCategory = async (categoryId: string) => {
  const response = await fetch(
    `https://www.speedrun.com/api/v1/categories/${categoryId}/records?${uuidv4()}`
  );
  const categoryData = response.json();

  return categoryData;
};

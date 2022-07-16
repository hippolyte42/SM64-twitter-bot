import fetch from "node-fetch";
import { getTwitterSlugFromUri } from "../formatUtils";

export const getPlayerTwitter = async (playerId: string) => {
  const url = `https://www.speedrun.com/api/v1/users/${playerId}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Request returned ${response.status} from ${url}`, response);
    return;
  }

  const twitterUri: string | undefined = ((await response.json()) as any).data
    .twitter?.uri;
  return twitterUri ? getTwitterSlugFromUri(twitterUri) : undefined;
};

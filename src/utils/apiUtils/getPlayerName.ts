import fetch from "node-fetch";

export const getPlayerName = async (playerId: string) => {
  const url = `https://www.speedrun.com/api/v1/users/${playerId}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Request returned ${response.status} from ${url}`, response);
    return;
  }

  const playerName = ((await response.json()) as any).data.names.international;

  return playerName;
};

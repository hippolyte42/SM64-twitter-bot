import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

export const getCategory = async (categoryId: string) => {
  const url = `https://www.speedrun.com/api/v1/categories/${categoryId}/records?status=verified&${uuidv4()}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Request returned ${response.status} from ${url}`, response);
    return;
  }

  const categoryData = (await response.json()).data[0];

  return categoryData;
};

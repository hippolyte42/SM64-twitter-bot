export const getTwitterSlugFromUri = (uri: string): string => {
  return uri ? uri.replace("https://www.twitter.com/", "@") : undefined;
};

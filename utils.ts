export const getTwitterSlugFromUri = (
  uri: string | undefined
): string | undefined => {
  // https://www.twitter.com/AnymanKanno
  return uri ? uri.replace("https://www.twitter.com/", "@") : undefined;
};

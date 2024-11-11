export function assetUrl(path: string) {
  return import.meta.env.STORYBOOK
    ? `./${import.meta.env.BASE_URL}${path}`
    : `${import.meta.env.BASE_URL}${path}`
}

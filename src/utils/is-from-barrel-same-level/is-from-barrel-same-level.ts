export const isFromBarrelSameLevel: (path: string) => boolean = (path: string) => {
  return path === '..';
}
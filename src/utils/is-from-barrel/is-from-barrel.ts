export const isFromBarrel: (path: string) => boolean = (path: string) => {
  const parts: string[] = path.split('/');
  return parts.every((path: string) => path === '..');
}
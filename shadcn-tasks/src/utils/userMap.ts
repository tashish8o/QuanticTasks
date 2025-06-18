export const userIdFor = (id: string) =>
  ((id.charCodeAt(0) % 10) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const prop =
  <T, K extends keyof T>(key: K) =>
  (obj: T) =>
    obj[key];

export const decode = <T>(data: string): T => JSON.parse(atob(data));

export const isPosEqual = (a: Position) => (b: Position) =>
  a.x == b.x && a.y == b.y;

export const isPosInArray = (pos: Position, arr: Position[]) =>
  arr.some(isPosEqual(pos));

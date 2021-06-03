export const sleep = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

export function createBoard(arr: number[][]) {
  return arr.map((row) =>
    row.map((val) => ({
      value: val,
      background: "transparent",
    }))
  );
}

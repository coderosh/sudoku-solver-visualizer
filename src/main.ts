import "./style.css";

import Board from "./Board";
import { getSpeed } from "./utils";

const board = new Board([
  [0, 5, 0, 0, 0, 7, 0, 0, 8],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
  [7, 4, 1, 3, 0, 6, 2, 0, 0],
  [2, 7, 0, 0, 5, 1, 0, 0, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 7, 9, 0, 0, 8, 1],
  [0, 0, 8, 4, 0, 9, 3, 5, 2],
  [0, 3, 5, 0, 0, 0, 7, 0, 0],
  [4, 0, 0, 5, 0, 0, 0, 1, 0],
]);

async function main() {
  board.speed = getSpeed();
  document.querySelector("input")!.addEventListener("input", () => {
    board.speed = getSpeed();
  });

  if (!(await board.solve())) {
    alert("Couldn't solve");
  }
}

main();

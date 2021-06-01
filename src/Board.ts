import Square from "./Square";
import { sleep } from "./utils";

export default class Board {
  public arr: Square[][];
  public speed: number;

  constructor(arr: number[][]) {
    this.arr = [];
    this.speed = 30;

    for (let i = 0; i < 9; i++) {
      this.arr[i] = [];

      for (let j = 0; j < 9; j++)
        this.arr[i][j] = new Square(i, j, arr[i][j]).display();
    }
  }

  async solve() {
    const pos = this.getFirstEmptyPosition();

    if (!pos) return true;

    const [row, col] = pos;

    for (let i = 1; i <= 9; i++) {
      if (await this.isValid(row, col, i)) {
        this.arr[row][col].val = i;
        this.arr[row][col].display();
        this.arr[row][col].background();
        await sleep(this.speed);
        this.arr[row][col].background("transparent");

        if (await this.solve()) return true;

        this.arr[row][col].background("lightcoral");
        await sleep(this.speed);
        this.arr[row][col].val = 0;
        this.arr[row][col].display();
        this.arr[row][col].background("transparent");
      }
    }

    return false;
  }

  getFirstEmptyPosition() {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) if (this.arr[i][j].val === 0) return [i, j];

    return null;
  }

  async isValid(row: number, col: number, num: number) {
    // check 3 x 3 square
    const r = row - (row % 3);
    const c = col - (col % 3);

    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (this.arr[i][j].val === num) {
          this.arr[row][col].val = num;
          this.arr[row][col].display();
          this.arr[row][col].background("#f3dc0e");
          await sleep(this.speed);

          this.arr[i][j].background("lightcoral");
          await sleep(this.speed);
          this.arr[i][j].background("transparent");

          this.arr[row][col].val = 0;
          this.arr[row][col].display();
          this.arr[row][col].background("transparent");

          return false;
        }
      }
    }

    // check rows in column
    for (let i = 0; i < 9; i++) {
      if (this.arr[i][col].val === num) {
        this.arr[row][col].val = num;
        this.arr[row][col].display();
        this.arr[row][col].background("#f3dc0e");
        await sleep(this.speed / 2);

        this.arr[i][col].background("lightcoral");
        await sleep(this.speed);
        this.arr[i][col].background("transparent");

        this.arr[row][col].val = 0;
        this.arr[row][col].display();
        this.arr[row][col].background("transparent");
        return false;
      }
    }

    // check columns in row
    for (let i = 0; i < 9; i++)
      if (this.arr[row][i].val === num) {
        this.arr[row][col].val = num;
        this.arr[row][col].display();
        this.arr[row][col].background("#f3dc0e");
        await sleep(this.speed / 2);

        this.arr[row][i].background("lightcoral");
        await sleep(this.speed);
        this.arr[row][i].background("transparent");

        this.arr[row][col].val = 0;
        this.arr[row][col].display();
        this.arr[row][col].background("transparent");

        return false;
      }

    this.arr[row][col].val = num;
    this.arr[row][col].display();
    this.arr[row][col].background("#f3dc0e");
    await sleep(this.speed);
    this.arr[row][col].val = 0;
    this.arr[row][col].display();
    this.arr[row][col].background("transparent");

    return true;
  }
}

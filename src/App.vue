<template>
  <div class="container">
    <slider
      :min="min"
      :max="max"
      :value="speed"
      @speed-change="onSpeedChange"
    />
    <board :board="board" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { createBoard, sleep } from "./utils";
import Slider from "./components/Slider.vue";
import Board from "./components/Board.vue";

const board = createBoard([
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

export default defineComponent({
  name: "App",
  components: {
    Slider,
    Board,
  },
  data() {
    return {
      speed: 1500,
      board: board,
      max: 2000,
      min: 0,
    };
  },
  methods: {
    onSpeedChange(speed: number) {
      this.speed = speed;
    },
    getFirstEmptyPosition() {
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
          if (this.board[i][j].value === 0) return [i, j];

      return null;
    },
    async isValid(row: number, col: number, num: number) {
      const r = row - (row % 3);
      const c = col - (col % 3);

      for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
          if (this.board[i][j].value === num) {
            this.board[row][col].value = num;
            this.board[row][col].background = "#f3dc0e";
            await sleep(this.max - this.speed);

            this.board[i][j].background = "lightcoral";
            await sleep(this.max - this.speed);
            this.board[i][j].background = "transparent";

            this.board[row][col].value = 0;
            this.board[row][col].background = "transparent";

            return false;
          }
        }
      }

      for (let i = 0; i < 9; i++) {
        if (this.board[i][col].value === num) {
          this.board[row][col].value = num;
          this.board[row][col].background = "#f3dc0e";
          await sleep(this.max - this.speed);

          this.board[i][col].background = "lightcoral";
          await sleep(this.max - this.speed);
          this.board[i][col].background = "transparent";

          this.board[row][col].value = 0;
          this.board[row][col].background = "transparent";
          return false;
        }
      }

      // check columns in row
      for (let i = 0; i < 9; i++)
        if (this.board[row][i].value === num) {
          this.board[row][col].value = num;
          this.board[row][col].background = "#f3dc0e";
          await sleep(this.max - this.speed);

          this.board[row][i].background = "lightcoral";
          await sleep(this.max - this.speed);
          this.board[row][i].background = "transparent";

          this.board[row][col].value = 0;
          this.board[row][col].background = "transparent";

          return false;
        }

      this.board[row][col].value = num;
      this.board[row][col].background = "#f3dc0e";
      await sleep(this.max - this.speed);
      this.board[row][col].value = 0;
      this.board[row][col].background = "transparent";

      return true;
    },
    async solve() {
      const pos = this.getFirstEmptyPosition();

      if (!pos) return true;

      const [row, col] = pos;

      for (let i = 1; i <= 9; i++) {
        if (await this.isValid(row, col, i)) {
          this.board[row][col].value = i;
          this.board[row][col].background = "lightgreen";
          await sleep(this.max - this.speed);
          this.board[row][col].background = "transparent";

          if (await this.solve()) return true;

          this.board[row][col].background = "lightcoral";
          await sleep(this.max - this.speed);
          this.board[row][col].value = 0;
          this.board[row][col].background = "transparent";
        }
      }

      return false;
    },
  },
  async mounted() {
    if (!(await this.solve())) alert("Couldn't solve the board");
    else console.log("Done!");
  },
});
</script>

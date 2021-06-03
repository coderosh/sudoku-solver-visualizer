<template>
  <div class="board">
    <row
      v-for="(row, index) in board"
      :key="String(index)"
      class="row"
      :row="row"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Row from "./Row.vue";

export default defineComponent({
  components: {
    Row,
  },
  props: ["board"],
});
</script>

<style scoped>
.board {
  padding: 10px;
  box-shadow: 20px 10px var(--shadow-color);
  background: var(--background-white);
  border: 2px solid var(--border-color);
}
</style>

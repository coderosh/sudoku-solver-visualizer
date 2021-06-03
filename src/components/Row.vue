<template>
  <div class="row">
    <cell v-for="(cell, index) in row" :key="String(index)" :cell="cell" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Cell from "./Cell.vue";

export default defineComponent({
  components: { Cell },
  props: ["row"],
});
</script>

<style scoped>
.row {
  display: flex;
  width: fit-content;
}

.row:nth-child(3n) {
  border-bottom: var(--border);
}

.row:first-child {
  border-top: var(--border);
}
</style>

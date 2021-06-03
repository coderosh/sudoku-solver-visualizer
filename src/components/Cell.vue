<template>
  <div :style="{ background: cell.background }" class="cell">
    {{ cell.value || "" }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["cell"],
});
</script>

<style scoped>
.cell {
  height: var(--cell-dimension);
  width: var(--cell-dimension);
  line-height: var(--cell-dimension);
  border: 1px solid var(--border-color);
  font-size: var(--font-size);
  transition: all 300ms;
  text-align: center;
  color: #111111;
}

.cell:nth-child(3n) {
  border-right: var(--border);
}

.cell:first-child {
  border-left: var(--border);
}
</style>

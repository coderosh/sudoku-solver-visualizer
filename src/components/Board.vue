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

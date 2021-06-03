<template>
  <div :style="{ background: cell.background }" class="col">
    {{ cell.value || "" }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["cell"],
});
</script>

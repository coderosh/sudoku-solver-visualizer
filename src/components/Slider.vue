<template>
  <div class="range">
    <label for="speed">Speed</label>
    <input :min="min" :max="max" :value="value" type="range" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["min", "max", "value"],
  emits: ["speed-change"],
  methods: {
    onInput(event: Event) {
      this.$emit("speed-change", +(event.target as HTMLInputElement).value);
    },
  },
});
</script>
